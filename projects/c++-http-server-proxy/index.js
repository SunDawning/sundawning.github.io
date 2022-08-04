const child_process = require("child_process");
const fs = require("fs");
let DATABASE = {
  build_directory: "./build",
  exe_file_name: "index.exe",
  cpp_httplib_include_directory: "./cpp-httplib-v0.10.6",
  cpp_httplib_library_directory: "C:/msys64/mingw64/bin",
  cpp_httplib_library_files: ["ws2_32", "libssl", "libcrypto", "crypt32"],
  // 生成exe后运行时缺失dll
  cpp_httplib_library_files_copy: [
    "libssl-1_1-x64", // libssl-1_1-x64.dll
    "libcrypto-1_1-x64", // libcrypto-1_1-x64.dll
    "libgcc_s_seh-1", // libgcc_s_seh-1.dll
    "libwinpthread-1", // libwinpthread-1.dll
    "libstdc++-6", // libstdc++-6.dll
  ],
  opencv_include_directory: "./OpenCV-MinGW-Build-OpenCV-4.5.5-x64/include",
  opencv_library_directory:
    "./OpenCV-MinGW-Build-OpenCV-4.5.5-x64/x64/mingw/bin",
  opencv_library_files: [
    "libopencv_core455",
    "libopencv_imgproc455",
    "libopencv_imgcodecs455",
    "libopencv_highgui455",
  ],
};
let {
  build_directory,
  exe_file_name,
  cpp_httplib_include_directory,
  cpp_httplib_library_directory,
  cpp_httplib_library_files,
  cpp_httplib_library_files_copy,
  opencv_include_directory,
  opencv_library_directory,
  opencv_library_files,
} = DATABASE;
{
  if (fs.existsSync(build_directory) === false) {
    fs.mkdirSync(build_directory);
  }
}
/**
 * 复制dll
 */
copyDLLs(
  cpp_httplib_library_directory,
  cpp_httplib_library_files_copy,
  build_directory
);
copyDLLs(opencv_library_directory, opencv_library_files, build_directory);
/**
 * 编译成exe并执行exe
 * g++ -g index.cpp -o "./build/index.exe" -I "C:/Users/jobsimi/Documents/tuihuiinfo/github.com/yhirose/cpp-httplib/cpp-httplib-v0.10.6" -l ws2_32 -l libssl -l libcrypto -l crypt32 -I "C:/Users/jobsimi/Downloads/OpenCV-MinGW-Build-OpenCV-4.5.5-x64/include" -L "C:/Users/jobsimi/Downloads/OpenCV-MinGW-Build-OpenCV-4.5.5-x64/x64/mingw/bin" -l libopencv_core455 -l libopencv_imgproc455 
-l libopencv_imgcodecs455 -l libopencv_highgui455 && cd "./build" && index.exe
 */
{
  const command = `g++ -g index.cpp -o "${build_directory}/${exe_file_name}" -I "${cpp_httplib_include_directory}" ${concate_library_files(
    cpp_httplib_library_files
  )} -I "${opencv_include_directory}" -L "${opencv_library_directory}" ${concate_library_files(
    opencv_library_files
  )} && cd "${build_directory}" && ${exe_file_name}`;
  exec(command);
}
/**
 * 将文件夹directory_from下的文件files复制到文件夹directory_to下
 * @param {string} directory_from
 * @param {array} files
 * @param {string} directory_to
 */
function copyDLLs(directory_from, files, directory_to) {
  const copy_files = [];
  files.forEach(function (file) {
    const fileName = `${file}.dll`;
    const from = `${directory_from}/${fileName}`;
    if (fs.existsSync(from) === false) {
      return;
    }
    const destination = `${directory_to}/${fileName}`;
    if (fs.existsSync(destination) === true) {
      return;
    }
    copy_files.push(`cp "${from}" "${directory_to}"`);
  });
  if (copy_files.length > 0) {
    exec(copy_files.join(" && "));
  }
}
/**
 * 拼接动态链接库
 * -l libopencv_core455 -l libopencv_imgproc455 -l libopencv_imgcodecs455 -l libopencv_highgui455
 */
function concate_library_files(files) {
  return files
    .map(function (file) {
      return `-l ${file}`;
    })
    .join(" ");
}
/**
 *
 */
function exec(command) {
  console.log("执行命令", command);
  const child = child_process.exec(command);
  ["stderr", "stdout", "stdin"].forEach(function (location) {
    child[location].pipe(process[location]);
  });
}
