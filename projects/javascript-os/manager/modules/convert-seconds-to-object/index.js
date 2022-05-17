/**
 * 将一个总秒数转换为年、月、日、时、分、秒
 * @param {number} total
 * @returns object 形如：{"year":52,"month":4,"day":29,"hours":13,"minutes":15,"seconds":23.92899990081787}
 */
module.exports = function (total) {
  const year = Math.floor(total / (365 * 24 * 60 * 60));
  total = total - year * 365 * 24 * 60 * 60;
  const month = Math.floor(total / (30 * 24 * 60 * 60));
  total = total - month * 30 * 24 * 60 * 60;
  const day = Math.floor(total / (24 * 60 * 60));
  total = total - day * 24 * 60 * 60;
  const hours = Math.floor(total / (60 * 60));
  total = total - hours * 60 * 60;
  const minutes = Math.floor(total / 60);
  total = total - minutes * 60;
  const seconds = total;
  const object = {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
  };
  console.log(JSON.stringify(object));
  return object;
};
