/**
 * 添加样式
 * @param {HTMLElement} container
 * @param {string} text
 */
globalThis.appendStyleText = function (container, text) {
  const style = document.createElement("style");
  style.innerHTML = text;
  container.appendChild(style);
};
