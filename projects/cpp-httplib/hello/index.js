const child_process = require("child_process");
const fs = require("fs");
const build_directory = "./build";
if (fs.existsSync(build_directory) === false) {
  fs.mkdirSync(build_directory);
}
{
  const child = child_process.exec(
    `g++ -g index.cpp -o ${build_directory}/index.exe && cd ./build && index.exe`
  );
  child.stdout.pipe(process.stdout);
  child.stdin.pipe(process.stdin);
}
