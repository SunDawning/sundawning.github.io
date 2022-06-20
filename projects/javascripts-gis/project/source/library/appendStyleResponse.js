if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 添加样式
 * @param {HTMLElement} container
 * @param {Response} response
 */
SunDawningGIS.appendStyleResponse = async function (container, response) {
  const text = await response.text();
  await import("./appendStyleText.js");
  SunDawningGIS.appendStyleText(container, text);
};
