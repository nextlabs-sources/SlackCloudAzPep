// Firebase
import * as dbAdmin from 'firebase-admin';
import {log} from '../utils/logger';
//import { JsonLayout } from 'ts-log-debug/lib/layouts/components/JsonLayout';
//import { settings } from 'cluster';

import envConfig from '../config/slack_entitlement';
import * as fb from '../config/slack4cloudaz-firebase-adminsdk.json';
import {SlackSettings, SlackUser, SlackChannel, SlackRule, SlackFreeRule} from '../models/data_models';

// Initialize Firebase  
dbAdmin.initializeApp({
    credential: dbAdmin.credential.cert({
        projectId: fb.project_id,
        privateKey: fb.private_key,
        clientEmail: fb.client_email,
    }),
    databaseURL: envConfig.FIREBASE_DATABASE
});
  
// Get a database reference to our data
const db = dbAdmin.database();
const dbRef = db.ref("data");

class DataService {

    constructor() {
    }

    fb_tests() {
        let settingsRef = dbRef.child("T0808FA6P" + "/settings");
        settingsRef.once("value", function(data) {
            let settings = data.val();
            log.debug(settings);
            

        });
    }

    saveOAuthToken(data: SlackSettings) {
    
        let settingRef = dbRef.child(data.team_id);

        settingRef.set( {
            settings: data
        });
    
        settingRef.set({
          settings: {
            team_id: data.team_id,
            team_name: data.team_name,
            enterprise_id: data.enterprise_id,
            enterprise_name: data.enterprise_name,
            access_token: data.access_token,
            bot_access_token: data.bot_access_token,
            bot_user_id: data.bot_user_id,
            authed_user_id: data.authed_user_id,
            authed_user_token: data.authed_user_token,
            webhook_channel_id: data.webhook_channel_id,
            webhook_url: data.webhook_url,
            created_id: data.created_id,
            created_date: data.created_date,	    
          }
        });
        
    }

    teamSettings(teamId:string): Promise<SlackSettings> {

        return new Promise<SlackSettings>((resolve, reject) => {

            let settingsRef = dbRef.child(teamId + "/settings");
            settingsRef.once("value", (data) => {

                let jsonData = data.val();
                
                let teamProfile:SlackSettings = new SlackSettings;
                if(jsonData != null) {
                    teamProfile.fromFirebase(jsonData);
                }

                resolve(teamProfile);
            });

        });
    }

    //
    // Save rules into firebase for free accountt
    //
    saveRules(teamId:string, rule:SlackRule) {

        let updateDate = new Date();

        let ruleRef = dbRef.child(teamId);
        ruleRef.update({
            rules: {
                channel_fields: rule.channel_fields,
                user_fields: rule.user_fields,
                channels: rule.channels,
                workspaces: rule.workspaces,
                default_join_channel: rule.default_join_channel,
                default_upload_file:rule.default_upload_file,
                default_share_file:rule.default_share_file,
                default_use_emoji:rule.default_use_emoji,
                default_join_workspace: rule.default_join_workspace
            }
        });

    };

    saveNxlSetting(teamId:string, data: SlackSettings) {
    
        let updateDate = new Date();

        let settingRef = dbRef.child(teamId + "/settings");
        settingRef.update({
            cloudaz: {
                hostname: data.cloudaz_hostname,
                username: data.cloudaz_username,
                password: data.cloudaz_password,
          }
        });
        
    }

    //
    // Get CloudAz Free rules
    //
    teamFreeRules(team:string): Promise<SlackFreeRule> {

        return new Promise((resolve, reject) => {

            let settingsRef = dbRef.child(team + "/free_rules");
            settingsRef.once("value", function(data) {

                let val = data.val();

                log.debug("Team Rules: ", val );
                let rule:SlackFreeRule = new SlackFreeRule;
                rule.fromJSON(val);

                resolve(rule);
            });

        });
    }


    //
    // Get CloudAz Free rules
    //
    teamRules(team:string): Promise<SlackRule> {

        return new Promise((resolve, reject) => {

            let settingsRef = dbRef.child(team + "/rules");
            settingsRef.once("value", function(data) {

                let val = data.val();

                log.debug("Team Rules: ", val );
                let rule:SlackRule = new SlackRule;
                rule.fromJSON(val);

                resolve(rule);
            });

        });
    }


}

export const dataService = new DataService();
