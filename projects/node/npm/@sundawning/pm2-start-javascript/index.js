const fs = require("fs-extra");
const path = require("path");
const pm2 = require("@sundawning/pm2-start-js-file");

module.exports = { start, startFunction, startFile: pm2.start };

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
/**
 * 运行函数
 * @param {string} [name = fun.name] 函数的名字，当不存在时，取fun的name属性。
 * @param {function} fun 是一个函数定义，如果需要使用外部变量，需要提前计算。
 * @param {string|object} args 函数的自变量
 * @param {string} cwd
 */
async function startFunction({ name, fun, args, cwd = __dirname } = {}) {
  if (name === undefined) {
    name = fun.name;
  }
  if (name === undefined) {
    console.log("缺失name");
    return;
  }
  return await start({
    name,
    javascript: `// 由@sundawning/pm2-start-javascript自动创建于${new Date()}
// 定义函数
const ${name} = ${fun.toString()}
// 执行函数
${name}(${JSON.stringify(args)});
`,
    cwd,
  });
}
