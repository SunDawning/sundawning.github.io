const child_process = require("child_process");
const fs = require("fs");
let DATABASE = {
  build_directory: "./build",
  exe_file_name: "index.exe",
  cpp_httplib_include_directory: "./cpp-httplib-v0.10.6",
  cpp_httplib_library_files: ["ws2_32", "libssl", "libcrypto", "crypt32"],
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
  cpp_httplib_library_files,
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
{
  const copy_files = [];
  opencv_library_files.forEach(function (file) {
    const fileName = `${file}.dll`;
    const destination = `${build_directory}/${fileName}`;
    if (fs.existsSync(destination) === true) {
      return;
    }
    copy_files.push(
      `cp ${opencv_library_directory}/${fileName} "${build_directory}"`
    );
  });
  if (copy_files.length > 0) {
    exec(copy_files.join(" && "));
  }
}
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
