if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建时间日期详情面板
 * @param {number} [options.bottom]
 * @returns HTMLElement
 */
SunDawningGIS.HTMLElement_createDateTimeDetailContainer = async function ({
  bottom = 0,
} = {}) {
  await import("./HTMLElement_createDivWithShadowRoot.js");
  const container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
  await import("./HTMLElement_appendStyleText.js");
  SunDawningGIS.HTMLElement_appendStyleText(
    container.shadowRoot,
    `
div{
  position: absolute;
  right: 0;
  bottom: ${bottom};
  height: 64vh;
  min-height: 360px;  
  max-height: 688px;
  width: 32vw;
  min-width: 240px;
  max-width: 360px;
  background: #3e3d3ced;
}
    `
  );
  container.shadowRoot.appendChild(
    SunDawningGIS.HTMLElement_createDivWithShadowRoot()
  );
  return container;
};
