# Install learning materials

# --- Config ---

$DestDir = 'C:\Users\Administrator\Desktop'

$SlidesFileId='1CyiRK3RNVXJ0MrmWFpm9CgVrCTI9OO1x'
$WorkbookFileId='1_ez91dUN-px9XP5EuD5eP2Z_onZN6eQL'
$ExercisesFileId='14LPgxgG4Nyy38w74R4URNtUlqUt07Qor'

# --- Download ---

Invoke-WebRequest -Uri "https://drive.google.com/uc?export=download&id=$SlidesFileId" -OutFile "$DestDir\Slides.zip"
Invoke-WebRequest -Uri "https://drive.google.com/uc?export=download&id=$WorkbookFileId" -OutFile "$DestDir\Workbook.zip"
Invoke-WebRequest -Uri "https://drive.google.com/uc?export=download&id=$ExercisesFileId" -OutFile "$DestDir\Exercises.zip"

# --- Unzip ---

Expand-Archive -Path "$DestDir\Slides.zip" -DestinationPath $DestDir
Expand-Archive -Path "$DestDir\Workbook.zip" -DestinationPath $DestDir
Expand-Archive -Path "$DestDir\Exercises.zip" -DestinationPath $DestDir
