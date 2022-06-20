if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建一个有shadowRoot的元素
 * @param {HTMLElement} root
 * @returns
 */
SunDawningGIS.getShadowRootContainerCreateAndAppend = async function (root) {
  let container;
  {
    await import("./getShadowRootContainerCreate.js");
    container = SunDawningGIS.getShadowRootContainerCreate();
  }
  {
    await import("./appendChild.js");
    SunDawningGIS.appendChild(root, container);
  }
  return container;
};
