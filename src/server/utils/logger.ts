import {Logger} from "ts-log-debug";

export const log = new Logger("SlackEntitlement");
log.appenders
    .set("std-log", {
        type: "stdout",
        levels: ["debug", "info", "trace"]
    })
    .set("error-log", {
        type: "stderr",
        levels: ["fatal", "error", "warn"],
        layout: {
          type: "pattern",
          pattern: "%d %p %c %X{user} %m%n"
        }
    });

    /*
    .set("all-log-file", {
        type: "file",
        filename: `${__dirname}/logs/app.log`,
        layout:{
            type: "json",
            separator: ","
        }
    });
    */
