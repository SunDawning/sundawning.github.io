const exec = require("./modules/exec");
{
  // 启动后端服务器和前端服务器
  [
    "git pull && pnpm install",
    "cd ../server && npm run start",
    "cd ../browser && npm run dev",
  ].forEach(exec);
  // 打开浏览器
  exec("start http://localhost:3000");
  // 修改命令行的标题
  setTimeout(function () {
    exec("title OS服务器");
  }, 5000);
}
