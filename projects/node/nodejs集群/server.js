const http = require("http");
const pid = process.pid;
http
  .createServer(function (request, response) {
    for (let c = 0; c < 1e6; c = c + 1) {}
    response.end(`handled by process: ${pid}`);
  })
  .listen(8080, function () {
    console.log(`start process`, pid);
  });
