export let slackUserModel = 
{
    id: null,
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
        name: 'nationality',
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
    version: 65
  };
  