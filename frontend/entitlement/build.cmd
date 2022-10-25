@echo "Build and deploy Entitlement for Slack's frontend UI"
@echo off

REM Production
webdev build -o web:..\..\dist\web\entitlement

REM Development
REM webdev build -o web:..\..\src\web\entitlement
