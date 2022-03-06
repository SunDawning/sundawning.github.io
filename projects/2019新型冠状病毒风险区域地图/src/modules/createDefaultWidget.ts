import { CesiumWidget } from 'cesium';
/**
 * 创建一个CesiumWidget作为默认的Widget
 */
export default function createWidget(container: Element) {
  const widget = new CesiumWidget(container, {
    imageryProvider: false, // 关闭图层
  });
  console.log('widget', widget); // 输出widget信息
  return widget;
}
