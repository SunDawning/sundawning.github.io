if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建时间日期详情面板
 * @returns HTMLElement
 */
SunDawningGIS.createDateTimeDetailContainer = async function () {
  await import("./createDivWithShadowRoot.js");
  const container = SunDawningGIS.createDivWithShadowRoot();
  await import("./appendStyleText.js");
  SunDawningGIS.appendStyleText(
    container.shadowRoot,
    `
div{
  position: absolute;
  top: -688px;
  height: 688px;
  right: 0;
  width: 360px;
  background: #3e3d3ced;
}    
    `
  );
  const _container = document.createElement("div");
  container.shadowRoot.appendChild(_container);
  return container;
};
