import styles from './index.less';
import { useState } from 'react';
import Form from './components/Form';

export default function IndexPage() {
  const [dataBase, setDataBase] = useState(initialDataBase);
  return (
    <div>
      <h1 className={styles.title}>{dataBase.title}</h1>
      <Form dataBase={dataBase} setDataBase={setDataBase}></Form>
    </div>
  );
}
// 初始的数据库
const initialDataBase = {
  title: 'Page index',
};
