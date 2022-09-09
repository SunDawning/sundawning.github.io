const NgrokFreenom = require("./index");
NgrokFreenom.start({
  ngrok: {
    token: "token",
    port: 8080,
  },
  freenom: {
    username: "username",
    password: "password",
    domain: "domain",
  },
});
