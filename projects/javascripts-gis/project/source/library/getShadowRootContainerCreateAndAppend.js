/**
 * 创建一个有shadowRoot的元素
 * @param {HTMLElement} root
 * @returns
 */
window.getShadowRootContainerCreateAndAppend = async function (root) {
  let container;
  {
    await import("./getShadowRootContainerCreate.js");
    container = getShadowRootContainerCreate();
  }
  {
    await import("./appendChild.js");
    appendChild(root, container);
  }
  return container;
};
