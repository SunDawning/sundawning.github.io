const child_process = require("child_process");
["cd proxy && npm run start", "cd vue && npm run dev"].forEach(function (
  command
) {
  const child = child_process.exec(command);
  ["stderr", "stdout", "stdin"].forEach(function (location) {
    child[location].pipe(process[location]);
  });
});
