const KoaSQLiteRESTfulAPI = require("./index.js");
const path = require("path");
KoaSQLiteRESTfulAPI.start({
  koa: {
    port: 8080,
  },
  sqlite: {
    filename: path.resolve(__dirname, "./database.db"),
    table_name: "todos",
  },
});
