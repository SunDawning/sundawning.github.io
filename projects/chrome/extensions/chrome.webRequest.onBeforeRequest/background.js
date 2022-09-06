/**
 * 网址重定向
 */
const proxy = [
  {
    from: "http://10.253.102.69/gw",
    to: "http://localhost:18080/services/10.253.102.69/gw",
  },
  {
    from: "http://localhost:8000/data",
    to: "http://localhost:18080/data",
  },
  //   {
  //     from: "http://192.168.10.41:3000/data",
  //     to: "http://localhost:18080/data",
  //   },
  {
    from: "http://localhost:8000/gws",
    to: "http://localhost:18080/gws",
  },
  {
    from: "http://localhost:8000/gongwushu",
    to: "http://localhost:18080/gongwushu",
  },
  {
    from: "http://192.168.10.41:8080/gw",
    to: "http://localhost:18080/services/10.253.102.69/gw",
  },
];
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log(details.url);
    const total = proxy.length;
    for (let c = 0; c < total; c = c + 1) {
      const { from, to } = proxy[c];
      if (details.url.startsWith(from) === true) {
        return {
          redirectUrl: details.url.replace(from, to),
        };
      }
    }
  },
  {
    urls: ["<all_urls>"], // or
    types:
      "csp_report, font, image, main_frame, media, object, other, ping, script, stylesheet, sub_frame, websocket, xmlhttprequest".split(
        ", "
      ),
  },
  ["blocking"]
);
