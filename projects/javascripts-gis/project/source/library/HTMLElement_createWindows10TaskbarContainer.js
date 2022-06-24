if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建Windows 10风格的底部任务栏
 * @returns HTMLElement
 */
SunDawningGIS.HTMLElement_createWindows10TaskbarContainer = async function () {
  await import("./HTMLElement_createDivWithShadowRoot.js");
  const container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
  await import("./HTMLElement_appendStyleText.js");
  SunDawningGIS.HTMLElement_appendStyleText(
    container.shadowRoot,
    `
div{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 48px;
  width: 100%;
  background-color: #3e3d3ced;
  user-select: none;
}
    `
  );
  container.shadowRoot.appendChild(
    SunDawningGIS.HTMLElement_createDivWithShadowRoot()
  );
  return container;
};
