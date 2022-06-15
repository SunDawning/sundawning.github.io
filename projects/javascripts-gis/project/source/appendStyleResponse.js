/**
 * 添加样式
 * @param {HTMLElement} container
 * @param {Response} response
 */
window.appendStyleResponse = async function (container, response) {
  const text = await response.text();
  await import("./appendStyleText.js");
  appendStyleText(container, text);
};
