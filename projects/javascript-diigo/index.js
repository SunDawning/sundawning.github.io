const child_process = require("child_process");
{
  // 启动后端服务器和前端服务器
  [
    "git pull && pnpm install",
    "cd proxy && npm run start",
    "cd vue && npm run dev",
  ].forEach(exec);
  // 打开浏览器
  // exec("start http://localhost:3000");
  // 修改命令行的标题
  setTimeout(function () {
    exec("title Diigo服务器");
  }, 5000);
}
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
