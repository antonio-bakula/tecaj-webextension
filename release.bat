@echo off
SET source=%~dp0
SET target=c:\temp\release\tecaj-ext

echo. tecaj-webextension build.  
echo. Source = %source%
echo. Target = %target%
rd %release% /S /Q
md %release%

copy %source%\manifest.json %target%\
copy %source%\README.md %target%\

md %target%\content_scripts\
copy %source%\content_scripts\tecaj.js %target%\content_scripts\

md %target%\icons
copy %source%\icons\licence.txt %target%\icons\
copy %source%\icons\tecaj-32.png %target%\icons\
copy %source%\icons\tecaj-48.png %target%\icons\

md %target%\lib
copy %source%\lib\modal.js %target%\lib\
copy %source%\lib\hnb-tecaj.js %target%\lib\
copy %source%\lib\jquery-3.1.1.min.js %target%\lib\
copy %source%\lib\util.js %target%\lib\

md %target%\popup
copy %source%\popup\popup.css %target%\popup\
copy %source%\popup\popup.html %target%\popup\
copy %source%\popup\popup.js %target%\popup\
copy %source%\popup\pure-min.css %target%\popup\

powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('%target%\', '%target%.zip'); }"

rem powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('c:\temp\release\tecaj-ext\', 'tecaj-ext.zip'); }"
