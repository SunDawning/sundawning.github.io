import styles from './index.less';
import { useState } from 'react';
import Form from './components/Form';
import Table from './components/Table';

export default function IndexPage() {
  const [dataBase, setDataBase] = useState(initialDataBase);
  return (
    <div>
      <h1 className={styles.title}>{dataBase.title}</h1>
      <Form dataBase={dataBase} setDataBase={setDataBase}></Form>
      <Table dataBase={dataBase} setDataBase={setDataBase}></Table>
    </div>
  );
}
// 初始的数据库
const initialDataBase = {
  title: 'Page index',
  table: {
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ],
    dataSource: [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ],
  },
};
