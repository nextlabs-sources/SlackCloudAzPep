import envConfig from './server/config/slack_entitlement';
import * as server from "./server";

async function main() {
    await server.start(envConfig.HTTP_PORT || 3000);
    console.log(`Server started at http://localhost:${envConfig.HTTP_PORT}`);
}

main().catch(error => console.error(error));