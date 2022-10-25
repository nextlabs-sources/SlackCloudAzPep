//import * as axiosService from "axios";
import * as https from "https";
import * as htmlparser2 from "htmlparser2";
import qs from 'qs';
import fs from 'fs';
import requestPromise from 'request-promise';
import {log} from '../utils/logger';

// Common configurations
import envConfig from '../config/slack_entitlement';
import { SlackSettings, SlackUser, SlackChannel, CloudAzLoginForm, SlackFile, ResponseData } from '../models/data_models';
import { ComponentQuery, PolicyQuery, PolicyModelQuery} from './nextlabs_query';
import { slackChannelModel } from './data/slack_channel_model';
import { slackFileModel } from './data/slack_file_model';
import { slackWorkspaceModel } from './data/slack_workspace_model';
import { slackUserModel } from './data/slack_user_model';

import { resolve } from 'path';
import { format } from "util";
import { Logger } from "ts-log-debug";

import * as policyData from '../config/default_models.json';
import { response } from "express";
import * as tough from 'tough-cookie';
import { request } from "http";
import { CookieJar } from "request";

//const axios = axiosService.default;
//axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Nextlabs API
import * as openAz from 'nextlabs-openaz';
//const NextlabsOpenAz = require("nextlabs-openaz");
const NextLabsPEPAgent = openAz.NextLabsPEPAgent;
const PEPResponse = openAz.PEPResponse;
const Subject = openAz.Subject;
const Resource = openAz.Resource;
const Action = openAz.Action;
const Application = openAz.Application;
const Environment = openAz.Environment;
const XACML3 = openAz.XACML3;
const NextLabsXACML = openAz.NextLabsXACML;
const Decision = openAz.Decision;

class CloudAzService {

    constructor() {

    }

    getNextlabsConfig(settings:SlackSettings) {
        // TODO: use different settings for different client

        //envConfig["nextlabs.cloudaz.host"] = "";
        /*
        if(settings.cloudaz_hostname != null) {
            envConfig["nextlabs.cloudaz.oauth2.server"] = settings.cloudaz_hostname;
        }

        if(settings.cloudaz_username != null) {
            envConfig["nextlabs.cloudaz.oauth2.client_id"] = settings.cloudaz_username;
        }

        if(settings.cloudaz_password != null) {
            envConfig["nextlabs.cloudaz.oauth2.client_secret"] = settings.cloudaz_password;
        }
        */

        return envConfig;
    }

    //
    // Slack's file upload enforcer
    //
    authorizeFileUploadWithCloudAz(settings:SlackSettings, slackUser:SlackUser, 
        slackFile:SlackFile):Promise<string> {

        log.debug("Authorize File Upload with CloudAz");

        return new Promise((resolve, reject) => {
            //
            // Create subject
            //
            let user = this.createSubject(slackUser);
            log.debug("Nxl Subject: ", user);

            //
            // Create resource
            //
            let resource = this.createFileResource(slackFile);
            log.debug("Nxl Resource: ", resource);

            //
            // Create action
            // 
            //let action = new Action('UPD_FILE');
            let action = new Action('UPFILE');
            log.debug("Nxl Action: ", action);

            //Create application
            let agent = new NextLabsPEPAgent(this.getNextlabsConfig(settings));
            let application = new Application("nxl-pep-slack-client");

            agent.decide(user, resource, action, application).then((result:any) => {

                log.debug("Nxl Decision: ", result);

                let decision:string = result.getWrappedResult().Decision;

                resolve(decision);

            }).catch( (err:any) => {
                log.fatal("Fatal: ", err);

                reject("unknown");
            });

        }); 
    

    }

    //
    // Slack's channel enforcer
    //
    authorizeChannelWithCloudAz(settings:SlackSettings, slackUser:SlackUser, 
        slackChannel:SlackChannel): Promise<string> {

        log.debug("Authorize with CloudAz to join channel: ", settings);

        return new Promise((resolve, reject) => {

            //
            // Create subject
            //
            let user = this.createSubject(slackUser);
            log.debug("Nxl Subject: ", user);

            //
            // Create resource
            //
            let resource = this.createResource(slackChannel);
            log.debug("Nxl Resource: ", resource);

            //
            // Create action
            //
            let action = new Action('JNCL');
            log.debug("Nxl Action: ", action);

            //Create application
            let agent = new NextLabsPEPAgent(this.getNextlabsConfig(settings));
            let application = new Application("nxl-pep-slack-client");

            agent.decide(user, resource, action, application).then((result:any) => {

                log.debug("Result: ", result);

                let decision:string = result.getWrappedResult().Decision;

                resolve(decision);

            }).catch((err:any) =>{
                log.fatal("Fatal: ", err);
                reject("unknown");
            });
        });

    };

    //
    // Slack's file upload enforcer
    //
    authorizeReactionWithCloudAz(settings:SlackSettings, slackUser:SlackUser, 
        slackChannel:SlackChannel): Promise<string> {

        log.debug("Authorize Reaction with CloudAz");

        return new Promise((resolve, reject) => {

            //
            // Create subject
            //
            let user = this.createSubject(slackUser);

            //
            // Create resource
            //
            let resource = this.createResource(slackChannel);

            //
            // Create action
            //
            let action = new Action('EMOJI');
            log.debug("Action: ", action);

            //Create application
            let agent = new NextLabsPEPAgent(this.getNextlabsConfig(settings));
            let application = new Application("nxl-pep-slack-client");

            agent.decide(user, resource, action, application).then((result:any) => {

                log.debug("Result: ", result);

                let decision = result.getWrappedResult().Decision;

                log.debug("Decision: ", decision);
                resolve(decision);

            }).catch((err:any) =>{
                log.debug("Fatal: ", err);
                reject("unknown");
            });

        });

    }
    
    private initialiseLogin(url:string, username:string, password:string): Promise<CloudAzLoginForm> {

        log.debug("initialiseLogin");
        return new Promise((resolve, reject) => {

            let console_url = url + "/console";
            this.loadLoginPage(console_url).then((form:CloudAzLoginForm) => {
                form.username = username;
                form.password = password;

                return this.doLogin(form);
            }).then((form:CloudAzLoginForm) => {

                return this.doCASLogin(form);
            }).then((form:CloudAzLoginForm) => {
                //log.debug("result: ", form);

                resolve(form);
            }).catch((err) =>{
                reject("fail");
            });
    
        });
    }

    private loadLoginPage(url:string): Promise<CloudAzLoginForm> {
        log.debug("[loadLoginPage] Calling...", url);

        return new Promise((resolve, reject) => {
            let form:CloudAzLoginForm = new CloudAzLoginForm();
            
            let cookieJar:CookieJar = requestPromise.jar();

            let options = {
                method: 'GET',
                uri : url,
                insecure: true,
                rejectUnauthorized: false,
                resolveWithFullResponse: true,
                jar: cookieJar
            };

            requestPromise(options).then((response) => {
                //log.debug("[getRedirectUrl]Data: ", response);

                let head = response.headers;
                let cookie:any = head['set-cookie'];
                //log.debug("Cookie: ", cookie);
                log.debug("Cookie jar: ", cookieJar);
                form.cookie = cookieJar;

                let req:any = response.request;
                let uri:any = req.uri;

                //log.debug("Request: ", req);
                //log.debug("Request URI: ", uri);
                form.base_url = uri.protocol + "//" + uri.host;

                let htmlData = response.body;
                log.debug("Form Body: ", htmlData);

                const parser = new htmlparser2.Parser({
                    onopentag(name, attr) {
                        if (name === "input") {
                            if(attr.name === "lt") {
                                //log.debug("Lt: ", attr.value);
                                form.lt = attr.value;
                            } else if(attr.name === "_eventId") {
                                //log.debug("EventId: ", attr.value);
                                form.eventId = attr.value;
                            } else if(attr.name === "submit") {
                                //log.debug("Submit: ", attr.value);
                                form.submit = attr.value;
                            } else if(attr.name === "execution") {
                                //log.debug("Execution: ", attr.value);
                                form.execution = attr.value;
                            }
                        }

                        if(name === "form") {
                            if(attr.id == "fm1") {
                                //form.action_url = cas_url + attr.action
                                form.action_url = attr.action;

                                //let casIndex:number = url.indexOf("/cas");
                                //form.base_url = url.substring(0, casIndex);
                            }
                        }
                    },
                    ontext(text) {
                        // Do nothing
                    },
                    onclosetag(tagname) {
                        // Do nothing
                    }
                },
                { 
                    decodeEntities: true 
                });

                parser.write(htmlData);
                parser.end();

                resolve(form);
            })
            .catch( (err) => {
                log.debug("Failed: ", err);
                resolve(form);
            });
        });

    }

    private doLogin(form:CloudAzLoginForm): Promise<CloudAzLoginForm> {
        log.debug("doLogin", form);

        return new Promise((resolve, reject) => {

            let loginUrl = form.base_url + form.action_url;
            log.debug("Login URL: ", loginUrl);

            let options:any = {
                url: loginUrl,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
                },  
                form: {
                    'username': form.username,
                    'password': form.password,
                    'lt': form.lt,
                    'execution': form.execution,
                    '_eventId': form.eventId,
                    'submit': form.submit    
                },
                insecure: true,
                rejectUnauthorized: false,
                resolveWithFullResponse: true,
                jar: form.cookie
            }

            requestPromise(options)
            .then((result) => {
                //log.debug("Cookie jar: ", form.cookie);
                //log.debug("Body: ", result.body);

                resolve(form);
            })
            .catch((err) => {

                if(err.statusCode == 302) {
                    // log.debug("Redirected: ", err);
                    
                    let res = err.response;
                    let head = res.headers;
                    //log.debug("Head: ", head);
                    //let cookie:any = head['set-cookie'];
                    //log.debug("Cookie: ", cookie);

                    //log.debug("Cookie jar: ", form.cookie);

                    form.location = head.location;
                    log.debug("Location: ", form.location);

                    log.debug("Body: ", res.body);

                    resolve(form);
                } else {
                    log.debug("Failed: ", err);
                    reject(err);
                }

            });

        });
    }

    private doCASLogin(form:CloudAzLoginForm): Promise<CloudAzLoginForm> {

        log.debug("doCASLogin", form);

        return new Promise((resolve, reject) => {

            let options:any = {
                url: form.location,
                method: 'GET',
                headers: {
                    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
                },
                insecure: true,
                rejectUnauthorized: false,
                resolveWithFullResponse: true,
                jar: form.cookie
            }

            requestPromise(options)
            .then((result) => {
                //log.debug("Cookie jar: ", form.cookie);
                //log.debug("Body: ", result.body);

                resolve(form);
            })
            .catch((err) => {
                if(err.statusCode == 302) {
                    // log.debug("Redirected: ", err);
                    
                    let res = err.response;
                    let head = res.headers;
                    //log.debug("Head: ", head);
                    //let cookie:any = head['set-cookie'];
                    //log.debug("Cookie: ", cookie);

                    //log.debug("Cookie jar: ", form.cookie);

                    form.location = head.location;
                    log.debug("Location: ", form.location);

                    log.debug("Body: ", res.body);

                    resolve(form);
                } else {
                    reject(err);
                }
            });
        });

    }

    private post(url:string, cookie:CookieJar, jsonData:any): Promise<any> {

        log.debug("Post to URL: ", url);

        return new Promise((resolve, reject) => {

            let options:any = {
                url: url,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
                },  
                body: jsonData,
                insecure: true,
                json: true,
                rejectUnauthorized: false,
                resolveWithFullResponse: false,
                jar: cookie
            }

            requestPromise(options)
            .then((result) => {

                //log.debug("POST: ", result);
                //let resData:ResponseData = new ResponseData();
                //resData.status = "ok",
                //resData.data = result

                resolve(result);
            })
            .catch((err) => {


                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if(err.statusCode == 302) {
                        // log.debug("Redirected: ", err);
                        
                        let res = err.response;
                        let head = res.headers;
        
                        let location:String = head.location;
                        log.fatal("POST headers", head);    
                        log.debug("POST location: ", location);
    
                    } else {
                        let res = err.response;
                        let head = res.headers;

                        log.fatal("POST statusCode", err.statusCode);
                        log.fatal("POST headers", head);    
                        log.fatal("POST body", res.body);
                    }
                } else if (err.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    log.fatal("POST Request", err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    log.fatal("POST Message", err.message);
                }
                log.fatal("POST Optios", err.options);

                log.debug("Failed: ", err);

                reject(err);

            });

        });

    }

    private get(url:string, qs:any, cookie:CookieJar, jsonData:any): Promise<any> {

        log.debug("GET URL: ", url);

        return new Promise((resolve, reject) => {

            let options:any = {
                url: url,
                qs: qs,
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
                },
                json: true,
                insecure: true,
                rejectUnauthorized: false,
                resolveWithFullResponse: false,
                jar: cookie
            }

            requestPromise(options)
            .then((result) => {

                //log.debug("GET: ", result);

                //let resData:ResponseData = new ResponseData();
                //resData.status = "ok",
                //resData.data = result

                resolve(result);
            })
            .catch((err) => {


                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if(err.statusCode == 302) {
                        // log.debug("Redirected: ", err);
                        
                        let res = err.response;
                        let head = res.headers;
        
                        let location:String = head.location;
                        log.fatal("GET headers", head);    
                        log.debug("GET location: ", location);
    
                    } else {
                        let res = err.response;
                        let head = res.headers;

                        log.fatal("GET statusCode", err.statusCode);
                        log.fatal("GET headers", head);    
                        log.fatal("GET body", res.body);
                    }
                } else if (err.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    log.fatal("GET Request", err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    log.fatal("GET Message", err.message);
                }
                log.fatal("GET Optios", err.options);

                log.debug("Failed: ", err);

                reject(err);

            });

        });

    }

    createSubject(user:SlackUser):any {
        
        log.debug("SlackUser: ", user);

        let subj = new Subject('Slack User');
        subj.addAttribute('slack', 'yes');
        if(user.user_id != null && user.user_id != "") {
            subj.addAttribute('user_id', user.user_id);
        }
        if(user.user_name != null && user.user_name != "") {
            subj.addAttribute('user_name', user.user_name);
        }
        if(user.team_id != null && user.timezone != "") {
            subj.addAttribute('team_id', user.team_id);
        }
        if(user.team_name != null && user.team_name != "") {
            subj.addAttribute('team_name', user.team_name);
        }
        if(user.timezone != null && user.timezone != "") {
            subj.addAttribute('timezone', user.timezone);
        }
        if(user.real_name != null && user.real_name != "") {
            subj.addAttribute('real_name', user.real_name);
        }
        if(user.title != null && user.title != "") {
            subj.addAttribute('title', user.title);
        }
        if(user.phone != null && user.phone != "") {
            subj.addAttribute('phone', user.phone);
        }
        if(user.skype != null && user.skype != "") {
            subj.addAttribute('skype', user.skype);
        }
        if(user.email != null && user.email != "") {
            subj.addAttribute('email', user.email);
        }
        if(user.enterprise_id != null && user.enterprise_id != "") {
            subj.addAttribute('enterprise_id', user.enterprise_id);
        }
        if(user.enterprise_name != null && user.enterprise_name != "") {
            subj.addAttribute('enterprise_name', user.enterprise_name);
        }

        if(user.is_admin != null && user.is_admin != "") {
            subj.addAttribute('is_admin', user.is_admin);
        }
        if(user.is_owner != null && user.is_owner != "") {
            subj.addAttribute('is_owner', user.is_owner);
        }
        if(user.is_primary_owner != null && user.is_primary_owner != "") {
            subj.addAttribute('is_primary_owner', user.is_primary_owner);
        }
        if(user.is_bot != null && user.is_bot != "") {
            subj.addAttribute('is_bot', user.is_bot);
        }
        if(user.is_app_user != null && user.is_app_user != "") {
            subj.addAttribute('is_app_user', user.is_app_user);
        }    
        return subj;
    }
    
    createResource(channel:SlackChannel):any {
        let resource:any = new Resource("Slack Channel");

        resource.setResourceType('slack_channel');
        resource.addAttribute('slack', 'yes');

        if(channel.channel_id != null && channel.channel_id != "") {
            resource.addAttribute('channel_id', channel.channel_id);
        }
        if(channel.channel_name != null && channel.channel_name != "") {
            resource.addAttribute('channel_name', channel.channel_name);
        }
        if(channel.team_id != null && channel.team_id != "") {
            resource.addAttribute('team_id', channel.team_id);
        }
        if(channel.team_name != null && channel.team_name != "") {
            resource.addAttribute('team_name', channel.team_name);
        }
        if(channel.enterprise_id != null && channel.enterprise_id != "") {
            resource.addAttribute('enterprise_id', channel.enterprise_id);
        }
        if(channel.enterprise_name != null && channel.enterprise_name != "") {
            resource.addAttribute('enterprise_name', channel.enterprise_name);
        }
        if(channel.timezone != null && channel.timezone != "") {
            resource.addAttribute('timezone', channel.timezone);
        }
        if(channel.creator != null && channel.creator != "") {
            resource.addAttribute('creator', channel.creator);
        }
        if(channel.topic != null && channel.topic != "") {
            resource.addAttribute('topic', channel.topic);
        }
        if(channel.purpose != null && channel.purpose != "") {
            resource.addAttribute('purpose', channel.purpose);
        }
        if(channel.is_private != null && channel.is_private != "") {
            resource.addAttribute('is_private', channel.is_private);
        }
        if(channel.is_shared != null && channel.is_shared != "") {
            resource.addAttribute('is_shared', channel.is_shared);
        }

        return resource;
    }

    createFileResource(file:SlackFile):any {
        let resource:any = new Resource("Slack File");

        resource.setResourceType('slack_file');
        resource.addAttribute('slack', 'yes');

        if(file.channel_id != null && file.channel_id != "") {
            resource.addAttribute('channel_id', file.channel_id);
        }
        if(file.channel_name != null && file.channel_name != "") {
            resource.addAttribute('channel_name', file.channel_name);
        }
        if(file.team_id != null && file.team_id != "") {
            resource.addAttribute('team_id', file.team_id);
        }
        if(file.team_name != null && file.team_name != "") {
            resource.addAttribute('team_name', file.team_name);
        }
        if(file.enterprise_id != null && file.enterprise_id != "") {
            resource.addAttribute('enterprise_id', file.enterprise_id);
        }
        if(file.enterprise_name != null && file.enterprise_name != "") {
            resource.addAttribute('enterprise_name', file.enterprise_name);
        }
        if(file.file_id != null && file.file_id != "") {
            resource.addAttribute('file_id', file.file_id);
        }
        if(file.file_name != null && file.file_name != "") {
            resource.addAttribute('file_name', file.file_name);
        }
        if(file.file_title != null && file.file_title != "") {
            resource.addAttribute('file_title', file.file_title);
        }
        if(file.file_type != null && file.file_type != "") {
            resource.addAttribute('file_type', file.file_type);
        }
        if(file.file_mode != null && file.file_mode != "") {
            resource.addAttribute('file_mode', file.file_mode);
        }
        if(file.mime_type != null && file.mime_type != "") {
            resource.addAttribute('mime_type', file.mime_type);
        }
        if(file.file_size != null && file.file_size != "") {
            resource.addAttribute('file_size', file.file_size);
        }
        if(file.editable != null && file.editable != "") {
            resource.addAttribute('editable', file.editable);
        }
        if(file.is_external != null && file.is_external != "") {
            resource.addAttribute('is_external', file.is_external);
        }
        if(file.is_public != null && file.is_public != "") {
            resource.addAttribute('is_public', file.is_public);
        }
        if(file.public_url_shared != null && file.public_url_shared != "") {
            resource.addAttribute('public_url_shared', file.public_url_shared);
        }
        if(file.user_id != null && file.user_id != "") {
            resource.addAttribute('user_id', file.user_id);
        }
        if(file.user_name != null && file.user_name != "") {
            resource.addAttribute('user_name', file.user_name);
        }

        return resource;
    }

    createPolicy(cookie:string):Promise<string> {

        let status:string = "";
        return new Promise((resolve, reject) => {

            status = "ok";

            resolve(status);
        }); 
    }
    
    enrolPolicies(url:string, user:string, password:string) {
        let cloudAzBaseUrl:string = url;
        let cloudAzUser:string = user;
        let cloudAzPassword:string = password;
        
        let cookie:CookieJar;

        log.debug("Start Login");
        this.initialiseLogin(cloudAzBaseUrl, cloudAzUser, cloudAzPassword).then((form:CloudAzLoginForm) => {
            
            cookie = form.cookie;
            cloudAzBaseUrl = form.base_url;

            //return this.enrolComponents(cloudAzBaseUrl, cookie);
            return this.enrolAllPolicies(cloudAzBaseUrl, cookie);
        }).then((result:String) => {
            log.debug("Result", result);
            log.debug("End Login");
        }).catch((err:any) =>{
            log.fatal("fail", err);
        });

    }

    enrolAllPolicies(baseUrl:string, cookie:CookieJar): Promise<String>  {

        log.debug("Enrol All Policies");

        let policyFile = __dirname + "/data/slack_default_policies.bin";
        log.debug("Policy File: ", policyFile);

        let query:ComponentQuery = new ComponentQuery();

        return new Promise((resolve, reject) => {

            let url = baseUrl + query.importUrl;

            var options = {
                method: 'POST',
                uri: url,
                formData: {
                    // Like <input type="file" name="file">
                    file: {
                        value: fs.createReadStream(policyFile),
                        options: {
                            filename: 'Slack_Default_Polices.bin',
                            contentType: 'application/octet-stream'
                        }
                    }
                },
                headers: {
                    'content-type': 'multipart/form-data',
                    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
                },
                insecure: true,
                rejectUnauthorized: false,
                resolveWithFullResponse: false,
                jar: cookie

            };
            
            requestPromise(options)
                .then(function (body) {
                    // POST succeeded...
                    log.debug("Body: ", body);

                    resolve("ok");
                })
                .catch(function (err) {
                    // POST failed...
                    log.debug("Error: ", err);

                    reject(err);

                });

        });
    }
    
    enrolComponents(baseUrl:string, cookie:CookieJar): Promise<ResponseData> {

        log.debug("Enrol Components");

        let query:ComponentQuery = new ComponentQuery();

        return new Promise((resolve, reject) => {

            let url = baseUrl + query.searchUrl;

            log.debug("Search URL: ", url);
            let resData:ResponseData = new ResponseData();

            this.post(url, cookie, query.searchForm).then((result) => {
                resData.status = ResponseData.STATUS_OK;
                resData.data = result;

                resolve(result);
            }).catch((err) => {
                log.fatal("FAIL: ", err);

                resData.status = ResponseData.STATUS_FAIL;
                resData.error = err;

                reject(resData);
            });
    
        });

    }

    enrolPolicyModel(baseUrl:string, cookie:CookieJar, data:any) {
        log.debug("Cookie: " + cookie);

        log.debug("Enrol Component");

        let query:PolicyModelQuery = new PolicyModelQuery();

        return new Promise((resolve, reject) => {

            let url = baseUrl + query.addModel;

            log.debug("Search URL: ", url);
            let resData:ResponseData = new ResponseData();

            this.post(url, cookie, data).then((result) => {
                resData.status = ResponseData.STATUS_OK;
                resData.data = result;

                resolve(result);
            }).catch((err) => {
                log.fatal("FAIL: ", err);

                resData.status = ResponseData.STATUS_FAIL;
                resData.error = err;

                reject(resData);
            });
    
        });



    }

    enrolUserModel(baseUrl:string, cookie:CookieJar) {
        this.enrolPolicyModel(baseUrl, cookie, slackUserModel);

    }

    enrolFileModel(baseUrl:string, cookie:CookieJar) {
        this.enrolPolicyModel(baseUrl, cookie, slackFileModel);

    }

    enrolChannelModel(baseUrl:string, cookie:CookieJar) {
        this.enrolPolicyModel(baseUrl, cookie, slackChannelModel);

    }

    enrolWorkspaceModel(baseUrl:string, cookie:CookieJar) {
        this.enrolPolicyModel(baseUrl, cookie, slackWorkspaceModel);

    }

    enrolAllPolicyModel(baseUrl:string, cookie:CookieJar) {
        this.enrolUserModel(baseUrl, cookie);
        this.enrolWorkspaceModel(baseUrl, cookie);
        this.enrolChannelModel(baseUrl, cookie);
        this.enrolFileModel(baseUrl, cookie);

    }


}

export const cloudAzService = new CloudAzService();