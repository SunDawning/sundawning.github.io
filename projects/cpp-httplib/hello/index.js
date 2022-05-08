const child_process = require("child_process");
const fs = require("fs");
let DATABASE = {
  build_directory: "./build",
  exe_file_name: "index.exe",
  libraries: [
    {
      include: "C:/Users/SunDawning/Downloads/cpp-httplib-0.10.6",
      library_files: ["ws2_32", "libssl", "libcrypto", "crypt32"],
    },
  ],
};
let { build_directory, exe_file_name, libraries } = DATABASE;
{
  if (fs.existsSync(build_directory) === false) {
    fs.mkdirSync(build_directory);
  }
}
run_shell_command(
  `g++ index.cpp -g -o "${build_directory}/${exe_file_name}" ${concate_libraries(
    libraries
  )} && cd "${build_directory}" && ${exe_file_name}`
);
/**
 * 打印，不同于console.log，带有时间戳。
 */
function log() {
  process.stdout.write(`[${new Date().toLocaleString()}] `);
  console.log.apply(null, arguments);
}
/**
 * 拼接所使用的库为字符串
 * -I -L -l
 * -I C:/Users/SunDawning/Downloads/cpp-httplib-0.10.6 -l ws2_32 -l libssl -l libcrypto -l crypt32
 */
function concate_libraries(libraries) {
  return libraries
    .map(function ({ include, library_directory, library_files }) {
      let array = [];
      if (include) {
        array.push("-I", include);
      }
      if (library_directory) {
        array.push("-L", library_directory);
      }
      if (library_files) {
        library_files.forEach(function (file) {
          array.push("-l", file);
        });
      }
      return array.join(" ");
    })
    .join(" ");
}
/**
 * 执行终端命令
 * @param {string} command
 */
function run_shell_command(command) {
  log("执行命令 %s", command);
  const child = child_process.exec(command);
  ["stderr", "stdout", "stdin"].forEach(function (location) {
    child[location].on("data", function (data) {
      log(data);
    });
  });
}
