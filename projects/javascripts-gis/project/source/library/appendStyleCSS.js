if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 添加样式
 * @param {HTMLElement} container
 * @param {string} url
 */
SunDawningGIS.appendStyleCSS = async function (container, url) {
  const response = await fetch(url);
  await import("./appendStyleResponse.js");
  SunDawningGIS.appendStyleResponse(container, response);
};
