if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建时间日期详情面板
 * @param {number} [options.bottom]
 * @returns HTMLElement
 */
SunDawningGIS.createDateTimeDetailContainer = async function ({
  bottom = 0,
} = {}) {
  await import("./createDivWithShadowRoot.js");
  const container = SunDawningGIS.createDivWithShadowRoot();
  await import("./appendStyleText.js");
  SunDawningGIS.appendStyleText(
    container.shadowRoot,
    `
div{
  position: absolute;
  bottom: ${bottom};
  height: 64vh;
  max-height: 688px;
  min-height: 360px;
  right: 0;
  min-width: 240px;
  max-width: 360px;
  width: 32vw;
  background: #3e3d3ced;
}    
    `
  );
  const _container = document.createElement("div");
  container.shadowRoot.appendChild(_container);
  return container;
};
