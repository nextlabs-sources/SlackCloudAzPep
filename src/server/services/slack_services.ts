// Slack API
import { WebClient, WebAPICallResult } from '@slack/web-api';
import {log} from '../utils/logger';
import * as axiosService from "axios";

import envConfig from '../config/slack_entitlement';
import {SlackSettings, SlackUser, SlackChannel, SlackRule, SlackFreeRule, SlackWorkspace, SlackFile} from '../models/data_models';

const axios = axiosService.default;

class SlackService {

    //
    // Get User information from Slack
    //
    userInfo(tokenParam:string, userParam:string): Promise<SlackUser> {

        return new Promise<SlackUser>((resolve, reject) => {

            let web = new WebClient(tokenParam);

            let params = { 
                token: tokenParam,
                user: userParam
            };

            let user:SlackUser = new SlackUser;
            web.users.info(params).then((data:any) => {

                log.debug("Slack User Data: ", data );

                if(data['ok']) {
                    user.fromJSON(data['user']);
                }
                resolve(user);
            }).catch((err) => {
                log.fatal("Fatal: ", err);

                reject(user);
            });

        });

    }

    //
    // Get Channel information from Slack
    //
    channelInfo(tokenParam:string, channelParam:string): Promise<SlackChannel> {

        return new Promise<SlackChannel>((resolve, reject) => {

            let web = new WebClient(tokenParam);

            let params = {
                token: tokenParam,
                channel: channelParam
            };

            let channel:SlackChannel = new SlackChannel;
            web.channels.info(params).then((data) => {

                log.debug("Slack Channel Data: ", data );

                // Direct message has no channel
                if(data['ok']) {
                    channel.fromJSON(data['channel']);
                }
                resolve(channel);
            }).catch((err) => {
                log.fatal("Fatal: ", err);
                reject(channel);
            });

        });

    }

    //
    // Get Team information from Slack
    //
    workspaceInfo(tokenParam:string, teamParam:string): Promise<SlackWorkspace> {

        return new Promise<SlackWorkspace>((resolve, reject) => {

            let web = new WebClient(tokenParam);

            let params = {
                token: tokenParam,
                team: teamParam
            };

            let workspace:SlackWorkspace = new SlackWorkspace;
            web.team.info(params).then((data) => {

                log.debug("Slack Workspace Data: ", data );

                // Direct message has no channel
                if(data['ok']) {
                    workspace.fromJSON(data['team']);
                }
                resolve(workspace);
            }).catch((err) => {
                log.fatal("Fatal: ", err);
                reject(workspace);
            });

        });

    }

    //
    // Get File information from Slack
    //
    fileInfo(tokenParam:string, fileParam:string): Promise<SlackFile> {

        return new Promise<SlackFile>((resolve, reject) => {

            let web = new WebClient(tokenParam);

            let params = {
                token: tokenParam,
                file: fileParam
            };

            log.debug("Params: ", params);

            let file:SlackFile = new SlackFile;
            web.files.info(params).then((data) => {

                log.debug("Slack File Data: ", data );

                // Direct message has no channel
                if(data['ok']) {
                    file.fromJSON(data['file']);
                }
                resolve(file);
            }).catch((err) => {
                log.fatal("Fatal: ", err);
                reject(file);
            });

        });

    }

    //
    // Slack command: enrollment
    //
    cloudAzEnrolView(triggerId:string, settings:SlackSettings):any {

        let view:any = {
            trigger_id: triggerId,
            view: {
                type: "modal",
                callback_id: 'save-enrol',
                title: {
                    type: "plain_text",
                    text: "EM for Slack Enrolment"
                },
                submit: {
                    type: "plain_text",
                    text: "Submit",
                    emoji: true
                },
                close: {
                    type: "plain_text",
                    text: "Cancel",
                    emoji: true
                },
                blocks: [
                    {
                        type: "input",
                        block_id: "url_input",
                        element: {
                            type: "plain_text_input",
                            action_id: "cc_url",
                            placeholder: {
                                type: "plain_text",
                                text: "https://www.cloudaz.com/console"
                            }
                        },
                        label: {
                            type: "plain_text",
                            text: "CloudAz URL"
                        }
                    },            
                    {
                        type: "input",
                        block_id: "name_input",
                        element: {
                            type: "plain_text_input",
                            action_id: "cc_username",
                            placeholder: {
                                type: "plain_text",
                                text: "Administrator"
                            }
                        },
                        label: {
                            type: "plain_text",
                            text: "Username"
                        }
                    },            
                    {
                        type: "input",
                        block_id: "password_input",
                        element: {
                            type: "plain_text_input",
                            action_id: "cc_password",
                            placeholder: {
                                type: "plain_text",
                                text: "Password"
                            }
                        },
                        label: {
                            type: "plain_text",
                            text: "Password"
                        }
                    },
                ]
            }
        };

        return view;
    }

    //
    // Slack command: Help
    //
    cloudAzHelpView(triggerId:string, settings:SlackSettings):any {

        let view:any = {
            trigger_id: triggerId,
            view: {
                type: "modal",
                title: {
                    type: "plain_text",
                    text: "EM for Slack Help"
                },
                close: {
                    type: "plain_text",
                    text: "Close",
                    emoji: true
                },
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "Hey there 👋 I'm EM4Slack Bot. I'm here to help you get started with NextLabs Entitlement Management for Slack. Follow the following simple steps to enable NextLabs Entitlement Management for Slack. Make sure you are login as owner or workspace administrator before running the following commands:"
                        }
                    },
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "1️⃣ Type in `/em4slack signup` command to signup for NextLabs CloudAz service."
                        }
                    },
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "2️⃣ Type in `/em4slack setup` command to setup your connection to CloudAz service. The information is contained in the confirmation email that you recieved upon registering with CloudAz service."
                        }
                    },
                    //{
                    //    type: "section",
                    //    text: {
                    //        type: "mrkdwn",
                    //        text: "3 Type in `/em4slack enrol` command to enable Entitlement Management for Slack to manage the protection. Select the activities that you would like to be protected. Upon completion of enrollment, Entitlement Management for Slack will be automatically activated"
                    //    }
                    //},
                ]
            }
        };

        return view;
    }

    //
    // Slack command: enrollment
    //
    cloudAzEnrolMessage2(triggerId:string, settings:SlackSettings):any {

        let dialog:any = {
            trigger_id: triggerId,
            dialog: {
                title: 'CloudAz Enrolment',
                callback_id: 'save-enrolment',
                submit_label: 'Submit',
                elements: [
                    {
                        label: 'User Object',
                        name: 'userobj',
                        type: 'select',
                        value: "yes",
                        optional: true,
                        hint: "Enrol user object attributes with cloudAz",
                        options: [
                        {
                            label: 'Yes',
                            value: 'yes'
                        },
                        {
                            label: 'No',
                            value: 'no'
                        },
                        ],
                    },
                    {
                        label: 'Channel Object',
                        name: 'chanelobj',
                        type: 'select',
                        value: "yes",
                        optional: true,
                        hint: "Enrol channel object attributes with cloudAz",
                        options: [
                        {
                            label: 'Yes',
                            value: 'yes'
                        },
                        {
                            label: 'No',
                            value: 'no'
                        },
                        ],
                    },
                    {
                        label: 'File Object',
                        name: 'fileobj',
                        type: 'select',
                        value: "yes",
                        optional: true,
                        hint: "Enrol file object attributes with cloudAz",
                        options: [
                        {
                            label: 'Yes',
                            value: 'yes'
                        },
                        {
                            label: 'No',
                            value: 'no'
                        },
                        ],
                    },
                ],
            },
        };
        
        return dialog;  
    }

    //
    // Slack command: cloudaz settings
    //
    cloudAzSetupMessage(triggerId:string, settings:SlackSettings):any {

        //let access_token = envConfig.OAUTH_ACCESS_TOKEN;
        let dialog:any = {
            //token: access_token,
            trigger_id: triggerId,
            dialog: {
                title: 'CloudAz Service Setup',
                callback_id: 'save-setup',
                submit_label: 'Submit',
                elements: [
                    {
                        label: 'Hostname',
                        type: 'text',
                        name: 'hostname',
                        value: settings.cloudaz_hostname,
                        optional: false,
                        placeholder: 'Hostname',
                    },
                    {
                        label: 'Username',
                        type: 'text',
                        name: 'username',
                        value: settings.cloudaz_username,
                        optional: false,
                        placeholder: 'Username',
                    },
                    {
                        label: 'Password',
                        type: 'text',
                        name: 'password',
                        value: settings.cloudaz_password,
                        optional: false,
                        placeholder: 'Password',
                    },
                ],
            },
        };
        
        //return JSON.stringify(dialog);
        return dialog;

    };

    //
    // Slack command: cloudaz settings
    //
    cloudAzSignupMessage(triggerId:string, settings:SlackSettings):any {

        //let access_token = envConfig.OAUTH_ACCESS_TOKEN;
        let dialog:any = {
            //token: access_token,
            trigger_id: triggerId,
            dialog: {
                title: 'CloudAz Service Signup',
                callback_id: 'save-signup',
                submit_label: 'Submit',
                elements: [
                    {
                        label: 'First Name',
                        type: 'text',
                        name: 'firstname',
                        value: '',
                        optional: false,
                        placeholder: 'First Name',
                    },
                    {
                        label: 'Last Name',
                        type: 'text',
                        name: 'lastname',
                        value: '',
                        optional: false,
                        placeholder: 'Last Name',
                    },
                    {
                        label: 'Company',
                        type: 'text',
                        name: 'company',
                        value: '',
                        optional: false,
                        placeholder: 'Company',
                    },
                    {
                        label: 'Email',
                        type: 'text',
                        name: 'email',
                        value: '',
                        optional: false,
                        placeholder: 'Email',
                    },
                    {
                        label: 'Phone',
                        type: 'text',
                        name: 'phone',
                        value: '',
                        optional: true,
                        placeholder: 'Phone',
                    },
                ],
            },
        };
        
        //return JSON.stringify(dialog);
        return dialog;

    };


    //
    // Slack command: cloudaz rules
    //
    cloudAzRulesMessage(triggerId:string, settings:SlackSettings, rules:SlackRule): any {

        let dialog:any = {
            trigger_id: triggerId,
            dialog: {
                title: 'CloudAz Rules Setup',
                callback_id: 'save-rules',
                submit_label: 'Submit',
                elements: [
                {
                    label: 'Channel Attributes',
                    type: 'textarea',
                    name: 'channel',
                    value: rules.channel_fields,
                    optional: true,
                    hint: 'Attach custom attributes to channels in JSON format',
                },
                {
                    label: 'User Attributes',
                    type: 'textarea',
                    name: 'user',
                    value: rules.user_fields,
                    optional: true,
                    hint: 'Attach custom attributes to users in JSON format',
                },
                ],
            },
        };

        return dialog;

    };

    //
    // For trial user
    // Slack command: cloudaz rules
    //
    cloudAzFreeRulesMessage(triggerId:string, settings:SlackSettings, freeRule:SlackFreeRule):any {

        
        log.debug("Setup: ", settings);
        
        let tz = 'Asia/Kuala_Lumpur';

        let dialog:any = {
            trigger_id: triggerId,
            dialog: {
                title: 'CloudAz for Slack Setup',
                callback_id: 'save-free-rules',
                submit_label: 'Submit',
                elements: [
                {
                    label: 'Channel',
                    name: 'channel',
                    type: 'select',
                    data_source: 'channels',
                    value: freeRule.channel,
                    hint: "Select the channel to safeguard",
                    optional: true,
                },
                {
                    label: 'Prevent Upload Files',
                    name: 'uploadfile',
                    type: 'select',
                    value: freeRule.upload_file,
                    optional: true,
                    hint: "Enable to prevent user from uploading file into the channel",
                    options: [
                    {
                        label: 'Yes',
                        value: 'yes'
                    },
                    {
                        label: 'No',
                        value: 'no'
                    },
                    ],
                },
                {
                    label: 'Prevent Emoji Use',
                    name: 'useemoji',
                    type: 'select',
                    value: freeRule.use_emoji,
                    optional: true,
                    hint: "Enable to prevent user from using emoji as reaction",
                    options: [
                    {
                        label: 'Yes',
                        value: 'yes'
                    },
                    {
                        label: 'No',
                        value: 'no'
                    },
                    ],
                },
                ],
            },
        };

        return dialog;

    };

    //
    // Kick user from a channel
    //
    kickUserFromChannel(tokenParam:string, userParam:string, channelParam:string): Promise<string> {

        return new Promise((resolve, reject) => {

            log.debug("Token: ", tokenParam);
            log.debug("Channel: ", channelParam);
            log.debug("User: ", userParam);

            let web = new WebClient(tokenParam);

            let params = { 
                token: tokenParam,
                channel: channelParam,
                user: userParam
            };

            web.channels.kick(params).then(function(data) {

                log.debug("Result: ", data);

                if(data.ok) {
                    resolve("ok");
                } else {
                    log.debug("Error: ", data.error);
                    reject("fail");
                }
            }).catch((err) => {
                log.fatal("Fatal: ", err);

                reject("fail");
            });

        });

    }

    //
    // Remove an uploaded file from a channel
    //
    removeFileFromChannel(tokenParam:string, fileParam:string): Promise<string> {

        return new Promise((resolve, reject) => {

            log.debug("Token: ", tokenParam);
            log.debug("File: ", fileParam);

            let web = new WebClient(tokenParam);

            let params = { 
                token: tokenParam,
                file: fileParam
            };

            web.files.delete(params).then((result) => {

                log.debug("Result: ", result);

                if(result.ok) {
                    resolve("ok");
                } else {
                    log.debug("Error: ", result.error);
                    reject("fail");
                }
            }).catch((err) => {
                log.fatal("Fatal: ", err);
                reject("fail");
            });

        });

    }

    /**
     * 
     * Parse and convert the OAuth results into settings
     * 
     * @param data - JSON data returned from Slak OAuth
     */
    parseOAuthResult(data:any):SlackSettings {
        let settings: SlackSettings = new SlackSettings();

        settings.team_id = data['team']['id'];
        settings.team_name = data['team']['name'];

        if(data['enterprise'] !== null) {
            settings.enterprise_id = data['enterprise']['id'];
            settings.enterprise_name = data['enterprise']['name'];
        } else {
            settings.enterprise_id = "";
            settings.enterprise_name = "";
        }
        settings.webhook_channel_id = data['incoming_webhook']['channel_id']
        settings.webhook_url = data['incoming_webhook']['url']
        settings.bot_user_id = data['bot_user_id'];

        // TODO: evaluate this later
        settings.bot_access_token = data['access_token'];
        //settings.access_token = data['access_token'];
        settings.created_id = data['authed_user']['id'];
        settings.authed_user_id = data['authed_user']['id'];
        settings.authed_user_token = data['authed_user']['access_token'];

        return settings;
    }

    //
    // Post a message to a channel
    //
    postMessageToChannel(securityToken:string, channel:string, message:string): Promise<string> {

        return new Promise(function(resolve, reject) {

            let web = new WebClient(securityToken);

            let params = { 
            token : securityToken,
            channel : channel,
            text : message,
            //as_user: false,
            username: envConfig.BOT_NAME
            };

            web.chat.postMessage(params).then((data) => {
                log.debug(data);
                resolve("ok");
            }).catch(function(error) {
                log.fatal(error);
                reject("fail");
            });

        });

    }

    //
    // Remove an emoji from a message
    //
    removeReactionFromChannel = function(tokenParam:string, reactionParam:string, channelParam:string, ts:any) {

        return new Promise(function(resolve, reject) {

            log.debug("Token: ", tokenParam);
            log.debug("Reaction: ", reactionParam);
            log.debug("Channel: ", channelParam);
            log.debug("Timestamp: ", ts);

            let web = new WebClient(tokenParam);

            let params = { 
                token: tokenParam,
                name: reactionParam,
                channel: channelParam,
                timestamp: ts
            };

            web.reactions.remove(params).then(function(data) {

                log.debug("Result: ", data);

                if(data.ok) {
                    resolve("ok");
                } else {
                    log.debug("Error: ", data.error);
                    reject("fail");
                }
            }).catch((err:any) => {
                log.debug("Fatal: ", err);

                reject("fail");
            });

        });

    }

    //
    // Open Dialog in Slack
    //
    slackDialogOpen = function(token:string, jsonData:any, res:any) {
        
        // open the dialog by calling dialogs.open method and sending the payload
        let securityToken:String = "Bearer " + token;
        const config = {
            headers: {
            'content-type': 'application/json',
            'Authorization': securityToken,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
            
            },
            withCredentials: true
        }

        const transport = axios.create(config);

        transport.post('https://slack.com/api/dialog.open', jsonData)
            .then((result) => {
                
                log.debug("Result: ", result);
                
                //res.send('Successfully saved').end();
                res.send();
            }).catch((err) => {
                log.fatal("Error: ", err);
                res.sendStatus(500);
            });

    };

    //
    // View open in Slack
    //
    slackViewOpen = function(token:string, jsonData:any, res:any) {
        
        // open the dialog by calling dialogs.open method and sending the payload
        let securityToken:String = "Bearer " + token;
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': securityToken,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'            
            },
            withCredentials: true
        }

        const transport = axios.create(config);

        transport.post('https://slack.com/api/views.open', jsonData)
            .then((result) => {
                
                log.debug("Result: ", result.data);
                
                //res.send('Successfully saved').end();
                res.send();
            }).catch((err) => {
                log.fatal("Error: ", err);
                res.sendStatus(500);
            });

    };

    //
    // View Update in Slack
    //
    slackViewUpdate = function(token:string, jsonData:any, res:any) {
        
        // open the dialog by calling dialogs.open method and sending the payload
        let securityToken:String = "Bearer " + token;
        const config = {
            headers: {
            'content-type': 'application/json',
            'Authorization': securityToken,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
            
            },
            withCredentials: true
        }

        const transport = axios.create(config);

        transport.post('https://slack.com/api/views.update', jsonData)
            .then((result) => {
                
                log.debug("Result: ", result);
                
                //res.send('Successfully saved').end();
                res.send();
            }).catch((err) => {
                log.fatal("Error: ", err);
                res.sendStatus(500);
            });

    };

    //
    // View Update in Slack
    //
    slackViewPush = function(token:string, jsonData:any, res:any) {
        
        // open the dialog by calling dialogs.open method and sending the payload
        let securityToken:String = "Bearer " + token;
        const config = {
            headers: {
            'content-type': 'application/json',
            'Authorization': securityToken,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
            
            },
            withCredentials: true
        }

        const transport = axios.create(config);

        transport.post('https://slack.com/api/views.push', jsonData)
            .then((result) => {
                
                log.debug("Result: ", result);
                
                //res.send('Successfully saved').end();
                res.send();
            }).catch((err) => {
                log.fatal("Error: ", err);
                res.sendStatus(500);
            });

    };    
}

export const slackService = new SlackService();
