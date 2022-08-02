const cluster = require("cluster");
const os = require("os");
if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log("forking for", cpus, "CPUs");
  for (let c = 0; c < cpus; c = c + 1) {
    cluster.fork();
  }
} else {
  require("./server.js");
}
