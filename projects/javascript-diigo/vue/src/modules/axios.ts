import axios from "axios";
/**
 * 改写axios，便于在浏览器里调用第三方接口
 * @param options
 * @returns
 */
export default async function index(options) {
  options.url = `/${options.url}`;
  options.headers[`_cookie`] = options.headers["cookie"];
  delete options.headers["cookie"];
  return await axios(options);
}
