/**
 * 添加元素到document.body
 * @param {HTMLElement} child
 */
window.appendChildToBody = function (child) {
  const body = document.body;
  appendChild(body, child);
};
