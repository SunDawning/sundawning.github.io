const exec = require("manager/modules/exec");
const check_new_version = require("manager/modules/check-new-version");
const get_port = require("manager/modules/get-port");
const get_random_port = require("manager/modules/get-random-port");
const log = require("server/modules/log");
const convert_seconds_to_object = require("manager/modules/convert-seconds-to-object");
index();
async function index() {
  const browser_port = await get_port({ port: 3000 });
  const server_port = await get_random_port();
  // 启动后端服务器和前端服务器
  check_new_version();
  [
    `cd ../server && pnpm run start -- --port ${server_port}`,
    {
      win32: `cd ../browser && pnpm run dev -- --port ${browser_port} -- --proxy_port ${server_port}`,
      android: `cd ../browser && pnpm run dev --port ${browser_port} -- --proxy_port ${server_port}`,
    }[process.platform],
  ].forEach(function (command) {
    exec(command);
  });
  setTimeout(function () {
    // 提示浏览器
    log(`浏览器 http://localhost:${browser_port}`);
    // 修改命令行的标题
    exec("title OS服务器");
  }, 3000);
  setInterval(function () {
    log(`
系统信息：

已在线 ${JSON.stringify(convert_seconds_to_object(process.uptime()))}

- 浏览器 http://localhost:${browser_port}
- 服务器 http://localhost:${server_port}
`);
  }, 60 * 1000);
}
