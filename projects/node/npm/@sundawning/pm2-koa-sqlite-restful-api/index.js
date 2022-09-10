module.exports = { start };
const pm2 = require("@sundawning/pm2-start-javascript");
/**
 * @param {object} options
 * @param {object} options.pm2
 * @param {object} options.koa
 * @param {object} options.sqlite
 * @returns
 */
async function start({
  pm2: { cwd },
  koa: { port },
  sqlite: { filename, table_name },
} = {}) {
  return await pm2.startFunction({
    cwd,
    name: `nginx${table_name.toUpperCase()}Server`,
    fun: function (args) {
      const KoaSQLiteRESTfulAPI = require("@sundawning/koa-sqlite-restful-api");
      KoaSQLiteRESTfulAPI.start(args);
    },
    args: {
      koa: {
        port,
      },
      sqlite: {
        filename,
        table_name,
      },
    },
  });
}
