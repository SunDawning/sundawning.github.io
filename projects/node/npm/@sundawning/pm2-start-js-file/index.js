module.exports = { start };
const pm2 = require("@sundawning/pm2-async");
/**
 * 使用pm2启动.js文件，不重复启动。
 * @param {string} options.name pm2所启动的程序名
 * @param {string} options.script pm2所启动的.js文件，是一个绝对路径。
 * @param {string} [options.args] “-a 13 -b 12”	string containing all arguments passed via CLI to script
 * @param {string} [options.cwd] pm2启动程序时的当前目录
 */
async function start({ name, script, args, cwd } = {}) {
  if (name === undefined) {
    console.log("缺失name");
    return;
  }
  if (script === undefined) {
    console.log("缺失script");
    return;
  }
  await pm2.connect();
  const list = await pm2.list();
  const names = list.map(function ({ name }) {
    return name;
  });
  console.log("正在运行", names);
  if (names.includes(name) === false) {
    console.log("启动", name);
    const options = {
      script,
      name,
      cwd,
      args,
    };
    await pm2.start(options);
    console.log(options);
  }
  await pm2.disconnect();
}
