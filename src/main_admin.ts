import envConfig from './server/config/slack_entitlement';
import * as server from "./server";

async function main() {
    await server.startAdmin(envConfig.ADMIN_HTTP_PORT || 4000);
    console.log(`Server started at http://localhost:${envConfig.ADMIN_HTTP_PORT}`);
}

main().catch(error => console.error(error));