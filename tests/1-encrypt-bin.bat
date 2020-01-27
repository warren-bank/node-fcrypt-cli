@echo off

set dir_output=%~dp0.\output

set fcrypt_js="%~dp0..\bin\fcrypt.js"
set dir_in="%~dp0..\bin"
set zip_out="%dir_output%\bin.zip.aes-256-cbc"
set password="mySuperPass1337"

if not exist "%dir_output%" mkdir "%dir_output%"
if exist %zip_out% del /Q /F %zip_out%

node %fcrypt_js% --encrypt --input %dir_in% --output %zip_out% --password %password%

echo.
pause
