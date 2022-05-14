const child_process = require("child_process");
["git pull", "cd proxy && npm run start", "cd vue && npm run dev"].forEach(
  exec
);
setTimeout(function () {
  exec("title Diigo服务器");
}, 5000);
function exec(command) {
  log("执行命令", command);
  const child = child_process.exec(command);
  ["stderr", "stdout", "stdin"].forEach(function (location) {
    child[location].pipe(process[location]);
  });
}
/**
 * 打印，不同于console.log，带有时间戳。
 */
function log() {
  process.stdout.write(`[${new Date().toLocaleString()}] `);
  console.log.apply(null, arguments);
}
