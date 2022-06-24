if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建时间日期栏
 * @returns HTMLElement
 */
SunDawningGIS.HTMLElement_createDateContainer = async function () {
  await import("./HTMLElement_createDivWithShadowRoot.js");
  const container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
  SunDawningGIS.HTMLElement_appendStyleText(
    container.shadowRoot,
    `
div{
  position: absolute;
  width: 64px;
  right: 0;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;    
  font-size: 12px;
}
div:hover{
  background: black;
}   
    `
  );
  container.shadowRoot.appendChild(
    SunDawningGIS.HTMLElement_createDivWithShadowRoot()
  );
  return container;
};
