const child_process = require("child_process");
const fs = require("fs");
let DATABASE = {
  build_directory: "./build",
  exe_file_name: "index.exe",
  cpp_httplib_include_directory:
    "C:/Users/SunDawning/Downloads/cpp-httplib-0.10.6",
};
let { build_directory, exe_file_name, cpp_httplib_include_directory } =
  DATABASE;
{
  if (fs.existsSync(build_directory) === false) {
    fs.mkdirSync(build_directory);
  }
}
{
  const command = `g++ -g index.cpp -o "${build_directory}/${exe_file_name}" -I "${cpp_httplib_include_directory}" -l ws2_32 && cd "${build_directory}" && ${exe_file_name}`;
  console.log("执行命令", command);
  const child = child_process.exec(command);
  child.stderr.pipe(process.stderr);
  child.stdout.pipe(process.stdout);
  child.stdin.pipe(process.stdin);
}
