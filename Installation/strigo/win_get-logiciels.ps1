# Install required software

# Upgrading .NET Framework is required by Git Credential Manager.
# Info: you'll need to restart the VM to finalize thd upgrade!

choco install --no-progress dotnetfx
choco install --no-progress git
choco install --no-progress nodejs-lts
choco install --no-progress webstorm --version=2021.2.2
