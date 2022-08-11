import { Table } from 'antd';
export default function IndexPage({ dataBase, setDataBase }) {
  return (
    <Table
      columns={dataBase.table.columns}
      dataSource={dataBase.table.dataSource}
    ></Table>
  );
}
