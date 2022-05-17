const exec = require("manager/modules/exec");
const check_new_version = require("manager/modules/check-new-version");
const get_port = require("manager/modules/get-port");
const get_random_port = require("manager/modules/get-random-port");
index();
async function index() {
  const browser_port = await get_port({ port: 3000 });
  const server_port = await get_random_port();
  // 启动后端服务器和前端服务器
  check_new_version();
  [
    `cd ../server && pnpm run start -- --port ${server_port}`,
    `cd ../browser && pnpm run dev -- --port ${browser_port} -- --proxy_port ${server_port}`,
  ].forEach(exec);
  setTimeout(function () {
    // 打开浏览器
    exec(`start http://localhost:${browser_port}`);
    // 修改命令行的标题
    exec("title OS服务器");
  }, 3000);
}
