/**
 * 打印，不同于console.log，带有时间戳。
 */
module.exports = function () {
  process.stdout.write(`[${new Date().toLocaleString()}] `);
  console.log.apply(null, arguments);
};
