export let slackFileModel = 
{
    id: '',
    name: 'Slack File',
    shortName: 'slack_file',
    description: 'File in Slack',
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
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 0
      },
      {
        id: null,
        name: 'title',
        shortName: 'title',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 1
      },
      {
        id: null,
        name: 'file type',
        shortName: 'filetype',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 2
      },
      {
        id: null,
        name: 'editable',
        shortName: 'editable',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 3
      },
      {
        id: null,
        name: 'size',
        shortName: 'size',
        dataType: 'NUMBER',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 4
      },
      {
        id: null,
        name: 'is_external',
        shortName: 'is_external',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 5
      },
      {
        id: null,
        name: 'is_public',
        shortName: 'is_public',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 6
      },
      {
        id: null,
        name: 'public url shared',
        shortName: 'public_url_shared',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 7
      },
      {
        id: null,
        name: 'user id',
        shortName: 'user_id',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 8
      },
      {
        id: null,
        name: 'slack',
        shortName: 'slack',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 9
      },
      {
        id: null,
        name: 'channel id',
        shortName: 'channel_id',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 10
      },
      {
        id: null,
        name: 'channel name',
        shortName: 'channel_name',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 11
      },
      {
        id: null,
        name: 'team id',
        shortName: 'team_id',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 12
      },
      {
        id: null,
        name: 'team name',
        shortName: 'team_name',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 13
      },
      {
        id: null,
        name: 'enterprise id',
        shortName: 'enterprise_id',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 14
      },
      {
        id: null,
        name: 'enterprise name',
        shortName: 'enterprise_name',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 15
      },
      {
        id: null,
        name: 'mime type',
        shortName: 'mime_type',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 16
      }
    ],
    actions: [
      {
        id: null,
        name: 'Share File',
        shortName: 'SHRFILE',
        sortOrder: 0
      },
      {
        id: null,
        name: 'Upload File',
        shortName: 'UPFILE',
        sortOrder: 1
      }
    ],
    obligations: [],
    version: 1
  };
  
