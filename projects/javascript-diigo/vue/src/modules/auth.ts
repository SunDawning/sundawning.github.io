/**
 * 管理存储登录信息的数据库
 */
const key = "diigo_cookie";
export function insert(cookie) {
  localStorage.setItem(key, cookie);
}
export function select() {
  return localStorage.getItem(key);
}
export function drop() {
  return localStorage.removeItem(key);
}
/**
 * 获取用户名
 */
 export function getUserName() {
  let object = {};
  select()
    .split("; ")
    .forEach(function (item) {
      const [key, value] = item.split("=");
      object[key] = value;
    });
  // console.log("object", object);
  const diigo_and_login_cookie = object["diigoandlogincookie"];
  if (diigo_and_login_cookie === undefined) {
    return;
  }
  return diigo_and_login_cookie.split("-.-")[1];
}
