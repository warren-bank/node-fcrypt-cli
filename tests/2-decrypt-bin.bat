@echo off

set dir_output=%~dp0.\output

set fcrypt_js="%~dp0..\bin\fcrypt.js"
set zip_in="%dir_output%\bin.zip.aes-256-cbc"
set zip_out="%dir_output%\bin.zip"
set password="mySuperPass1337"

if not exist "%dir_output%" mkdir "%dir_output%"
if exist %zip_out% del /Q /F %zip_out%

node %fcrypt_js% --decrypt --input %zip_in% --output %zip_out% -c --password %password%

echo.
pause
