import { CookieJar } from "request";
import request = require("request");
import requestPromise = require("request-promise");

export class SlackSettings {
    team_id: string = "";
    enterprise_id: string = "";
    enterprise_name: string = "";
    team_name: string = "";
    access_token: string = "";
    bot_access_token: string = "";
    bot_user_id: string = "";
    webhook_channel_id: string = "";
    webhook_url: string = "";
    created_id: string = "";
    user_custom_fields:string = "";
    channel_custom_fields:string = "";
    cloudaz_hostname:string = "";
    cloudaz_username:string = "";
    cloudaz_password:string = "";
    created_date: string = new Date().toLocaleString();
    authed_user_id: string = "";
    authed_user_token: string = "";  

    constructor() {

    }

    fromFirebase(data:any) {
        if(data == null) {
            return;
        }

        if(data.hasOwnProperty("team_id")) {
            this.team_id = data['team_id'];
        }
        if(data.hasOwnProperty("team_name")) {
            this.team_name = data['team_name'];
        }
        if(data.hasOwnProperty("enterprise_id")) {
            this.enterprise_id = data['enterprise_id'];
        }
        if(data.hasOwnProperty("enterprise_name")) {
            this.enterprise_id = data['enterprise_name'];
        }
        if(data.hasOwnProperty("access_token")) {
            this.access_token = data['access_token'];
        }
        if(data.hasOwnProperty("webhook_channel_id")) {
            this.webhook_channel_id = data['webhook_channel_id']
        }
        if(data.hasOwnProperty("webhook_url")) {
            this.webhook_url = data['webhook_url']
        }
        if(data.hasOwnProperty("bot_access_token")) {
            this.bot_access_token = data['bot_access_token'];
        }
        if(data.hasOwnProperty("bot_user_id")) {
            this.bot_user_id = data['bot_user_id'];
        }
        if(data.hasOwnProperty("user_id")) {
            this.created_id = data['user_id'];
        }
        if(data.hasOwnProperty("authed_user_id")) {
            this.authed_user_id = data['authed_user_id'];
        }
        if(data.hasOwnProperty("authed_user_token")) {
            this.authed_user_token = data['authed_user_token'];
        }

        if(data.hasOwnProperty("cloudaz")) {

            if(data.cloudaz.hasOwnProperty("hostname")) {
                this.cloudaz_hostname = data['cloudaz']['hostname'];
            }
            if(data.cloudaz.hasOwnProperty("username")) {
                this.cloudaz_username = data['cloudaz']['username'];
            }
            if(data.cloudaz.hasOwnProperty("password")) {
                this.cloudaz_password = data['cloudaz']['password'];
            }
        }

     }

    // Map to JSON data from Slack OAuth response
    fromJSON(data:any) {
        if(data == null) {
            return;
        }

        if(data.hasOwnProperty("team_id")) {
            this.team_id = data['team_id'];
        }
        if(data.hasOwnProperty("team_name")) {
            this.team_name = data['team_name'];
        }
        if(data.hasOwnProperty("enterprise_id")) {
            this.enterprise_id = data['enterprise_id'];
        }
        if(data.hasOwnProperty("access_token")) {
            this.access_token = data['access_token'];
        }
        if(data.hasOwnProperty("incoming_webhook")) {
            if(data['incoming_webhook'].hasOwnProperty("channel_id")) {
                this.webhook_channel_id = data['incoming_webhook']['channel_id']
            }
            if(data['incoming_webhook'].hasOwnProperty("url")) {
                this.webhook_url = data['incoming_webhook']['url']
            }
        }
        if(data.hasOwnProperty("bot")) {
            if(data['bot'].hasOwnProperty("access_token")) {
                this.bot_access_token = data['bot']['bot_access_token'];
            }
            if(data['bot'].hasOwnProperty("user_id")) {
                this.bot_user_id = data['bot']['bot_user_id'];
            }
        }
        if(data.hasOwnProperty("user_id")) {
            this.created_id = data['user_id'];
        }

    }

}

export class SlackRule {

    channel_fields:string = "";
    user_fields:string = "";
    channels:string = "";
    workspaces:string = "";
    default_join_channel:string = "";
    default_upload_file:string = "";
    default_share_file:string = "";
    default_use_emoji:string = "";
    default_join_workspace:string = "";
    updated_date:string = "";

    constructor() {

    }

    // Map to JSON data from Slack Rule response
    fromJSON(data:any) {
        if(data == null) {
            return;
        }

        this.channel_fields = data['channel_fields'];
        this.user_fields = data['user_fields'];
        this.channels = data['channels'];
        this.workspaces = data['workspaces'];
        this.default_join_channel = data['default_join_channel'];
        this.default_upload_file = data['default_upload_file'];
        this.default_share_file = data['default_share_file'];
        this.default_use_emoji = data['default_use_emoji'];
        this.default_join_workspace = data['default_join_workspace'];
        this.updated_date = data['updated_date'];
    }
}

export class SlackFreeRule {

    channel:string = "";
    upload_file:string = "";
    use_emoji:string = "";
    timezone: string = "";
    updated_date: "" = "";

    constructor() {

    }

    // Map to JSON data from Free Rule response
    fromJSON(data:any) {
        if(data == null) {
            return;
        }
        this.channel = data['channel'];
        this.upload_file = data['upload_file'];
        this.use_emoji = data['use_emoji'];
        this.timezone = data['tz'];
        this.updated_date = data['updated_date'];
    }
}

export class SlackAppEvent {

    app_id:string = "";
    team_id:string = "";
    user_id:string = "";
    user_name:string = "";
    user_email:string = "";
    scopes:Array<string> = [];

    constructor() {

    }

    fromJSON(req:any) {
        if(req == null) {
            return;
        }

        this.app_id = req.app_request.app.id;
        this.team_id = req.app_request.team.id;
        this.user_id = req.app_request.user.id;
        this.user_name = req.app_request.user.name;
        this.user_email = req.app_request.user.email;
 
        req.app_request.scopes.forEach((element: any) => {
            this.scopes.push(
                element.name
            )
        });
    }
}

export class SlackUser {
    user_id:string = "";
    user_name:string = "";
    team_id:string = "";
    team_name:string = "";
    real_name:string = "";
    title:string = "";
    phone:string = "";
    skype:string = "";
    email:string = "";
    timezone:string = "";
    status_text: string = "";
    status_emoji:string = "";
    is_admin:string = "";
    is_owner:string = "";
    is_stranger:string = "";
    is_primary_owner:string = "";
    is_bot:string = "";
    is_app_user:string = "";
    deleted:string = "";
    workspace_id:string = "";
    workspace_name:string = "";
    enterprise_id:string = "";
    enterprise_name:string = "";

    constructor() {

    }

    // Map to JSON data from Web API
    fromJSON(data:any) {
        if(data == null) {
            return;
        }

        this.user_id = data['id'];
        this.user_name = data['name'];
        this.team_id = data['team_id'];
        this.team_name = ""; // To be filled later
        this.real_name = data['profile']['real_name'];
        this.title = data['profile']['title'];
        this.phone = data['profile']['phone'];
        this.skype = data['profile']['skype'];
        this.email = data['profile']['email'];
        this.status_text = data['profile']['status_test'];
        this.status_emoji = data['profile']['status_emoji'];
        this.timezone = data['tz'];
        this.is_admin = data['is_admin'] ? 'yes': 'no';;
        this.is_owner = data['is_owner'] ? 'yes': 'no';
        this.is_stranger = data['is_stranger'] ? 'yes': 'no';
        this.is_primary_owner = data['is_primary_owner'] ? 'yes': 'no';
        this.is_bot = data['is_bot'] ? 'yes': 'no';
        this.is_app_user = data['is_app_user'] ? 'yes': 'no';
        this.deleted = data['deleted'];

    }

}

export class SlackChannel {
    channel_id:string = "";
    channel_name:string = "";
    enterprise_id:string = "";
    enterprise_name:string = "";
    team_id:string = "";
    team_name:string = "";
    creator:string = "";
    topic:string = "";
    purpose:string = "";
    timezone:string = "";
    is_private:string = "";
    is_shared:string = "";
    is_org_shared:string = "";
    is_member:string = "";
    is_general:string = "";
    is_mpim:string = "";
    is_channel:string = "";

    constructor() {

    }

    // Map to JSON data from Web API
    fromJSON(data:any) {
        if(data == null) {
            return;
        }

        this.channel_id = data['id'];
        this.channel_name = data['name'];
        this.creator = data['creator'];
        this.topic = data['topic']['value'];
        this.purpose = data['purpose']['value'];
        this.is_private = data['is_private'] ? 'yes': 'no';
        this.is_shared = data['is_shared'] ? 'yes': 'no';
        this.is_org_shared = data['is_org_shared'] ? 'yes': 'no';
        this.is_member = data['is_member'] ? 'yes': 'no';
        this.is_general = data['is_general'] ? 'yes': 'no';
        this.is_mpim = data['is_mpim'] ? 'yes': 'no';
        this.is_channel = data['is_channel'] ? 'yes': 'no';

    }
}

export class SlackWorkspace {
    team_id:string = "";
    team_name:string = "";
    enterprise_id:string = "";
    enterprise_name:string = "";
    domain:string = "";
    email_domain:string = "";

    constructor() {

    }

    // Map to JSON data from Web API
    fromJSON(data:any) {
        if(data == null) {
            return;
        }

        this.team_id = data['id'];
        this.team_name = data['name'];
        this.enterprise_id = data['enterprise_id'];
        this.enterprise_name = data['enterprise_name'];
        this.domain = data['domain'];
        this.email_domain = data['email_domain'];

    }

}

export class SlackFile {
    file_id:string = "";
    file_name:string = "";
    file_title:string = "";
    file_type:string = "";
    file_mode:string = "";
    mime_type:string = "";
    file_size:string = "";
    editable:string = "";
    is_external:string = "";
    is_public:string = "";
    public_url_shared:string = "";
    user_id:string = "";
    user_name:string = "";
    channel_id:string = "";
    channel_name:string = "";
    team_id:string = "";
    team_name:string = "";
    enterprise_id:string = "";
    enterprise_name:string = "";

    constructor() {

    }

    // Map to JSON data from Web API
    fromJSON(data:any) {
        if(data == null) {
            return;
        }

        this.file_id = data['id'];
        this.file_name = data['name'];
        this.file_title = data['title'];
        this.file_type = data['filetype'];
        this.mime_type = data['mime_type'];
        this.file_size = "" + data['size'];
        this.file_mode = data['mode'];
        this.public_url_shared = data['public_url_shared'] ? "yes" : "no";
        this.editable = data['editable'] ? "yes" : "no";
        this.is_external = data['is_external'] ? "yes" : "no";
        this.is_public = data['is_public'] ? "yes" : "no";

    }    
}

export class SlackFileShared {
    token:string = "";
    team_id:string = "";
    api_app_id:string = "";
    event_type:string = "";
    channel_id:string = "";
    file_id:string = "";
    user_id:string = "";
    event_id:string = "";
    event_ts:string = "";
    event_time:number = 0;
    _type:string = "";

    fromJSON(data:any) {
        if(data == null) {
            return;
        }

        if(data.hasOwnProperty("token")) {
            this.token = data['token'];
        }
        if(data.hasOwnProperty("team_id")) {
            this.team_id = data['team_id'];
        }
        if(data.hasOwnProperty("api_app_id")) {
            this.api_app_id = data['api_app_id'];
        }
        if(data.hasOwnProperty('event')) {
            if(data['event'].hasOwnProperty('type')) {
                this.event_type = data['event']['type'];
            }
            if(data['event'].hasOwnProperty('channel_id')) {
                this.channel_id = data['event']['channel_id'];
            }
            if(data['event'].hasOwnProperty('file_id')) {
                this.file_id = data['event']['file_id'];
            }
            if(data['event'].hasOwnProperty('user_id')) {
                this.user_id = data['event']['user_id'];
            }
            if(data['event'].hasOwnProperty('event_ts')) {
                this.event_ts = data['event']['event_ts'];
            }
        }
        if(data.hasOwnProperty("event_time")) {
            this.event_time = data['event_time'];
        }
        if(data.hasOwnProperty("type")) {
            this._type = data['type'];
        }

    }
    

}

export class CloudAzLoginForm {
    redirect_url:string = "";
    action_url:string = "";
    base_url:string = "";
    username:string = "";
    password:string = "";
    eventId:string = "submit";
    submit:string = "Login"; 
    lt:string = "";
    execution:string = "";
    location:string = "";
    cookie:CookieJar = requestPromise.jar();
}

export class SlackCommand {
    token:string = "";
    team_id:string = "";
    team_domain:string = "";
    channel_id:string = "";
    channel_name:string = "";
    user_id:string = "";
    user_name:string = "";
    command:string = "";
    text:string = "";
    response_url:string = "";
    trigger_id:string = "";

    // Map to JSON data from Web API
    fromJSON(data:any) {
        if(data == null) {
            return;
        }

        this.token = data['token'];
        this.team_id = data['team_id'];
        this.team_domain = data['team_domain'];
        this.channel_id = data['channel_id'];
        this.channel_name = data['channel_name'];
        this.user_id = data['user_id'];
        this.user_name = data['user_name'];
        this.command = data['command'];
        this.text = data['text'];
        this.response_url = data['response_url'];
        this.trigger_id = data['trigger_id'];

    }
 
}

export class ResponseData {
    public static readonly STATUS_OK = "ok";
    public static readonly STATUS_FAIL = "fail";

    status:string = "ok";
    data:any;
    error:any;
}