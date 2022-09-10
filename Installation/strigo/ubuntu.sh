#!/bin/bash

set -ev

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


# Greetings message
rm -f /etc/profile.d/code-server-terminal.sh  # Remove code-server classic message
cat << \EOF > /etc/profile.d/training_greetings.sh
echo "--------------------------------"
echo -ne "\n\nWelcome on the \033[1mZenika\033[0m Angular course"
echo -ne '\n\033[1mvs-code\033[0m\n'
echo "to use a remote vs-code, check the vs code tab or the url "
echo "http://${PUBLIC_DNS}:9999?folder=/home/ubuntu"
grep '^password:' ~/.config/code-server/config.yaml
echo "--------------------------------"
echo "my public IP: ${PUBLIC_IP}"
echo "my public DNS: ${PUBLIC_DNS}"
echo "-------enjoy the session--------"
echo
EOF

# Force restart session to reload terminal
loginctl terminate-user ubuntu
