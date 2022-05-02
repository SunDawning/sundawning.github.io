const child_process = require("child_process");
["cd proxy && npm run start", "cd vue && npm run dev"].forEach(function (
  command
) {
  const child = child_process.exec(command);
  child.stderr.pipe(process.stderr);
  child.stdout.pipe(process.stdout);
  child.stdin.pipe(process.stdin);
});
