# Install learning materials

$DestDir = 'C:\Users\Administrator\Desktop'
$SlidesFileId='1RJXMvZPpxkC2RQUUelcaXfsHmnj6xgCF'
$WorkbookFileId='1rYEB1ZYKbVedYAyHTEv_c5h9icSr1bPy'
$ResourcesFileId='1ZLHSSp-ViU1NzDEZzdJ9wLw7507C8T0f'
$SolutionsFileId='1LgElgvJoERvWlYN7AXy-o3iEcBQrgchK'
$WorkspacesFileId='1z454JPFe8W1DRfzqtPF6nEvzRHlAe9CE'

# PDF
Invoke-WebRequest -Uri "https://drive.google.com/uc?export=download&id=$SlidesFileId" -OutFile "$DestDir\Zenika-training-angular-Slides.pdf"
Invoke-WebRequest -Uri "https://drive.google.com/uc?export=download&id=$WorkbookFileId" -OutFile "$DestDir\Zenika-training-angular-Workbook.pdf"

# zip
Invoke-WebRequest -Uri "https://drive.google.com/uc?export=download&id=$ResourcesFileId" -OutFile "$DestDir\Zenika-training-angular-Ressources.zip"
Invoke-WebRequest -Uri "https://drive.google.com/uc?export=download&id=$SolutionsFileId" -OutFile "$DestDir\Zenika-training-angular-Corrections.zip"
Invoke-WebRequest -Uri "https://drive.google.com/uc?export=download&id=$WorkspacesFileId" -OutFile "$DestDir\Zenika-training-angular-Workspaces.zip"

# unzip
Expand-Archive -Path "$DestDir\Zenika-training-angular-Ressources.zip" -DestinationPath $DestDir
Expand-Archive -Path "$DestDir\Zenika-training-angular-Corrections.zip" -DestinationPath $DestDir
Expand-Archive -Path "$DestDir\Zenika-training-angular-Workspaces.zip" -DestinationPath $DestDir
