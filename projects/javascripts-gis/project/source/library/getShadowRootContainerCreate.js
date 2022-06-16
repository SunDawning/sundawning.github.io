/**
 * 创建一个有shadowRoot的元素
 * @param {HTMLElement} root
 * @returns
 */
globalThis.getShadowRootContainerCreate = function () {
  const container = document.createElement("div");
  container.attachShadow({ mode: "open" });
  return container;
};
