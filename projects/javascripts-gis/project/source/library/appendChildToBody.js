/**
 * 添加元素到document.body
 * @param {HTMLElement} child
 */
globalThis.appendChildToBody = function (child) {
  const body = document.body;
  appendChild(body, child);
};
