const log = require("server/modules/log");
const random_number = require("./index");
log(random_number({ min: 10 }));
log(random_number({ max: 100 }));
log(random_number({ min: 20, max: 100 }));
