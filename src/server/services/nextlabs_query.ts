
export class PolicyQuery {
    
}

export class PolicyModelQuery {
  addModel:String = "/console/api/v1/policyModel/mgmt/add";
  // response: {"statusCode":"1000","message":"Data saved successfully","data":12053}
  
  addTag:String = "/console/api/v1/config/tags/add/POLICY_MODEL_TAG";
  // response: {"statusCode":"1000","message":"Data saved successfully","data":12051}
  
  dataType:String = "/console/api/v1/config/dataType/list";
  // response: {"statusCode":"1003","message":"Data found successfully","data":[{"id":221,"key":"=","label":"=","dataType":"MULTIVAL"},{"id":222,"key":"!=","label":"!=","dataType":"MULTIVAL"},{"id":220,"key":"equals_unordered","label":"exactly matches","dataType":"MULTIVAL"},{"id":219,"key":"includes","label":"includes","dataType":"MULTIVAL"}],"pageNo":0,"pageSize":4,"totalPages":1,"totalNoOfRecords":4}


}

export class ComponentQuery {

    importUrl:String = "/console/api/v1/policy/mgmt/import";
    
    searchUrl:String = "/console/api/v1/policyModel/search";

    searchForm:any = {
        criteria:{
            fields:[
                {
                    field:"type",
                    type:"MULTI",
                    value: {
                        type:"String",
                        value:[
                            "RESOURCE",
                            "SUBJECT"
                        ]
                    }
                },
                {
                    field:"text",
                    type:"TEXT",
                    value:{
                        type:"Text",
                        fields:[
                            "name",
                            "description"
                        ],
                        value:"User"
                    }
                }
            ],
            sortFields:[
                {
                    field:"type",
                    order:"DESC"
                },
                {
                    field:"lastUpdatedDate",
                    order:"DESC"
                }
            ],
            pageNo:0,
            pageSize:20
        }
    }

    /*
    search response: {"statusCode":"1004","message":"Data loaded successfully","data":[{"id":182,"name":"User","shortName":"user","description":"A user subject with attributes from Slack's User object","type":"SUBJECT","status":"ACTIVE","lastUpdatedDate":1573630845280,"createdDate":0,"ownerId":0,"ownerDisplayName":null,"modifiedById":0,"modifiedBy":null,"tags":[{"id":1526,"key":"slack_app","label":"Slack App","type":"POLICY_MODEL_TAG","status":"ACTIVE"}],"attributes":[],"actions":[],"obligations":[],"authorities":[{"authority":"VIEW_POLICY_MODEL"},{"authority":"EDIT_POLICY_MODEL"},{"authority":"DELETE_POLICY_MODEL"},{"authority":"DEPLOY_POLICY_MODEL"}],"version":39},{"id":184,"name":"Application","shortName":"application","description":"A computer program whose attributes may be referenced in a component","type":"SUBJECT","status":"ACTIVE","lastUpdatedDate":1573432433518,"createdDate":0,"ownerId":0,"ownerDisplayName":null,"modifiedById":0,"modifiedBy":null,"tags":[],"attributes":[],"actions":[],"obligations":[],"authorities":[{"authority":"VIEW_POLICY_MODEL"},{"authority":"EDIT_POLICY_MODEL"},{"authority":"DELETE_POLICY_MODEL"},{"authority":"DEPLOY_POLICY_MODEL"}],"version":3},{"id":183,"name":"Host","shortName":"host","description":"A computer whose attributes may be referenced in a component","type":"SUBJECT","status":"ACTIVE","lastUpdatedDate":1551777544716,"createdDate":0,"ownerId":0,"ownerDisplayName":null,"modifiedById":0,"modifiedBy":null,"tags":[],"attributes":[],"actions":[],"obligations":[],"authorities":[{"authority":"VIEW_POLICY_MODEL"},{"authority":"EDIT_POLICY_MODEL"},{"authority":"DELETE_POLICY_MODEL"},{"authority":"DEPLOY_POLICY_MODEL"}],"version":1},{"id":9440,"name":"Slack File","shortName":"slack_file","description":"File in Slack","type":"RESOURCE","status":"ACTIVE","lastUpdatedDate":1573630576678,"createdDate":0,"ownerId":0,"ownerDisplayName":null,"modifiedById":0,"modifiedBy":null,"tags":[{"id":1526,"key":"slack_app","label":"Slack App","type":"POLICY_MODEL_TAG","status":"ACTIVE"}],"attributes":[],"actions":[],"obligations":[],"authorities":[{"authority":"VIEW_POLICY_MODEL"},{"authority":"EDIT_POLICY_MODEL"},{"authority":"DELETE_POLICY_MODEL"},{"authority":"DEPLOY_POLICY_MODEL"}],"version":1},{"id":9421,"name":"Slack Channel","shortName":"slack_channel","description":"A channel resources with attributes from Slack's channel object","type":"RESOURCE","status":"ACTIVE","lastUpdatedDate":1573629823819,"createdDate":0,"ownerId":0,"ownerDisplayName":null,"modifiedById":0,"modifiedBy":null,"tags":[{"id":1526,"key":"slack_app","label":"Slack App","type":"POLICY_MODEL_TAG","status":"ACTIVE"}],"attributes":[],"actions":[],"obligations":[],"authorities":[{"authority":"VIEW_POLICY_MODEL"},{"authority":"EDIT_POLICY_MODEL"},{"authority":"DELETE_POLICY_MODEL"},{"authority":"DEPLOY_POLICY_MODEL"}],"version":0},{"id":5845,"name":"Slack Workspace","shortName":"slack_workspace","description":"Slack Workspace","type":"RESOURCE","status":"ACTIVE","lastUpdatedDate":1573538244464,"createdDate":0,"ownerId":0,"ownerDisplayName":null,"modifiedById":0,"modifiedBy":null,"tags":[{"id":1526,"key":"slack_app","label":"Slack App","type":"POLICY_MODEL_TAG","status":"ACTIVE"}],"attributes":[],"actions":[],"obligations":[],"authorities":[{"authority":"VIEW_POLICY_MODEL"},{"authority":"EDIT_POLICY_MODEL"},{"authority":"DELETE_POLICY_MODEL"},{"authority":"DEPLOY_POLICY_MODEL"}],"version":12},{"id":5864,"name":"Slack Conversation","shortName":"slack_conversation","description":"Slack Conversation","type":"RESOURCE","status":"ACTIVE","lastUpdatedDate":1573434056677,"createdDate":0,"ownerId":0,"ownerDisplayName":null,"modifiedById":0,"modifiedBy":null,"tags":[{"id":1526,"key":"slack_app","label":"Slack App","type":"POLICY_MODEL_TAG","status":"ACTIVE"}],"attributes":[],"actions":[],"obligations":[],"authorities":[{"authority":"VIEW_POLICY_MODEL"},{"authority":"EDIT_POLICY_MODEL"},{"authority":"DELETE_POLICY_MODEL"},{"authority":"DEPLOY_POLICY_MODEL"}],"version":4}],"pageNo":0,"pageSize":20,"totalPages":1,"totalNoOfRecords":7}
    */

    modifyUrl = "/console/api/v1/policyModel/mgmt/modify";

    userForm = {
        id: 182,
        name: 'User',
        shortName: 'user',
        description: "A user subject with attributes from Slack's User object",
        type: 'RESOURCE',
        status: 'ACTIVE',
        tags: [
          {
            id: 1526,
            key: 'slack_app',
            label: 'Slack App',
            type: 'POLICY_MODEL_TAG',
            status: 'ACTIVE'
          }
        ],
        attributes: [
          {
            id: null,
            name: 'email',
            shortName: 'email',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 0
          },
          {
            id: null,
            name: 'is_admin',
            shortName: 'admin',
            dataType: 'STRING',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 1
          },
          {
            id: null,
            name: 'is_private',
            shortName: 'private',
            dataType: 'STRING',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 2
          },
          {
            id: null,
            name: 'is_owner',
            shortName: 'owner',
            dataType: 'STRING',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 3
          },
          {
            id: null,
            name: 'is_bot',
            shortName: 'bot',
            dataType: 'STRING',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 4
          },
          {
            id: null,
            name: 'phone',
            shortName: 'phone',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 5
          },
          {
            id: null,
            name: 'slack',
            shortName: 'slack',
            dataType: 'STRING',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 6
          },
          {
            id: null,
            name: 'user_id',
            shortName: 'user_id',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 7
          },
          {
            id: null,
            name: 'skype',
            shortName: 'skype',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 8
          },
          {
            id: null,
            name: 'timezone',
            shortName: 'tz',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 9
          },
          {
            id: null,
            name: 'real name',
            shortName: 'real_name',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 10
          },
          {
            id: null,
            name: 'username',
            shortName: 'username',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 11
          },
          {
            id: null,
            name: 'id',
            shortName: 'id',
            dataType: 'STRING',
            operatorConfigs: [Array],
            regExPattern: null,
            sortOrder: 12
          },
          {
            id: null,
            name: 'name',
            shortName: 'name',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 13
          },
          {
            id: null,
            name: 'display name',
            shortName: 'display_name',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 14
          },
          {
            id: null,
            name: 'team Id',
            shortName: 'team_id',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 15
          },
          {
            id: null,
            name: 'usergroup',
            shortName: 'usergroup',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 16
          },
          {
            id: null,
            name: 'deleted',
            shortName: 'deleted',
            dataType: 'STRING',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 17
          },
          {
            id: null,
            name: 'natinonality',
            shortName: 'nat',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 18
          },
          {
            id: null,
            name: 'team name',
            shortName: 'team_name',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 19
          },
          {
            id: null,
            name: 'status_text',
            shortName: 'status_text',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 20
          }, 
          {
            id: null,
            name: 'status_emoji',
            shortName: 'status_emoji',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 21
          },
          {
            id: null,
            name: 'title',
            shortName: 'title',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 22
          },
          {
            id: null,
            name: 'cost center',
            shortName: 'cost_center',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 23
          },
          {
            id: null,
            name: 'department',
            shortName: 'dept',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 24
          },
          {
            id: null,
            name: 'division',
            shortName: 'division',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 25
          },
          {
            id: null,
            name: 'country',
            shortName: 'country',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 26
          },
          {
            id: null,
            name: 'employee Id',
            shortName: 'emp_id',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 27
          },
          {
            id: null,
            name: 'manager',
            shortName: 'manager',
            dataType: 'MULTIVAL',
            operatorConfigs: [Array],
            regExPattern: '',
            sortOrder: 28
          }
        ],
        actions: [],
        obligations: [],
        version: 39
      };
          
}

