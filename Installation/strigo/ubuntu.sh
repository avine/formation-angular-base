#!/bin/bash

# to check the logs for this installation
# cat /var/log/cloud-init-output.log

# installation de google chrome pour karma/protractor
sudo sh -c 'echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo apt-get update

sudo apt-get install -y google-chrome-stable

# augmente le nombre de watchers disponibles
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Configure and launch code-server
curl -fsSLo /tmp/code-server.deb https://github.com/cdr/code-server/releases/download/v3.7.1/code-server_3.7.1_amd64.deb
apt-get install -y /tmp/code-server.deb
mkdir --parent /home/ubuntu/.config/code-server/
cat <<EOF > /home/ubuntu/.config/code-server/config.yaml
bind-addr: {{ .STRIGO_RESOURCE_0_DNS }}:9999
auth: password
password: '{{ .STRIGO_WORKSPACE_ID }}'
disable-telemetry: true
EOF
chown -R ubuntu: /home/ubuntu/.config/
systemctl enable --now code-server@ubuntu

code-server --install-extension ms-vscode.vscode-typescript-tslint-plugin
code-server --install-extension eg2.vscode-npm-script
code-server --install-extension coenraads.bracket-pair-colorizer-2

# Insert script into init file
touch /home/ubuntu/nvm_init.sh
cat <<EOF >/home/ubuntu/nvm_init.sh
#!/bin/bash

# NVM installation
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
[ -s "/home/ubuntu/.nvm/nvm.sh" ] && \. "/home/ubuntu/.nvm/nvm.sh"  # This loads nvm
[ -s "/home/ubuntu/.nvm/bash_completion" ] && \. "/home/ubuntu/.nvm/bash_completion"  # This loads nvm bash_completion

# Install latest node lts
nvm install --lts

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
EOF

sudo chown ubuntu:ubuntu /home/ubuntu/nvm_init.sh
sudo chmod u+x /home/ubuntu/nvm_init.sh

# Execute script as ubuntu
su ubuntu -c "/home/ubuntu/nvm_init.sh"

# Add Strigo context in env
cat <<\EOF > /etc/profile.d/00_strigo_context.sh
# Strigo context
export INSTANCE_NAME={{ .STRIGO_RESOURCE_NAME }}
export PUBLIC_DNS={{ .STRIGO_RESOURCE_0_DNS }}
export PUBLIC_IP=$(curl --silent ifconfig.co)
export PRIVATE_DNS={{ .STRIGO_RESOURCE_0_DNS }}
export PRIVATE_IP=$(dig +short {{ .STRIGO_RESOURCE_0_DNS }})
export HOSTNAME={{ .STRIGO_RESOURCE_NAME }}
EOF

# Greetings message
cat << \EOF > /etc/profile.d/training_greetings.sh
echo "--------------------------------"
echo -ne "\n\nWelcome on the \033[1mZenika\033[0m Angular course"
echo -ne '\n\033[1mvs-code\033[0m\n'
echo "to use a remote vs-code, check the vs code tab or the url "
echo "http://${PUBLIC_DNS}:9999"
grep '^password:' ~/.config/code-server/config.yaml
echo "--------------------------------"
echo "my public IP: ${PUBLIC_IP}"
echo "my public DNS: ${PUBLIC_DNS}"
echo "-------enjoy the session--------"
echo " "
EOF
