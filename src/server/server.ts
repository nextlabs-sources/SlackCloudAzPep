import express from "express";
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import * as axiosService from "axios";

import {log} from './utils/logger';

// Common configurations
import envConfig from './config/slack_entitlement';

//import { slackUtil } from './utils/slack_utils';
import { SlackSettings, SlackUser, SlackChannel, SlackFreeRule, SlackRule, SlackCommand, SlackFileShared, SlackWorkspace, SlackFile} from './models/data_models';
import { dataService } from './services/data_services';
import { slackService } from './services/slack_services';
import { cloudAzService } from './services/nextlabs_services';

// Slack API
//import { WebClient, WebAPICallResult } from '@slack/web-api';
import { createEventAdapter }  from '@slack/events-api';
import { SlackEventAdapter } from "@slack/events-api/dist/adapter";
import { createMessageAdapter } from '@slack/interactive-messages';
import { EventEmitter } from "events";

// Initialize using verification token from environment variables
const slackEvents: SlackEventAdapter & EventEmitter = createEventAdapter(envConfig.SLACK_SIGNING_SECRET, { includeBody: true }) as any;
const slackInteraction = createMessageAdapter(envConfig.SLACK_SIGNING_SECRET); 

const axios = axiosService.default;

// Express app initialization
const app = express();

// Template configuration
//app.set("view engine", "ejs");
//app.set("views", "web");
app.use('/slack/entitlement', express.static(path.join(__dirname, "../web/entitlement")));
//app.use("/slack/entilement/web", express.static(path.join(__dirname, "../web")));
// Static files configuration
app.use("/", express.static(path.join(__dirname, "../web")));


// ####################
// Handles Slack events
// ####################
// NOTE: you must mount to a path that matches the Request URL that was configured earlier
app.use('/slack/events', slackEvents.expressMiddleware());
//app.use('/slack/actions', slackInteraction.expressMiddleware());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//###################################
//Default favicon.ico file
//###################################
/*
app.get("/slack/web/entitlement/favicon.ico", function(req, res){
    log.debug("Calling /favicon.ico");

    res.sendFile(path.join(__dirname+'/../web/entitlement/img/favicon.ico'));
});
*/

// ###################################
// Default web page for load balancing
// ###################################
/*
app.get("/slack/web", function(req, res){
    log.debug("Calling /slack/web", __dirname);

	res.sendFile(path.join(__dirname+'/../web/index.html'));
});
*/

app.get("/slack/test/settings", function(req, res){
    log.debug("Calling /slack/entitlement/web", __dirname);

    res.sendStatus(200);
});


// ###################################
// Default CloadAz OAuth2 V2
// ###################################
app.get('/slack/oauth', function(req,res){

	let query = req.query;

	log.debug("OAuth: ", query);

	let authQuery = 'https://slack.com/api/oauth.v2.access?code='
            + query.code +
            '&client_id=' + envConfig.SLACK_CLIENT_ID +
            '&client_secret=' + envConfig.SLACK_CLIENT_SECRET;
            //'&redirect_uri=' + envConfig.SLACK_REDIRECT_URL;

	log.debug(authQuery);

	axios.get(authQuery)
	    .then((result) => {
	    	let slack_data = result.data;
	        
            log.debug("Slack data: ", slack_data)
            
	        if (!slack_data.ok){
	            res.send("Error encountered: \n" + JSON.stringify(slack_data)).status(200).end()
	        }else{

                let settings:SlackSettings = slackService.parseOAuthResult(slack_data);
	            dataService.saveOAuthToken(settings);
	            //res.send("Success!");

	            // Post message
	            let message = "Entitlement for Slack has been installed. The following commands are now available.\n"
                            + "   */em4slack info*  - To get more information about NextLabs CloudAz Service\n"
                            + "   */em4slack signup* - To signup for NextLabs CloudAz Service\n"
                            + "   */em4slack setup* - To setup NextLabs CloudAz Service\n";
                            //+ "   */em4slack enroll* - To enroll Slack's object models with NextLabs CloudAz Service\n";
                slackService.postMessageToChannel(settings.bot_access_token, settings.webhook_channel_id, message);
 
	            let ackURL = "/slack/entitlement/#/cloudaz_ack/" + settings.team_name + "/" + settings.team_id;
	            res.redirect(ackURL);
	        }	    
    	}).catch((err) => {
    		log.fatal(err);
	    	res.send("Error encountered: \n" + err).status(200).end()
	});

});

// #####################
// Handle Slack commands
// #####################
//app.use(express.json)
app.post('/slack/commands', function(req, res) {
	
	log.debug("Command Body: ", req.body);

    let body:any = req.body;
	if(typeof body === 'undefined' || body === null) {
		res.sendStatus(500);
        return;
    }

    // Exit if the slack token not valid
	if (body.token !== envConfig.SLACK_VERIFICATION_TOKEN) {
		res.sendStatus(500);
		return;
    }

    let command:SlackCommand = new SlackCommand(); 
    command.fromJSON(body);
    
	//const { token, text, team_id, user_id, trigger_id } = req.body;

    if( command.text === 'info') {
        log.debug("Command [info]");

        res.type('json');
        res.send(cloudAzInfoMessage());
        return;
    } else if (command.text === 'enrol') {
		log.debug("Command [enrol]");
		
        dataService.teamSettings(command.team_id).then((settings:SlackSettings) => {

			let view:any = slackService.cloudAzEnrolView(command.trigger_id, settings);
            
            log.debug("View: ", view);

            slackService.slackViewOpen(settings.bot_access_token, view, res);

        }).catch((err) =>{
            log.fatal(err);
        });

    } else if (command.text === 'help') {
		log.debug("Command [help]");
		
        dataService.teamSettings(command.team_id).then((settings:SlackSettings) => {

			let view:any = slackService.cloudAzHelpView(command.trigger_id, settings);
            
            log.debug("View: ", view);

            slackService.slackViewOpen(settings.bot_access_token, view, res);

        }).catch((err) =>{
            log.fatal(err);
        });
    } else if (command.text === 'setup') {
        log.debug("Command [setup]");

        dataService.teamSettings(command.team_id).then((settings:SlackSettings) => {

            log.debug("Settings: ", settings);

            let access_token = settings.bot_access_token;
            slackService.userInfo(access_token, command.user_id).then((user:SlackUser) => {

                log.debug("User: ", user);

                if(!user['is_admin']) {
                    let errorMessage = `{
                            "response_type": "ephemeral",
                            "text": "Sorry, [setup] is administrator only option. Please login as workspace administrator and try again."
                            }`;
                    res.type('json');
                    res.send(errorMessage);
                    return;
                }

                let dialog:any = slackService.cloudAzSetupMessage(command.trigger_id, settings);

                log.debug("Dialog: ", dialog);

                slackService.slackDialogOpen(access_token, dialog, res);

            }).catch((err) => {
                log.fatal(err);
            });

        });
    } else if (command.text === 'signup') {

        log.debug("Command [signup]");

        let settings:SlackSettings; 

        dataService.teamSettings(command.team_id).then((result:SlackSettings) => {

            log.debug("Settings: ", settings);

           settings = result;

            return slackService.userInfo(settings.bot_access_token, command.user_id);

        }).then((user:SlackUser) => {

                log.debug("User: ", user);

                if(!user['is_admin']) {
                    let errorMessage = `{
                            "response_type": "ephemeral",
                            "text": "Sorry, [signup] is administrator only option. Please login as workspace administrator and try again."
                            }`;
                    res.type('json');
                    res.send(errorMessage);
                    return;
                }

                let dialog:any = slackService.cloudAzSignupMessage(command.trigger_id, settings);

                log.debug("Dialog: ", dialog);

                slackService.slackDialogOpen(settings.bot_access_token, dialog, res);

        }).catch((err) => {
            log.fatal(err);
        });

    } else if (command.text === 'setup_free_rules') {
        log.debug("Command [setup]");

        dataService.teamSettings(command.team_id).then((settings:SlackSettings) => {

            log.debug(settings);

            let access_token = settings.bot_access_token;
            slackService.userInfo(access_token, command.user_id).then((user: SlackUser) => {

                if(user.is_admin != "yes") {
                    let errorMessage = `{
                            "response_type": "ephemeral",
                            "text": "Sorry, [setup] is administrator only option. Please login as workspace administrator and try again."
                            }`;
                    res.type('json');
                    res.send(errorMessage);
                    return;
                }

                let hostname = settings['cloudaz_hostname'];
                let username = settings['cloudaz_username'];

                if(hostname == null || username == null ||
                    hostname == '' || username == '') {

                    dataService.teamFreeRules(command.team_id).then((rules:SlackFreeRule) => {

                        let dialog:any = slackService.cloudAzFreeRulesMessage(command.trigger_id, settings, rules);
                        
                        log.debug("Dialog: ", dialog);

                        slackService.slackDialogOpen(access_token, dialog, res);
                                
                    });    

                } else {

                    dataService.teamRules(command.team_id).then((rules:SlackRule) => {

                        let dialog:any = slackService.cloudAzRulesMessage(command.trigger_id, settings, rules);
                        
                        log.debug("Dialog: ", dialog);

                        slackService.slackDialogOpen(access_token, dialog, res);
                    });

                }

            }).catch((err) => {
                log.fatal("Fatal: ", err);
            });

        });
    } else {
        let errorMessage = `{
                "response_type": "ephemeral",
                "text": "Sorry, ${command.text} is an unsupported option. Please try again."
                }`;
        res.type('json');
        res.send(errorMessage);
    }

});

//##########################
//Handle Slack Message Menus
//##########################
app.get('/slack/options', (req, res) => { 

    log.debug("Options Body: ", req.body);

	let body:any = req.body;
	if(typeof body === 'undefined' || body === null) {
		res.sendStatus(500);
        return;
    }

	res.type('json');
	res.send('{ }');
});

//################################
//Handle Slack Interactive Action
//################################
app.post('/slack/actions', (req, res) => { 

    log.debug("Called actions");

	let body:any = req.body;
	if(typeof body === 'undefined' || body === null) {
		res.sendStatus(500);
        return;
    }
    
    if(typeof body.payload === 'undefined') {
        log.debug("Payload is empty");
		res.send('');
        return;
    }
    
    let payload = JSON.parse(body.payload);
    
    log.debug("Action Payload: ", payload);

    let token:string = payload.token;

	//let {token, callback_id, team, submission, response_url }= payload;

	// Exit if the slack token not valid
	if (token !== envConfig.SLACK_VERIFICATION_TOKEN) {
		res.sendStatus(500);
		return;
    }
    
    if(payload.type === 'view_submission') {
        let callback_id:string = payload.view.callback_id;
        // let team_id:string = payload.view.team_id;
        // let blocks:any = payload.view.blocks;
    
        if (callback_id === 'save-rules') {

            log.debug("Save rules");
            /*
            let rule:SlackRule = new SlackRule;
            rule.channel_fields = submission[''];
            rule.user_fields = submission[''];
            rule.channels = submission[''];
            rule.workspaces = submission[''];
            rule.default_join_channel = submission[''];
            rule.default_join_workspace = submission[''];
            rule.default_use_emoji = submission[''];
            rule.default_upload_file = submission[''];
            rule.default_share_file = submission[''];
    
            dataService.saveRules(team, submission);
            */
        } else if (callback_id === 'save-enrol') {
            log.debug("Save enroll");
            //log.debug("Blocks: ", blocks);

            let state_values:any = payload.view.state.values;
            //log.debug("Values: ", state_values);
            let cloudAzBaseUrl:string = state_values.url_input.cc_url.value;
            if(cloudAzBaseUrl == null) {
                cloudAzBaseUrl = "https://myapps.nextlabs.net/console";
            } 
            let cloudAzUsername:string = state_values.name_input.cc_username.value;
            if(cloudAzUsername == null) {
                cloudAzBaseUrl =  "Administrator";
            }
            
            let cloudAzPassword:string = state_values.password_input.cc_password.value;
            if(cloudAzPassword == null) {
                cloudAzPassword = "123next!";
            }

            log.debug("URL: ", cloudAzBaseUrl);
            log.debug("Username: ", cloudAzUsername);
            log.debug("Password: ", cloudAzPassword);

            cloudAzService.enrolPolicies(cloudAzBaseUrl, cloudAzUsername, cloudAzPassword);
        } 
    } else if(payload.type === 'dialog_submission') {
        let callback_id:string = payload.callback_id;
        let team_id:string = payload.team.id;

        if (callback_id === 'save-setup') {
            log.debug("Save Setup");

            let settings:SlackSettings = new SlackSettings();

            settings.cloudaz_hostname = payload.submission.hostname;
            settings.cloudaz_username = payload.submission.username;
            settings.cloudaz_password = payload.submission.password;

            dataService.saveNxlSetting(team_id, settings);

        } else if (callback_id === 'save-signup') {
            log.debug("Save Signup");

            // TODO: To be implemented 
            /*
            let firstname:string = payload.submission.firstname;
            let lastname:string = payload.submission.lastname;
            let company:string = payload.submission.company;
            let email:string = payload.submission.email;
            let phone:string = payload.submission.phone;
            if(phone === null) {
                phone = "";
            }
            */

        }
    } else if(payload.type === 'message_action') {
        // TODO: To be implemented
        /*
        let team:any = payload.team;
        let channel:any = payload.channel;
        let user:any = payload.user;
        let callback_id:string = payload.callback_id;
        let trigger_id:string = payload.trigger_id;
        let reponse_url:string = payload.reponse_url;
        */
       let message:any = payload.message;
       log.debug("Message", message);

    } else {
        // Do nothing
        log.fatal("No action handler available");
    }
    res.send('');

});


//
// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
//

// A message was sent to a channel
// Scope: im:history
slackEvents.on('message', async (event) => {
    log.debug("message: ", event);
    
    const team = event.channel;
	//const { user, channel, text, channel_type, subtype, upload } = event;
	const { channel, text, subtype } = event;

    if(typeof subtype !== 'undefined' && subtype === 'bot_message') {
        if(event.type === 'message') {
            processBotMessage(text, team, channel);
        }
    }

});

function processBotMessage(msg:string, teamId:string, channelId:string) {
    if(msg === 'hello') {
        dataService.teamSettings(teamId).then((result) => {

            let message = "Welcome to CloudAz for Slack";
            return slackService.postMessageToChannel(result.bot_access_token, channelId, message);

        });
    }

}

//function processFileUpload(files:any, userId:string, teamId:string, channelId:string) {
function processFileUpload(file:SlackFileShared) {
    log.debug("Process File Upload");

    let settings:SlackSettings;
    let channel:SlackChannel;
    let user:SlackUser;
    let workspace:SlackWorkspace;
    let slackFile:SlackFile;
    let rules:SlackRule;

    dataService.teamSettings(file.team_id).then((result:SlackSettings) => {

        settings = result;
        return slackService.channelInfo(settings.bot_access_token, file.channel_id);

    }).then( (result:SlackChannel) => {

        channel = result;
        return slackService.userInfo(settings.bot_access_token, file.user_id);

    }).then((result:SlackUser) => {

        user = result;
        return slackService.workspaceInfo(settings.bot_access_token, user.team_id);
    }).then((result:SlackWorkspace) => {

        workspace = result;
        user.team_name = workspace.team_name;

        log.debug("Bot Access Token: ", settings.bot_access_token);
        log.debug("Auth Access Token: ", settings.authed_user_token);
        log.debug("File Id: ", file.file_id);

        return slackService.fileInfo(settings.authed_user_token, file.file_id);
    }).then((result:SlackFile) => {

        slackFile = result;
        slackFile.user_id= user.user_id;
        slackFile.user_name = user.user_name;
        slackFile.channel_id = channel.channel_id;
        slackFile.channel_name = channel.channel_name;
        slackFile.team_id = workspace.team_id;
        slackFile.team_name = workspace.team_name;
        slackFile.enterprise_id = workspace.enterprise_id;
        slackFile.enterprise_name = workspace.enterprise_name;

        return dataService.teamRules(user.team_id);
    }).then((result:SlackRule) => {

        log.debug("Current channel: ", file.channel_id);

        cloudAzService.authorizeFileUploadWithCloudAz(settings, user, slackFile).then((decision) => {
            if(decision == 'Deny') {
                slackService.removeFileFromChannel(settings.authed_user_token, file.file_id)
                .then((success) => {
                    let message = "File *" + slackFile.file_name + "* is removed. *@" + user.real_name + "* do not have the authorization to upload "
                            + " or share this file on *#" + channel.channel_name + "*";
                    return slackService.postMessageToChannel(settings.bot_access_token, channel.channel_id, message);
                }).then((fail) => {
                    log.debug("Result: ", fail);
                }).catch((err) => {
                    log.fatal("Fatal: ", err);
                });

            }

        }).catch((err) => {
            log.fatal("Fatal: ", err);
        })

    }).catch((err) => {
        log.fatal("Fatal: ", err);
    });

}

//
// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
//
slackEvents.on('member_joined_channel', async (event:any) => {

    log.debug('member_joined_channel: ', event);
    // log.debug("body: ", body);

    let channel_id = event.channel;
    //let event_ts = event.event_ts;
    let user_id = event.user;
    let team_id = event.team;
    
    let settings:SlackSettings;
    let channel:SlackChannel;
    let user:SlackUser;
    let workspace:SlackWorkspace;
    let rules:SlackRule;

    dataService.teamSettings(team_id).then((result) =>{

        settings = result;
        return slackService.channelInfo(settings.bot_access_token, channel_id);

    }).then((result: SlackChannel) => {

        channel = result;
        return slackService.userInfo(settings.bot_access_token, user_id);

    }).then((result:SlackUser) => {

        user = result;
        return slackService.workspaceInfo(settings.bot_access_token, user.team_id);
    }).then((result:SlackWorkspace) => {

        workspace = result;
        user.team_name = workspace.team_name;
        return dataService.teamRules(user.team_id);
    }).then((result:SlackRule) => {

        // rules = result;

    	log.debug("Team Rule: ", result);

        cloudAzService.authorizeChannelWithCloudAz(settings, user, channel).then((decision:string) => {
            if(decision === 'Deny') {
                //log.debug("User_Id: ", user_id);
                //log.debug("Channel_Id: ", channel_id);

                slackService.kickUserFromChannel(settings.authed_user_token, user_id, channel_id)
                .then((success) => {
                    let message = "@" + user.real_name + " has been removed from #" + channel.channel_name
                                    + ". No authorization to join.";
                    return slackService.postMessageToChannel(settings.bot_access_token, channel_id, message);
                }).then((fail) => {
                    log.debug("Result: ", fail);
                }).catch((error) =>{
                    log.fatal("Fatal: ", error);
                });
            }

        });
    }).catch((err) => {
        log.debug("Fatal: ", err);
    });

});

// A member has added an emoji reaction to an item
// Scope: reactions:read
slackEvents.on('reaction_added', async (event: any) => {
    log.debug("reaction_added: ", event);
    //log.debug("body: ", body);
    log.debug(" ");

    let user_id:string = event.user;
    let reaction:string = event.reaction;
    let channel_id:string = event.item.channel;
    let ts:string = event.ts;
    //let team_id:string = body.team_id;
    let team_id:string = event.channel;

    let settings:SlackSettings;
    let channel:SlackChannel;
    let user:SlackUser;
    let rules:SlackRule;

    dataService.teamSettings(team_id).then((result:SlackSettings) => {

        settings = result;

        return slackService.channelInfo(settings.bot_access_token, channel_id);

    }).then((result:SlackChannel) => {

        return slackService.userInfo(settings.bot_access_token, user_id);

    }).then((result:SlackUser) =>{

        user = result;

        return dataService.teamRules(team_id);
    }).then((result:SlackRule) => {

        log.debug("Team Rule: ", result);

        cloudAzService.authorizeReactionWithCloudAz(settings, user, channel).then((decision:string) => {
            if(decision !== 'Permit') {

                slackService.removeReactionFromChannel(settings.bot_access_token, reaction, channel_id, ts)
                .then((success) => {
                    let message = "An emoji is removed. *@" + user.real_name + "* do not have the authorisation to use emoji "
                                    + " on *#" + channel.channel_name + "*";
                    return slackService.postMessageToChannel(settings.bot_access_token, channel_id, message);
                }).then((fail) => {
                    log.debug("Result: ", fail);
                }).catch((err:any) => {
                    log.debug("Fatal: ", err);
                });

            }


        });

    }).catch((err) => {
        log.fatal("Fatal: ", err);
    });
});

// A custom emoji has been added or changed
// Scope: emoji:read
slackEvents.on('emoji_changed', async (event: any) => {

    log.debug("emoji_changed: ", event);

});

// A message was posted containing one or more links relevant to your application
// Scope: links:read
slackEvents.on('link_shared', async (event:any) => {

    log.debug("link_shared: ", event);
    
});

slackEvents.on('team_renamed', async (event: any) => {

    log.debug('team_renamed: ', event);

});

// A file was shared
// Scope: files:read
slackEvents.on('file_shared', async (event, body) => {

    log.debug("Received File Shared Event: ", event);

    // TODO: To revisit this logic
    let fileShared: SlackFileShared = new SlackFileShared();
    fileShared.fromJSON(body);
    //const team = body.team_id;
	//const { user, channel, text, channel_type, subtype, upload } = event;

    processFileUpload(fileShared);

});

// A message was posted to a channel
// Scope: channels:history
slackEvents.on('message.channels', async (event:any) => {

	log.debug('message.channels :', event);

});

// A user sent a message to your Slack app (Experimental)
// Scope: none
slackEvents.on('message.app_home', async (event:any) => {

	log.debug('message.app_home :', event);

});

// A message was posted in a direct message channel
// Scope: im:history
slackEvents.on('message.im', async (event:any) => {
    
    log.debug('message.im :', event);

});

// A message was posted to a channel
// Scope: channels:history
slackEvents.on('message.channels', async (event:any) => {
    
    log.debug('message.channels :', event);

});

//
// Slack command: cloudaz info
//
function cloudAzInfoMessage():string {

    // TODO: To be removed
    /*
    let promoMessage2 = "EM for Slack is an app that enables Slack to leverage on CloudAz to dynamically enforces "
            + "the access control policies for users in Slack. NextLabs CloudAz is the industry's first Authorization "
            + "Service that supports Dynamic Authorization and Attribute Based Access Control in the cloud. "
            + "CloudAz not only comes with a dashboard that provides a centralized view and control on who can access your "
            + "applications under what circumstances, it has a powerful policy editor that allows you to "
            + "define and set your own security policies.";
    */
	let promoMessage = "CloudAz manages authorization policies by granting and denying access based on existing attributes, "
	    + "taking into user information (e.g. identity, function, and organization structure), the attributes of the "
		+ "resource, environment attributes and the action requested, all in real time. "
		+ "With EM for Slack, workspace administrator can regulate who can gain access to the channel and enforce security "
		+ "controls in real time based on policies. User access is logged and can be audited.";


	let signupMessage = `{
		"response_type": "ephemeral",
		"text": "${promoMessage}",
		"attachments": [
			{
        		"text":"For more information visit us at https://www.cloudaz.com"
			}
		]
	}`;
	
	return signupMessage;
}

//You must use a body parser for JSON before mounting the adapter
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// Start function
export const start = (port: number): Promise<void> => {
    const server = http.createServer(app);

    return new Promise<void>((resolve, reject) => {
        log.debug("Service started...");
        server.listen(port, resolve);
    });
};