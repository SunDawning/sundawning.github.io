/**
 * 添加样式
 * @param {HTMLElement} container
 * @param {string} url
 */
window.appendStyleCSS = async function (container, url) {
  const response = await fetch(url);
  await import("./appendStyleResponse.js");
  appendStyleResponse(container, response);
};
