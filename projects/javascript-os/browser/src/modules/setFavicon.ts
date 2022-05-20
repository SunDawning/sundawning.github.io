/**
 * 设置网站图标
 * @param {string} favicon 网站图标 favicon.ico
 * @returns
 */
export default function index(favicon) {
  console.log("设置favicon", favicon);
  const element = document.querySelector("link[rel='icon']");
  if (element === null) {
    return;
  }
  element.href = favicon;
}
