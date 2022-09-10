module.exports = { start };
const fs = require("fs-extra");
const path = require("path");
const pm2 = require("@sundawning/pm2-start-js-file");
/**
 * 使用pm2来运行一段javascript文本
 * @param {string} options.name pm2程序的名称
 * @param {string} options.javascript javascript文本
 * @param {string} options.args 传递给pm2程序的命令行参数
 * @param {string} [options.cwd = __dirname] pm2程序的当前目录
 * @returns
 */
async function start({ name, javascript, args, cwd = __dirname } = {}) {
  if (name === undefined) {
    console.log("缺失name");
    return;
  }
  if (javascript === undefined) {
    console.log("缺失javascript");
    return;
  }
  // javascript保存到临时文件里
  const directory = path.resolve(cwd, ".temporary");
  await fs.ensureDir(directory);
  const filename = path.resolve(directory, `${name}.js`);
  await fs.outputFile(filename, javascript, {
    encoding: "utf-8",
  });
  // 启动临时文件
  return await pm2.start({ name, script: filename, args, cwd });
}
