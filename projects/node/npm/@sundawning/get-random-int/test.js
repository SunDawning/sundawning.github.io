const log = require("@sundawning/console-log-timestamp");
const get_random_int = require("./index");
log(get_random_int({ min: 10 }));
log(get_random_int({ max: 100 }));
log(get_random_int({ min: 20, max: 100 }));
