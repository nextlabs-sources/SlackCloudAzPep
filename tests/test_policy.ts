// Common configurations
import envConfig from '../src/server/config/slack_entitlement';

// Nextlabs API
const NextlabsOpenAz = require("nextlabs-openaz");
const NextLabsPEPAgent = NextlabsOpenAz.NextLabsPEPAgent;
const PEPResponse = NextlabsOpenAz.PEPResponse;
const Subject = NextlabsOpenAz.Subject;
const Resource = NextlabsOpenAz.Resource;
const Action = NextlabsOpenAz.Action;
const Application = NextlabsOpenAz.Application;
const Environment = NextlabsOpenAz.Environment;
const XACML3 = NextlabsOpenAz.XACML3;
const NextLabsXACML = NextlabsOpenAz.NextLabsXACML;
const Decision = NextlabsOpenAz.Decision;


class TestCloudAzService {

    constructor() {

    }

    authorizeChannelWithCloudAz() {

        console.log("Authorize with CloudAz");

        // Create subject
        let user = new Subject('Slack User');
        //user.addAttribute('username', 'aa');
        //user.addAttribute('tz', 'aa');
        user.addAttribute('slack', 'yes');
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
        let resource = new Resource('Slack File');
        resource.setResourceType('slack_file');
        resource.addAttribute('slack', "yes");
        resource.addAttribute('file_type', 'aaa');
        resource.addAttribute('channel_name', 'proj-mindef' );

        console.log("Resource: ", resource);

        // Create action
        //let action = new Action('JNCL');
        let action = new Action('UPFILE');
        
        console.log("Action: ", action);

        console.log("Check decision");

        //Create application
        let agent = new NextLabsPEPAgent(this.getNextlabsConfig());
        //let application = new Application("nxl-pep-slack-client");
        let application = new Application("EM4Slack");

        agent.decide(user, resource, action, application).then(function(result: any) {


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

        }).catch(function(error:any){
            console.log("Fatal: ", error);
        });

    }

    getNextlabsConfig() {

        return envConfig;
    }

}

let test = new TestCloudAzService();

test.authorizeChannelWithCloudAz();
