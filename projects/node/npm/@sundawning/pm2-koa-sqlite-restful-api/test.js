const PM2KoaSQLiteRESTfulAPI = require("./index.js");
const path = require("path");
PM2KoaSQLiteRESTfulAPI.start({
  pm2: { cwd: __dirname },
  koa: {
    port: 8080,
  },
  sqlite: {
    filename: path.resolve(__dirname, "./database.db"),
    table_name: "todos",
  },
});
