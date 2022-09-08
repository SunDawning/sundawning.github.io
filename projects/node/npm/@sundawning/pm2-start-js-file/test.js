const pm2 = require("./index");
const path = require("path");
pm2.start({
  name: "pm2-start-js-file",
  script: path.resolve(__dirname, "./server.js"),
});
