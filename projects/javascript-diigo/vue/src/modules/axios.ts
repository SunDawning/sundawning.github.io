import axios from "axios";
/**
 * 改写axios，便于在浏览器里调用第三方接口
 * @param options
 * @returns
 */
export default async function index(options) {
  if (options === undefined) {
    options = {};
  }
  let url = options.url;
  if (url === undefined) {
    return;
  }
  if (url.startsWith("/api")) {
    return await axios(options);
  }
  if (url.match(/^\https?:\/\//) === null) {
    console.log("无法代理该网址，仅支持“http://”或“https://”开头的网址：", url);
    return;
  }
  options.url = `/${options.url}`;
  if (options.headers) {
    ["Cookie"].forEach(function (key) {
      key = key.toLowerCase();
      if (options.headers[key] === undefined) {
        return;
      }
      options.headers[`_${key}`] = options.headers[key];
      delete options.headers[key];
    });
  }
  return await axios(options);
}
