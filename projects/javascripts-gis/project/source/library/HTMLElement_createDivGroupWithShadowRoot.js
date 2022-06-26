if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建div群组，便于容纳多个div，便于设置div群组的样式
 * 可使用SunDawningGIS.HTMLElement_queryDivGroupShadowRoot来获取能直接添加元素的元素
 * @param {HTMLElment} container
 * @param {string} CSSText
 * @returns HTMLElement
 */
SunDawningGIS.HTMLElement_createDivGroupWithShadowRoot = async function (
  container,
  CSSText
) {
  await import("./HTMLElement_createDivWithShadowRoot.js");
  const group = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
  if (container) {
    container.appendChild(group);
  }
  if (CSSText) {
    await import("./HTMLElement_appendStyleText.js");
    SunDawningGIS.HTMLElement_appendStyleText(group.shadowRoot, CSSText);
  }
  {
    const _group = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
    group.shadowRoot.appendChild(_group);
  }
  return group;
};
