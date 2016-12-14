rd c:\temp\release\tecaj-ext /S /Q
md c:\temp\release\tecaj-ext

copy W:\Code\github\tecaj-webextension\manifest.json c:\temp\release\tecaj-ext
copy W:\Code\github\tecaj-webextension\README.md c:\temp\release\tecaj-ext

md c:\temp\release\tecaj-ext\content_scripts
copy W:\Code\github\tecaj-webextension\content_scripts\tecaj.js c:\temp\release\tecaj-ext\content_scripts\tecaj.js

md c:\temp\release\tecaj-ext\icons
copy W:\Code\github\tecaj-webextension\icons\licence.txt c:\temp\release\tecaj-ext\icons\licence.txt
copy W:\Code\github\tecaj-webextension\icons\tecaj-32.png c:\temp\release\tecaj-ext\icons\tecaj-32.png
copy W:\Code\github\tecaj-webextension\icons\tecaj-48.png c:\temp\release\tecaj-ext\icons\tecaj-48.png

md c:\temp\release\tecaj-ext\lib
copy W:\Code\github\tecaj-webextension\lib\hnb-tecaj.js c:\temp\release\tecaj-ext\lib\hnb-tecaj.js
copy W:\Code\github\tecaj-webextension\lib\jquery-3.1.1.min.js c:\temp\release\tecaj-ext\lib\jquery-3.1.1.min.js
copy W:\Code\github\tecaj-webextension\lib\util.js c:\temp\release\tecaj-ext\lib\util.js

md c:\temp\release\tecaj-ext\popup
copy W:\Code\github\tecaj-webextension\popup\popup.css c:\temp\release\tecaj-ext\popup\popup.css
copy W:\Code\github\tecaj-webextension\popup\popup.html c:\temp\release\tecaj-ext\popup\popup.html
copy W:\Code\github\tecaj-webextension\popup\popup.js c:\temp\release\tecaj-ext\popup\popup.js
copy W:\Code\github\tecaj-webextension\popup\pure-min.css c:\temp\release\tecaj-ext\popup\pure-min.css

rem powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('c:\temp\release\tecaj-ext', 'c:\temp\tecaj.zip'); }"
