if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 添加元素到document.body
 * @param {HTMLElement} child
 */
SunDawningGIS.appendChildToBody = function (child) {
  const body = document.body;
  await import("./appendChild.js");
  SunDawningGIS.appendChild(body, child);
};
