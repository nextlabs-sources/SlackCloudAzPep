const fileModel = `{"id":"","name":"Slack File","shortName":"slack_file","description":"File in Slack","type":"RESOURCE","status":"ACTIVE","tags":[{"id":1526,"key":"slack_app","label":"Slack App","type":"POLICY_MODEL_TAG","status":"ACTIVE"}],"attributes":[{"id":null,"name":"name","shortName":"name","dataType":"STRING","operatorConfigs":[{"id":212,"key":"!=","label":"is not","dataType":"STRING"},{"id":211,"key":"=","label":"is","dataType":"STRING"}],"regExPattern":"","sortOrder":0},{"id":null,"name":"title","shortName":"title","dataType":"STRING","operatorConfigs":[{"id":212,"key":"!=","label":"is not","dataType":"STRING"},{"id":211,"key":"=","label":"is","dataType":"STRING"}],"regExPattern":"","sortOrder":1},{"id":null,"name":"file type","shortName":"filetype","dataType":"MULTIVAL","operatorConfigs":[{"id":219,"key":"includes","label":"includes","dataType":"MULTIVAL"},{"id":221,"key":"=","label":"=","dataType":"MULTIVAL"},{"id":220,"key":"equals_unordered","label":"exactly matches","dataType":"MULTIVAL"},{"id":222,"key":"!=","label":"!=","dataType":"MULTIVAL"}],"regExPattern":"","sortOrder":2},{"id":null,"name":"editable","shortName":"editable","dataType":"STRING","operatorConfigs":[{"id":212,"key":"!=","label":"is not","dataType":"STRING"},{"id":211,"key":"=","label":"is","dataType":"STRING"}],"regExPattern":"","sortOrder":3},{"id":null,"name":"size","shortName":"size","dataType":"NUMBER","operatorConfigs":[{"id":215,"key":"<","label":"<","dataType":"NUMBER"},{"id":217,"key":">","label":">","dataType":"NUMBER"},{"id":218,"key":">=","label":">=","dataType":"NUMBER"},{"id":214,"key":"!=","label":"!=","dataType":"NUMBER"},{"id":213,"key":"=","label":"=","dataType":"NUMBER"},{"id":216,"key":"<=","label":"<=","dataType":"NUMBER"}],"regExPattern":"","sortOrder":4},{"id":null,"name":"is_external","shortName":"is_external","dataType":"STRING","operatorConfigs":[{"id":212,"key":"!=","label":"is not","dataType":"STRING"},{"id":211,"key":"=","label":"is","dataType":"STRING"}],"regExPattern":"","sortOrder":5},{"id":null,"name":"is_public","shortName":"is_public","dataType":"STRING","operatorConfigs":[{"id":212,"key":"!=","label":"is not","dataType":"STRING"},{"id":211,"key":"=","label":"is","dataType":"STRING"}],"regExPattern":"","sortOrder":6},{"id":null,"name":"public url shared","shortName":"public_url_shared","dataType":"STRING","operatorConfigs":[{"id":212,"key":"!=","label":"is not","dataType":"STRING"},{"id":211,"key":"=","label":"is","dataType":"STRING"}],"regExPattern":"","sortOrder":7},{"id":null,"name":"user id","shortName":"user_id","dataType":"STRING","operatorConfigs":[{"id":212,"key":"!=","label":"is not","dataType":"STRING"},{"id":211,"key":"=","label":"is","dataType":"STRING"}],"regExPattern":"","sortOrder":8},{"id":null,"name":"slack","shortName":"slack","dataType":"STRING","operatorConfigs":[{"id":212,"key":"!=","label":"is not","dataType":"STRING"},{"id":211,"key":"=","label":"is","dataType":"STRING"}],"regExPattern":"","sortOrder":9},{"id":null,"name":"channel id","shortName":"channel_id","dataType":"MULTIVAL","operatorConfigs":[{"id":219,"key":"includes","label":"includes","dataType":"MULTIVAL"},{"id":221,"key":"=","label":"=","dataType":"MULTIVAL"},{"id":220,"key":"equals_unordered","label":"exactly matches","dataType":"MULTIVAL"},{"id":222,"key":"!=","label":"!=","dataType":"MULTIVAL"}],"regExPattern":"","sortOrder":10},{"id":null,"name":"channel name","shortName":"channel_name","dataType":"MULTIVAL","operatorConfigs":[{"id":219,"key":"includes","label":"includes","dataType":"MULTIVAL"},{"id":221,"key":"=","label":"=","dataType":"MULTIVAL"},{"id":220,"key":"equals_unordered","label":"exactly matches","dataType":"MULTIVAL"},{"id":222,"key":"!=","label":"!=","dataType":"MULTIVAL"}],"regExPattern":"","sortOrder":11},{"id":null,"name":"team id","shortName":"team_id","dataType":"MULTIVAL","operatorConfigs":[{"id":219,"key":"includes","label":"includes","dataType":"MULTIVAL"},{"id":221,"key":"=","label":"=","dataType":"MULTIVAL"},{"id":220,"key":"equals_unordered","label":"exactly matches","dataType":"MULTIVAL"},{"id":222,"key":"!=","label":"!=","dataType":"MULTIVAL"}],"regExPattern":"","sortOrder":12},{"id":null,"name":"team name","shortName":"team_name","dataType":"MULTIVAL","operatorConfigs":[{"id":219,"key":"includes","label":"includes","dataType":"MULTIVAL"},{"id":221,"key":"=","label":"=","dataType":"MULTIVAL"},{"id":220,"key":"equals_unordered","label":"exactly matches","dataType":"MULTIVAL"},{"id":222,"key":"!=","label":"!=","dataType":"MULTIVAL"}],"regExPattern":"","sortOrder":13},{"id":null,"name":"enterprise id","shortName":"enterprise_id","dataType":"MULTIVAL","operatorConfigs":[{"id":219,"key":"includes","label":"includes","dataType":"MULTIVAL"},{"id":221,"key":"=","label":"=","dataType":"MULTIVAL"},{"id":220,"key":"equals_unordered","label":"exactly matches","dataType":"MULTIVAL"},{"id":222,"key":"!=","label":"!=","dataType":"MULTIVAL"}],"regExPattern":"","sortOrder":14},{"id":null,"name":"enterprise name","shortName":"enterprise_name","dataType":"MULTIVAL","operatorConfigs":[{"id":219,"key":"includes","label":"includes","dataType":"MULTIVAL"},{"id":221,"key":"=","label":"=","dataType":"MULTIVAL"},{"id":220,"key":"equals_unordered","label":"exactly matches","dataType":"MULTIVAL"},{"id":222,"key":"!=","label":"!=","dataType":"MULTIVAL"}],"regExPattern":"","sortOrder":15},{"id":null,"name":"mime type","shortName":"mime_type","dataType":"MULTIVAL","operatorConfigs":[{"id":219,"key":"includes","label":"includes","dataType":"MULTIVAL"},{"id":221,"key":"=","label":"=","dataType":"MULTIVAL"},{"id":220,"key":"equals_unordered","label":"exactly matches","dataType":"MULTIVAL"},{"id":222,"key":"!=","label":"!=","dataType":"MULTIVAL"}],"regExPattern":"","sortOrder":16}],"actions":[{"id":11210,"name":"Share File","shortName":"SHRFILE","sortOrder":0},{"id":11209,"name":"Upload File","shortName":"UPFILE","sortOrder":1}],"obligations":[],"version":1}`;

exports.slackFileModelRaw = fileModel;