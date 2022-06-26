if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 获取div群组里便于直接添加元素的元素，省去shadowRoot的书写。
 * @param {HTMLElement} group 由HTMLElement_createDivGroupWithShadowRoot创建的div群组
 * @returns
 */
SunDawningGIS.HTMLElement_queryDivGroupShadowRoot = function (group) {
  return group.shadowRoot.querySelector("div").shadowRoot;
};
