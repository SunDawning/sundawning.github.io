const pm2 = require("./index");
pm2.start({
  name: "hello",
  javascript: `require("child_process").exec("npx http-server");`,
});
pm2.startFunction({
  name: "helloFunction",
  fun: function ({ port }) {
    require("child_process").exec(`npx http-server -p ${port}`);
  },
  args: { port: 8081 },
});
