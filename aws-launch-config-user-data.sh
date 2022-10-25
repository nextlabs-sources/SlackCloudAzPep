#!/bin/bash
# Yum update and installing aws logs is part of launch-config text box
# install nodejs using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

. ~/.nvm/nvm.sh
nvm install 10.15.1

sudo ln -sv  /root/.nvm/versions/node/v10.15.1/bin/node /usr/bin/node

# create installation directory
sudo mkdir -p /opt/nextlabs/slack

# copy unzipped application (part of user data) from below localtion to app path
sudo cp -a /tmp/dist/* /opt/nextlabs/slack

# Create logs folder
sudo mkdir -p /opt/nextlabs/slack/logs
sudo touch /opt/nextlabs/slack/logs/slack_cloudaz_bot.log

cd /opt/nextlabs/slack

sudo chmod +x start_service.sh
sudo sh start_service.sh


# configure and start aws log agent

sudo rm -rf /etc/awslogs/awslogs.conf 

sudo cat > /etc/awslogs/awslogs.conf <<EOF
[/opt/nextlabs/slack/logs]
datetime_format = %Y-%m-%dT%H:%M:%S
file = /opt/nextlabs/slack/logs/slack_cloudaz_bot.log
buffer_duration = 5000
log_stream_name = {instance_id}
initial_position = start_of_file
log_group_name = slack-pep-log-group
EOF


sudo systemctl start awslogsd

# Delete the downloaded artifact
sudo rm -rf /tmp/latest.tar 