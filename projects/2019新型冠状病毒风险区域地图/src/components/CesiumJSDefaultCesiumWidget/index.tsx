import { useEffect } from 'react';
import styles from './index.less';
import { CesiumWidget } from 'cesium';
/**
 * CesiumJS默认的简化界面
 */
export default function IndexPage() {
  const className = styles.container;
  useEffect(function () {
    const container = document.querySelector('.' + className);
    const widget = new CesiumWidget(container);
    console.log('widget', widget);
  }, []);
  return <div className={className}></div>;
}
