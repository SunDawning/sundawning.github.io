/**
 * 添加样式
 * @param {HTMLElement} container
 * @param {string} url
 */
globalThis.appendStyleCSS = async function (container, url) {
  const response = await fetch(url);
  await import("./appendStyleResponse.js");
  appendStyleResponse(container, response);
};
