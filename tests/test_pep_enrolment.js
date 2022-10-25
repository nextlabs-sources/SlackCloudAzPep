'use strict';

const config = require('../config/slack_cloudaz-prod.json');

const http = require('http');
const axios = require('axios');
const fs = require('fs');
const qs = require('querystring');

const enrolCloudAz = function() {

    console.log("Authorize with CloudAz");

	// Create subject
	let user = new Subject('Slack User');
	//user.addAttribute('username', 'aa');
	user.addAttribute('tz', 'aa');
	user.addAttribute('cloudaz', 'yes');
	//user.addAttribute('real_name', 'aa');
	//user.addAttribute('email', 'aa');
	//user.addAttribute('username', 'aa');
	//user.addAttribute('exchange', 'aa');
	//user.addAttribute('msstudent', 'aa');
	//user.addAttribute('phdstudent', 'aa');
	//user.addAttribute('id', 'aa');
	//user.addAttribute('deadline', 'aa');
	//user.addAttribute('dept', 'King');

    console.log("User: ", user);

	// Create resource
	let resource = new Resource('Slack Channel');
	resource.setResourceType('slack_channel');
	resource.addAttribute('tz', "aa");
	resource.addAttribute('cloudaz', "yes");
	//resource.addAttribute('name', 'aa');
	//resource.addAttribute('id', 'aa' );
	//resource.addAttribute('type', 'aa');
    console.log("Resource: ", resource);

	// Create action
	let action = new Action('JNCL');
    //console.log("Action: ", action);

    console.log("Check decision");

    //Create application
    let agent = new NextLabsPEPAgent(getNextlabsConfig());
    //let application = new Application("nxl-pep-slack-client");
    let application = new Application("CloudAz for Slack App");

    agent.decide(user, resource, action, application).then(function(result) {


        console.log("Result: ", result);

        /*
        let decision = result.getWrappedResult().Decision;
            console.log("Decision: ", decision);
        if(decision !== 'Permit') {
            console.log("Not Allowed");
        } else {
            console.log("Allowed");
        }
        */

    }).catch(function(error){
        console.log("Fatal: ", error);
    });

}

const getNextlabsConfig = function() {
    return config;
}


enrolCloudAz();