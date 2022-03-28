/**
 * 添加外部importmap
 * @param {object} content importmap的内容，一个JSON对象。
 * @see https://github.com/WICG/import-maps/issues/235#issuecomment-1002340944
 */
function importmap(content) {
  const script = document.createElement("script");
  script.type = "importmap";
  script.textContent = JSON.stringify(content);
  document.currentScript.after(script);
}
importmap({
  imports: {
    Canvas: "./Canvas.js",
  },
});
