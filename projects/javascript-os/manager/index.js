const exec = require("./modules/exec");
const server_port = 3001;
const browser_port = 3000;
{
  // 启动后端服务器和前端服务器
  [
    "git pull && pnpm install",
    `cd ../server && pnpm run start -- --port ${server_port}`,
    `cd ../browser && pnpm run dev -- --port ${browser_port} -- --proxy_port ${server_port}`,
  ].forEach(exec);
  // 打开浏览器
  exec(`start http://localhost:${browser_port}`);
  // 修改命令行的标题
  setTimeout(function () {
    exec("title OS服务器");
  }, 5000);
}
