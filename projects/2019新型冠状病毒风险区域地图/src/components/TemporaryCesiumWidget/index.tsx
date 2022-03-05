import { useEffect } from 'react';
import styles from './index.less';
import { CesiumWidget } from 'cesium';
import cesiumWidgetConfig from '@/modules/cesiumWidgetArcGisWorldImageryConfig';
/**
 * 基于CesiumJS默认的简化界面所配置的界面
 */
export default function IndexPage() {
  const className = styles.container;
  useEffect(function () {
    const container = document.querySelector('.' + className);
    const widget = new CesiumWidget(container, cesiumWidgetConfig);
    console.log('widget', widget);
    return function () {
      widget.destroy();
    };
  }, []);
  return <div className={className}></div>;
}
