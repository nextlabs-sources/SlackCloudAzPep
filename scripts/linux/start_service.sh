echo "Start EM for Slack Service"
NODEJS_PATH="/usr/bin"
SLACK_BOT_PATH="/opt/nextlabs/slack"

cd $SLACK_BOT_PATH
echo "SLACK_BOT_PATH=${SLACK_BOT_PATH}"
${NODEJS_PATH}/node ./main.js > ./logs/slack_cloudaz_bot.log 2>&1 &

