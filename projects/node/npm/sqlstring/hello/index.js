const SQLString = require("sqlstring");
console.log(
  SQLString.format(`INSERT INTO users (??) VALUES (??)`, [
    ["a", "b"],
    ["1", console.log.toString()],
  ])
);
// INSERT INTO users (`a`, `b`) VALUES (`1`, `function () { [native code] }`)
