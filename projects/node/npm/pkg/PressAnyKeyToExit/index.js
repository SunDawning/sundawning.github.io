/**
 * pkg -t win index.js
 * @see nodejs打包成桌面程序（exe）的进阶之路 - 东晨下山v - 博客园: https://www.cnblogs.com/xcblogs-python/p/13583154.html
 */
console.log(`拼`);
/**
 *  暂停以查看输出
 * @see press any key to continue in nodejs | Newbedev: https://newbedev.com/press-any-key-to-continue-in-nodejs
 */
console.log('Press any key to exit');
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));

