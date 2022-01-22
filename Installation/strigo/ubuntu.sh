#!/bin/bash

set -ev

apt remove -y unattended-upgrades

apt-get update

#####################
###### Training ressources
workspace_archive_file_id="1m2GypdxNoTMUCiP2y8aUN3Ta1xFPkDQl"
corrections_archive_file_id="1nFv9y9S_YaOQ-Cs4ewiwEhOFuZGx57cv"

# fetch from gdrive
# Archive must be in .tar.xz format

cd ~ubuntu
curl -fsSL "https://drive.google.com/uc?export=download&id=${workspace_archive_file_id}" | tar xJf -  # ressources
curl -fsSL "https://drive.google.com/uc?export=download&id=${corrections_archive_file_id}" | tar xJf -  # correction
chown -R ubuntu ressources corrections

# hide corrections

mv corrections .corrections

#####################
###### chrome.sh

# Set up the repository
echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

# Install Chrome
apt-get update
apt-get install -y google-chrome-stable


#####################
###### nvm.sh

# https://github.com/nvm-sh/nvm

# Define NVM_DIR before cf. install.sh nvm script
export NVM_DIR="/home/ubuntu/.nvm" && mkdir -p $NVM_DIR && chown ubuntu $NVM_DIR

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

# Append to ubuntu profile
echo 'export NVM_DIR="$HOME/.nvm"' >> /home/ubuntu/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> /home/ubuntu/.bashrc

# Dot source the files to ensure that variables are available within the current shell
. /home/ubuntu/.nvm/nvm.sh
. /home/ubuntu/.profile
. /home/ubuntu/.bashrc

# Install node lts
nvm install --lts

chown ubuntu:ubuntu -R /home/ubuntu/.nvm/

#####################
###### code-server.sh

# Define these 2 variables if you want to customize the default installation,
# then copy-paste the remainder of the script:
# - the version of code-server to install
# code_server_version=3.7.2
# - the code-server extensions to install (space-separated names)
code_server_extensions="ms-vscode.vscode-typescript-tslint-plugin eg2.vscode-npm-script coenraads.bracket-pair-colorizer-2"
# Note: install code-server after installing docker if you plan to use a docker extension
# - the JSON content of code-server settings (here, to make the terminal a JSON shell)
# (see https://code.visualstudio.com/docs/editor/integrated-terminal#_shell-arguments)
# code_server_settings='{ "terminal.integrated.shellArgs.linux": ["-l"]}'

# https://github.com/cdr/code-server/blob/master/doc/install.md#debian-ubuntu


# Install code-server
code_server_version=${code_server_version:-3.9.2}
curl -fsSLo /tmp/code-server.deb "https://github.com/cdr/code-server/releases/download/v${code_server_version}/code-server_${code_server_version}_amd64.deb"
apt-get install -y /tmp/code-server.deb

# Setup code-server
mkdir --parent /home/ubuntu/.config/code-server/
cat << EOF > /home/ubuntu/.config/code-server/config.yaml
bind-addr: {{ .STRIGO_RESOURCE_DNS }}:9999
auth: password
password: '{{ .STRIGO_WORKSPACE_ID }}'
disable-telemetry: true
EOF
chown -R ubuntu: /home/ubuntu/.config/

# Enable and start code-server
systemctl enable --now code-server@ubuntu

# Install extensions, if any
if [[ ${code_server_extensions} && ${code_server_extensions-_} ]]; then
  code_server_extensions_array=($code_server_extensions)
  for code_server_extension in ${code_server_extensions_array[@]}; do
    sudo -iu ubuntu code-server code-server --install-extension ${code_server_extension}
  done
fi

# Adds user settings, if any
if [[ ${code_server_settings} && ${code_server_settings-_} ]]; then
  echo ${code_server_settings} > /home/ubuntu/.local/share/code-server/User/settings.json
  chown ubuntu:ubuntu /home/ubuntu/.local/share/code-server/User/settings.json
fi

###############################
#### increase-watchers-limit.sh
# Increase filesystem watches for `autoreload` (https://www.npmjs.com/package/autoreload#troubleshooting)
echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf
sysctl -p


################
###### strigo.sh

# Force hostname
hostnamectl set-hostname {{ .STRIGO_RESOURCE_NAME }}
sed --in-place "0,/^127.0.0.1/s/$/ {{ .STRIGO_RESOURCE_NAME }}/" /etc/hosts

# Inject Strigo context
cat <<\EOF > /etc/profile.d/00_strigo_context.sh
# Strigo context
export INSTANCE_NAME={{ .STRIGO_RESOURCE_NAME }}
export PUBLIC_DNS={{ .STRIGO_RESOURCE_DNS }}
export PUBLIC_IP=$(curl --silent ifconfig.co)
export PRIVATE_DNS={{ .STRIGO_RESOURCE_DNS }}
export PRIVATE_IP=$(dig +short {{ .STRIGO_RESOURCE_DNS }})
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
