if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 添加样式
 * @param {HTMLElement} container
 * @param {string} url
 */
SunDawningGIS.HTMLElement_appendStyleCSS = async function (container, url) {
  const response = await fetch(url);
  await import("./HTMLElement_appendStyleResponse.js");
  SunDawningGIS.HTMLElement_appendStyleResponse(container, response);
};
