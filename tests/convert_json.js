
let channelMod = require('./data/slack_channel_model_raw');
let fileMod = require('./data/slack_file_model_raw');
let userMod = require('./data/slack_user_model_raw');
let workspaceMod = require('./data/slack_workspace_model_raw');

//let data = JSON.parse(workspaceMod.slackWorkspaceModelRaw);
//let data = JSON.parse(userMod.slackUserModelRaw);
//let data = JSON.parse(fileMod.slackFileModelRaw);
let data = JSON.parse(channelMod.slackChannelModelRaw);

console.log(data);

//console.log("Hello World");
