/**
 * koa处理post请求
 * @see https://www.jianshu.com/p/8ead763ed4c0
 * @param {*} ctx
 * @returns
 */
module.exports = function (ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = "";
      ctx.req.addListener("data", (data) => {
        postData += data;
      });
      ctx.req.on("end", () => {
        resolve(postData);
      });
    } catch (err) {
      reject(err);
    }
  });
};
