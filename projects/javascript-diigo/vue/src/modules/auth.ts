import axios from "axios";

/**
 * 管理存储登录信息的数据库
 */
const key = "diigo_cookie";
export function insert(cookie) {
  localStorage.setItem(key, cookie); // 在localStorage里存储
  axios({
    method: "POST",
    url: "/api/diigo",
    data: {
      cookie,
    },
  }); // 在服务器存储
}
export function select() {
  let value = localStorage.getItem(key);
  if (value === null) {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
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
