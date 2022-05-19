/**
 * 管理存储登录信息的数据库
 */
const key = "javascript-os-password";
export function insert(cookie) {
  localStorage.setItem(key, cookie);
}
export function select() {
  return localStorage.getItem(key);
}
export function drop() {
  return localStorage.removeItem(key);
}
