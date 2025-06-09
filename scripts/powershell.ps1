<powershell>

Write-Output "--------- Language"

Set-WinUserLanguageList -Force -LanguageList fr-FR
Set-WinDefaultInputMethodOverride -InputTip ((Get-WinUserLanguageList)[0].InputMethodTips)[0]

Write-Output "--------- Software"

Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor [System.Net.SecurityProtocolType]::Tls12
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
choco feature enable --name allowGlobalConfirmation

choco install --no-progress git
choco install --no-progress nodejs-lts
choco install --no-progress vscode

Write-Output "--------- VSCode Extensions"

$extensions =
    "angular.ng-template",
    "github.github-vscode-theme",
    "pkief.material-icon-theme",
    "formulahendry.auto-rename-tag",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"

$cmd = "code --list-extensions"
Invoke-Expression $cmd -OutVariable output | Out-Null
$installed = $output -split "\s"

foreach ($ext in $extensions) {
    if ($installed.Contains($ext)) {
        Write-Host $ext "already installed." -ForegroundColor Gray
    } else {
        Write-Host "Installing" $ext "..." -ForegroundColor White
        code --install-extension $ext
    }
}

</powershell>