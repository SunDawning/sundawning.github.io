if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建本地时间的元素
 * @param {HTMLElement} container
 * @param {string} to 元素将要添加到的位置，譬如appendChild, before, after
 * @returns HTMLElement
 */
SunDawningGIS.createLocaleTimeElement = function (
  container,
  to = "appendChild"
) {
  const SELF = {};
  const locale_time_element = document.createElement("div");
  let id;
  function animate() {
    const locale_time = new Date()
      .toLocaleTimeString()
      .split(":")
      .slice(0, 2)
      .join(":");
    if (locale_time_element.innerHTML !== locale_time) {
      locale_time_element.innerHTML = locale_time;
    }
    id = requestAnimationFrame(animate);
  }
  animate();
  container[to](locale_time_element);
  /**
   * 销毁
   */
  SELF.destroy = function () {
    locale_time_element.remove();
    cancelAnimationFrame(id);
    Object.keys(SELF).forEach(function (key) {
      delete SELF[key];
    });
  };
  return SELF;
};
