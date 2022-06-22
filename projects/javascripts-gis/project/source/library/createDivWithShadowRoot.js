if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建带有shadowRoot的div
 * @returns HTMLElement
 */
SunDawningGIS.createDivWithShadowRoot = function () {
  const container = document.createElement("div");
  container.attachShadow({ mode: "open" });
  return container;
};
