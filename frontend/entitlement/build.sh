echo "Build and deploy Entitlement for Slack's frontend UI"

# Production
webdev build -o web:..\..\..\dist\web\entitlement

# Development
# webdev build -o web:..\..\..\src\web\entitlement
