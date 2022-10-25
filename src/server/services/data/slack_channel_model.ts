export let slackChannelModel = 
{
    id: null,
    name: 'Slack Channel',
    shortName: 'slack_channel',
    description: "A channel resources with attributes from Slack's channel object",
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
        name: 'name',
        shortName: 'name',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 0
      },
      {
        id: null,
        name: 'id',
        shortName: 'id',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 1
      },
      {
        id: null,
        name: 'timezone',
        shortName: 'tz',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 2
      },
      {
        id: null,
        name: 'is_private',
        shortName: 'private',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 3
      },
      {
        id: null,
        name: 'creator',
        shortName: 'creator',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 4
      },
      {
        id: null,
        name: 'is_shared',
        shortName: 'shared',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 5
      },
      {
        id: null,
        name: 'team id',
        shortName: 'team_id',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 6
      },
      {
        id: null,
        name: 'slack',
        shortName: 'slack',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 7
      },
      {
        id: null,
        name: 'topic',
        shortName: 'topic',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 8
      },
      {
        id: null,
        name: 'purpose',
        shortName: 'purpose',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 9
      },
      {
        id: null,
        name: 'is_org_shared',
        shortName: 'is_org_shared',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 10
      },
      {
        id: null,
        name: 'team_name',
        shortName: 'team_name',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 11
      }
    ],
    actions: [
      {
        id: null,
        name: 'Join Channel',
        shortName: 'JNCL',
        sortOrder: 0
      },
      {
        id: null,
        name: 'Use Emoji as Reaction',
        shortName: 'EMOJI',
        sortOrder: 1
      }
    ],
    obligations: [
      {
        id: null,
        name: 'Deny Message',
        shortName: 'deny_message',
        runAt: 'PEP',
        parameters: [Array],
        sortOrder: 0
      }
    ],
    version: 0
  };  
