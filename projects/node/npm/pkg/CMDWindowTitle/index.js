/**
 * pkg -t win index.js
 * @see nodejs打包成桌面程序（exe）的进阶之路 - 东晨下山v - 博客园: https://www.cnblogs.com/xcblogs-python/p/13583154.html
 */
console.log(`拼`);

/**
 * @see 修改CMD命令窗口标题_玩垃圾的人-CSDN博客: https://blog.csdn.net/a4171175/article/details/80355975
 */
let version="0.0.1";
let title=`某程序-v${version}`;
require("child_process").execSync(`title ${title}`);

console.log('Press any key to exit');
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));
