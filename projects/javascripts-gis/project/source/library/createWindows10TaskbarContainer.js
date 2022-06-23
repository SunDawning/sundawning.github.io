if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建Windows 10风格的底部任务栏
 * @returns HTMLElement
 */
SunDawningGIS.createWindows10TaskbarContainer = async function () {
  await import("./createDivWithShadowRoot.js");
  const container = SunDawningGIS.createDivWithShadowRoot();
  await import("./appendStyleText.js");
  SunDawningGIS.appendStyleText(
    container.shadowRoot,
    `
div{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 48px;
  width: 100%;
  background-color: #3e3d3ced;   
}       
    `
  );
  container.shadowRoot.appendChild(SunDawningGIS.createDivWithShadowRoot());
  return container;
};
