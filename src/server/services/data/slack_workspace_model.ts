export let slackWorkspaceModel = {
    id: null,
    name: 'Slack Workspace',
    shortName: 'slack_workspace',
    description: 'Slack Workspace',
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
        name: 'domain',
        shortName: 'domain',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 0
      },
      {
        id: null,
        name: 'email_domain',
        shortName: 'email_domain',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 1
      },
      {
        id: null,
        name: 'enterprise_id',
        shortName: 'enterprise_id',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 2
      },
      {
        id: null,
        name: 'enterprise_name',
        shortName: 'enterprise_name',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 3
      },
      {
        id: null,
        name: 'slack',
        shortName: 'slack',
        dataType: 'STRING',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 4
      },
      {
        id: null,
        name: 'id',
        shortName: 'id',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 5
      },
      {
        id: null,
        name: 'name',
        shortName: 'name',
        dataType: 'MULTIVAL',
        operatorConfigs: [Array],
        regExPattern: '',
        sortOrder: 6
      }
    ],
    actions: [
      {
        id: null,
        name: 'Create Channel',
        shortName: 'CRCHN',
        sortOrder: 0
      },
      {
        id: null,
        name: 'Install Application',
        shortName: 'INSTAPP',
        sortOrder: 1
      },
      { id: 8968, name: 'Add user', shortName: 'ADDUSR', sortOrder: 2 }
    ],
    obligations: [],
    version: 0
  };
  