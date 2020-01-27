@echo off

set dir_output=%~dp0.\output

set fcrypt_js="%~dp0..\bin\fcrypt.js"
set zip_in="%dir_output%\bin.zip.aes-256-cbc"
set dir_out="%dir_output%\bin"
set password="mySuperPass1337"

if not exist "%dir_output%" mkdir "%dir_output%"
if exist %dir_out% rmdir /Q /S %dir_out%

node %fcrypt_js% --decrypt --input %zip_in% --output %dir_out% -c --password %password%

echo.
pause
