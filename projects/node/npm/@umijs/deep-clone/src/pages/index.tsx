import styles from './index.less';
import { useState } from 'react';

export default function IndexPage() {
  const [dataBase, setDataBase] = useState(initialDataBase);
  return (
    <div>
      <h1 className={styles.title}>{dataBase.title}</h1>
    </div>
  );
}
// 初始的数据库
const initialDataBase = {
  title: 'Page index',
};
