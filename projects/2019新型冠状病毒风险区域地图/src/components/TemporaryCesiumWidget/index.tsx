import { useEffect } from 'react';
import styles from './index.less';
import { CesiumWidget } from 'cesium';
import ArcGISWorldImagery from '@/modules/ArcGIS_World_Imagery';
/**
 * 基于CesiumJS默认的简化界面所配置的界面
 */
export default function IndexPage() {
  const className = styles.container;
  useEffect(function () {
    const container = document.querySelector('.' + className);
    const widget = new CesiumWidget(container, {
      imageryProvider: ArcGISWorldImagery,
    });
    console.log('widget', widget);
    return function () {
      widget.destroy();
    };
  }, []);
  return <div className={className}></div>;
}
