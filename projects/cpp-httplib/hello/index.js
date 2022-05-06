const child_process = require("child_process");
const fs = require("fs");
let DATABASE = {
  build_directory: "./build",
  exe_file_name: "index.exe",
  cpp_httplib_include_directory:
    "C:/Users/SunDawning/Downloads/cpp-httplib-0.10.6",
  cpp_httplib_library_files: ["ws2_32", "libssl", "libcrypto", "crypt32"],
};
let {
  build_directory,
  exe_file_name,
  cpp_httplib_include_directory,
  cpp_httplib_library_files,
} = DATABASE;
{
  if (fs.existsSync(build_directory) === false) {
    fs.mkdirSync(build_directory);
  }
}
run_shell_command(
  `g++ index.cpp -g -o "${build_directory}/${exe_file_name}" -I "${cpp_httplib_include_directory}" ${concat_library_files(
    cpp_httplib_library_files
  )} && cd "${build_directory}" && ${exe_file_name}`
);
/**
 * 拼接动态链接库
 * -l ws2_32 -l libssl -l libcrypto -l crypt32
 * @param {array} files
 * @returns
 */
function concat_library_files(files) {
  return files
    .map(function (file) {
      return `-l ${file}`;
    })
    .join(" ");
}
/**
 * 执行终端命令
 * @param {string} command
 */
function run_shell_command(command) {
  console.log("执行命令", command);
  const child = child_process.exec(command);
  ["stderr", "stdout", "stdin"].forEach(function (location) {
    child[location].pipe(process[location]);
  });
}
