/**
 * 自动补全数据库管理
 */
const key = "search_autocomplete";
/**
 * 所有数据
 * @returns
 */
export function select() {
  let value = localStorage.getItem(key);
  if (value === null) {
    value = JSON.stringify([]);
    localStorage.setItem(key, value);
  }
  return JSON.parse(value);
}
/**
 * 新增数据
 * @param value
 * @returns
 */
export function insert(value) {
  let database = select();
  if (database.includes(value) === true) {
    return;
  }
  database.push(value);
  localStorage.setItem(key, JSON.stringify(database));
}
