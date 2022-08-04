const index = require("./index.js");
const args = require("minimist")(process.argv.slice(2));
const fs = require("fs-extra");
const path = require("path");
const cwd = __dirname;
// console.log("args", args);
async function main() {
  const { help, version, port, services } = args;
  const json = fs.readJsonSync(path.join(cwd, "./package.json"));
  let { name, version: _version, description, author } = json;
  const programName = name + ".exe";
  // console.log(json, json);
  if (help === true) {
    console.log(`${description}

  - By ${author}
  - v${_version}

Usage: ${programName} [options]

Options:
  --help
  --version
  --port        设置监听的端口（默认：8280）
  --services    设置缓存的路径（默认：./services）（启用）

Examples:
  # 监听8888端口，缓存路径在D:\\LG\\services：
  ${programName} --port 8888 --services "D:\\LG\\services"
`);
    return;
  }
  if (version === true) {
    console.log(`v${_version}`);
    return;
  }
  index({ port, services });
}
main();
