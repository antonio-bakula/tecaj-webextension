@echo off
SET source=%~dp0
SET target=c:\temp\release\tecaj-ext

echo. tecaj-webextension build.  
echo. Source = %source%
echo. Target = %target%
rd %target% /S /Q
md %target%

copy %source%\manifest.json %target%\
copy %source%\README.md %target%\

rem md %target%\content_scripts\
rem copy %source%\content_scripts\tecaj.js %target%\content_scripts\

md %target%\assets

md %target%\assets\icons
copy %source%\assets\icons\tecaj-32.png %target%\assets\icons\
copy %source%\assets\icons\tecaj-48.png %target%\assets\icons\
copy %source%\assets\icons\tecaj-64.png %target%\assets\icons\
copy %source%\assets\icons\tecaj-128.png %target%\assets\icons\

md %target%\assets\css
copy %source%\assets\css\tecaj.css %target%\assets\css\
copy %source%\assets\css\pure-min.css %target%\assets\css\

md %target%\lib
copy %source%\lib\modal.js %target%\lib\
copy %source%\lib\hnb-tecaj.js %target%\lib\
copy %source%\lib\jquery-2.2.4.min.js %target%\lib\
copy %source%\lib\util.js %target%\lib\

md %target%\popup
copy %source%\popup\popup.html %target%\popup\
copy %source%\popup\popup.js %target%\popup\

md %target%\options
copy %source%\options\options.html %target%\options\
copy %source%\options\options.js %target%\options\

del /f %target%.zip
7z a -r %target%.zip %target%\*.*