#!/usr/bin/env node
const options = require("minimist")(process.argv.slice(2));
console.log("options", options);
require("./utility").start(options);
