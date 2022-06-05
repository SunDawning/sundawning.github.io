/**
 * 生成min和max之间的随机整数
 * @see https://www.jianshu.com/p/5bcfc9d07b9a
 * @param {object} options
 * @param {number} [options.min=0] 最小值（包含）
 * @param {number} [options.max=1] 最大值（包含）
 */
module.exports = function ({ min = 0, max = 1 } = {}) {
  if (max < min) {
    max = min;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
