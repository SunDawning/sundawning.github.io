const pm2 = require("./index");
pm2.start({
  name: "hello",
  javascript: `require("child_process").exec("npx http-server");`,
});
