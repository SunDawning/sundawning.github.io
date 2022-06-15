/**
 * 添加样式
 * @param {HTMLElement} container
 * @param {string} text
 */
window.appendStyleText = function (container, text) {
  const style = document.createElement("style");
  style.innerText = text;
  container.appendChild(style);
};
