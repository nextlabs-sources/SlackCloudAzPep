import express from 'express';
import http from 'http';
import * as bodyParser from 'body-parser';
import * as axiosService from 'axios';

import {log} from './utils/logger';

// Common configurations
import envConfig from './config/slack_entitlement';

//import { slackUtil } from './utils/slack_utils';
//import { SlackSettings, SlackUser, SlackChannel, SlackFreeRule, SlackRule } from './models/data_models';
//import { dataService } from './services/data_services';
//import { slackService } from './services/slack_services';
//import { cloudAzService } from './services/nextlabs_services';

// Slack API
//import { WebClient, WebAPICallResult } from '@slack/web-api';
//import { ConsoleLogger } from '@slack/logger';
import * as slackEventAPI from '@slack/events-api';
import * as slackMessageAPI from '@slack/interactive-messages';
import { SlackEventAdapter } from "@slack/events-api/dist/adapter";
import { EventEmitter } from "events";

// Initialize using verification token from environment variables
const slackEvents: SlackEventAdapter & EventEmitter = slackEventAPI.createEventAdapter(envConfig.ADMIN_SLACK_SIGNING_SECRET, { includeBody: true }) as any;
const slackMessages = slackMessageAPI.createMessageAdapter(envConfig.ADMIN_SLACK_VERIFICATION_TOKEN); 

// Express app initialization
const app = express();

// Configure Express to parse incoming JSON data

const axios = axiosService.default;

// Static files configuration
// app.use(express.static(path.join(__dirname, "../web")));

// ###################################
// Default CloadAz OAuth2
// ###################################
app.get('/slack_admin/oauth', function(req,res){

	let query = req.query;

	log.debug("Admin OAuth", query);

	let authQuery = 'https://slack.com/api/oauth.access?code='
            + query.code +
            '&client_id=' + envConfig.ADMIN_SLACK_CLIENT_ID +
            '&client_secret=' + envConfig.ADMIN_SLACK_CLIENT_SECRET +
            '&redirect_uri=' + envConfig.ADMIN_SLACK_REDIRECT_URL;

	log.debug(authQuery);

	axios.get(authQuery)
	    .then((result) => {
	    	let slack_data = result.data;
	    	log.debug("Result: ", slack_data);
	        

	        log.debug("Slack data: ", slack_data)
	        if (!slack_data.ok){

	            res.send("Error encountered: \n" + JSON.stringify(slack_data)).status(200).end()
	        }else{

                res.send("Successfully registered");
	        }	    
    	}).catch((err) => {
    		log.fatal(err);
	    	res.send("Error encountered: \n" + err).status(200).end()
	});

});

app.get('/slack_admin/events2', (req, res) => {
    console.log("Query: ", req.query);
    //let payload = JSON.parse(req.body.payload);

    console.log(envConfig.ADMIN_SLACK_SIGNING_SECRET);
    console.log(">>>>");
    console.log(">>>>");
    console.log(">>>>");
    console.log(">>>>");

    res.send(JSON.stringify({}));

});

//app.use( express.json() );
app.use('/slack_admin/events', slackEvents.expressMiddleware());

//You must use a body parser for JSON before mounting the adapter
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));

slackEvents.on('message', (event, body) => {
    log.debug("message: ", event);
});

app.post('/slack_admin/events3', (req, res) => {
    console.log("Body: ", req.body);

    //let payload = JSON.parse(req.body.payload);

    console.log(">>>>");
    console.log(">>>>");
    console.log(">>>>");
    console.log(">>>>");

    res.send(JSON.stringify({}));

});

// Start function
export const startAdmin = (port: number): Promise<void> => {
    const server = http.createServer(app);

    return new Promise<void>((resolve, reject) => {
        log.debug("Admin Service started...");
        server.listen(port, resolve);
    });
};


/*
import { App } from '@slack/bolt';
import { WebAPICallResult } from '@slack/web-api';
//import { newRequest } from '../approvalLogic';
import envConfig from './config/slack_entitlement';
import { SlackSettings, SlackUser, SlackAppEvent } from './models/data_models';
import { cloudAzService } from './services/nextlabs_services';

import {log} from './utils/logger';

const uToken = envConfig.ADMIN_OAUTH_ACCESS_TOKEN; //replace with the Slack access token
const signSecret = envConfig.ADMIN_SLACK_CLIENT_SECRET; //replace with the Slack signing secret

//Allows Bolt to be used with only a user token and not a bot token
const authorizeFn = async () => {
    return {
        userToken: uToken,
    }
}
// Initializes your app with your signing secret
const boltApp = new App({
    signingSecret: signSecret,
    authorize: authorizeFn,
    ignoreSelf: false
});

boltApp.event('app_requested', ({ event }) => {

    let appEvent:SlackAppEvent = new SlackAppEvent();

    appEvent.fromJSON(event);

    log.debug("Event: ", event);

});

boltApp.get('/redirect/oauth', function (req, res) {
    const client_id = "" //replace with your client_id
    const client_secret = "" //replace with your client_secret
    const code = req.param("code");
    const url = `https://slack.com/api/oauth.access?code=${code}&client_id=${client_id}&client_secret=${client_secret}`
    res.redirect(url);
});



interface AdminAppsRequestsListResult extends WebAPICallResult {
    app_requests: any[];
}

// get all outstanding requests from a team
let pullRequests = async (team: string) => {
    try {
        // Call the admin.apps.requests.list
        const result = await boltApp.client.apiCall("admin.apps.requests.list", {
            token: uToken,
            team_id: team,
            limit: 1000
        }) as AdminAppsRequestsListResult;
        result.app_requests.forEach(async (request) => {
            let newAppRequest = { app_request: request }
            await newRequest(newAppRequest);
        });
    }
    catch (error) {
        console.error(error);
    }
}

let approveRequest = async (team: string, request_id: string) => {
    try {
        // Call the admin.apps.requests.list
        const result = await boltApp.client.apiCall("admin.apps.approve", {
            token: uToken,
            team_id: team,
            limit: 1000,
            request_id
        });
    }
    catch (error) {
        console.error(error);
    }
}

let rejectRequest = async (team: string, request_id: string) => {
    try {
        // Call the admin.apps.requests.list
        const result = await boltApp.client.apiCall("admin.apps.restrict", {
            token: uToken,
            team_id: team,
            limit: 1000,
            request_id
        });
    }
    catch (error) {
        console.error(error);
    }
}

let approveApp = async (team: string, app_id: string) => {
    try {
        // Call the admin.apps.requests.list
        const result = await boltApp.client.apiCall("admin.apps.approve", {
            token: uToken,
            team_id: team,
            limit: 1000,
            app_id
        });
    }
    catch (error) {
        console.error(error);
    }
}

let restrictApp = async (team: string, app_id: string) => {
    try {
        // Call the admin.apps.requests.list
        const result = await boltApp.client.apiCall("admin.apps.restrict", {
            token: uToken,
            team_id: team,
            limit: 1000,
            app_id
        });
    }
    catch (error) {
        console.error(error);
    }
}


(async () => {
    // Start your app
    await boltApp.start(envConfig.ADMIN_HTTP_PORT || 4000);
    console.log('Listening on port 4000 (⚡️ Bolt app is running');
})();

*/