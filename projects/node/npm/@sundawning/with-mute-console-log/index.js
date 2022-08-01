/**
 * 让console.log失效
 * @param {function} fun
 * @param {object} arguments
 */
module.exports = function () {
  const fun = arguments[0];
  const args = Object.values(arguments).slice(1);
  let { log } = console;
  console.log = function () {};
  fun.apply(null, args);
  console.log = log;
};
