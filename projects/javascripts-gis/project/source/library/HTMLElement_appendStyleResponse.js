if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 添加样式
 * @param {HTMLElement} container
 * @param {Response} response
 */
SunDawningGIS.HTMLElement_appendStyleResponse = async function (
  container,
  response
) {
  const text = await response.text();
  await import("./HTMLElement_appendStyleText.js");
  SunDawningGIS.HTMLElement_appendStyleText(container, text);
};
