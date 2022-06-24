if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 添加元素到document.body
 * @param {HTMLElement} child
 */
SunDawningGIS.HTMLElement_appendChildToBody = function (child) {
  const body = document.body;
  await import("./HTMLElement_appendChild.js");
  SunDawningGIS.HTMLElement_appendChild(body, child);
};
