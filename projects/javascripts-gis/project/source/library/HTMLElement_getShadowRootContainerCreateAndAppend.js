if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建一个有shadowRoot的元素
 * @param {HTMLElement} root
 * @returns
 */
SunDawningGIS.HTMLElement_getShadowRootContainerCreateAndAppend =
  async function (root) {
    let container;
    {
      await import("./HTMLElement_getShadowRootContainerCreate.js");
      container = SunDawningGIS.HTMLElement_getShadowRootContainerCreate();
    }
    {
      await import("./HTMLElement_appendChild.js");
      SunDawningGIS.HTMLElement_appendChild(root, container);
    }
    return container;
  };
