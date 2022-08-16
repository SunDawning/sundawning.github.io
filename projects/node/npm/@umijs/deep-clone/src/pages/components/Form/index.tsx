import { Space, Form, Input, Button } from 'antd';
const { Item } = Form;
export default function IndexPage({ dataBase, setDataBase }) {
  const [form] = Form.useForm();
  function onChangeTitle(event) {
    dataBase.title = event.target.value;
    // console.log('dataBase', dataBase);
    setDataBase({ ...dataBase });
  }
  function onClickToAddColumn() {
    dataBase.table.columns.push({
      title: '操作',
      dataIndex: 'operation',
      render: function (_, record) {
        function onClickDeleteRow() {
          dataBase.table.dataSource.splice(record.key, 1);
          dataBase.table.dataSource.forEach(function (row, index) {
            row.key = index;
          });
          dataBase.table.dataSource = [...dataBase.table.dataSource];
          setDataBase({ ...dataBase });
        }
        return (
          <Button type="link" onClick={onClickDeleteRow}>
            Delete
          </Button>
        );
      },
    });
    dataBase.table.columns = [...dataBase.table.columns]; // 复制数组
    setDataBase({ ...dataBase });
  }
  function onClickToRemoveColumn() {
    dataBase.table.columns.pop();
    dataBase.table.columns = [...dataBase.table.columns]; // 复制数据
    setDataBase({ ...dataBase });
  }
  function onClickToEditableRow() {
    dataBase.table.dataSource.push({
      key: dataBase.table.dataSource.length,
      name: (
        <Input
          placeholser="name"
          defaultValue={dataBase.table.dataSource.length}
        ></Input>
      ),
      age: dataBase.table.dataSource.length,
      address: '西湖区湖底公园1号',
    });
    dataBase.table.dataSource = [...dataBase.table.dataSource];
    setDataBase({ ...dataBase });
  }
  return (
    <Form form={form}>
      <Space>
        <Item label="标题" name="title">
          <Input onChange={onChangeTitle}></Input>
        </Item>
        <Item>
          <Button onClick={onClickToAddColumn}>增加一列</Button>
        </Item>
        <Item>
          <Button onClick={onClickToRemoveColumn}>删除一列</Button>
        </Item>
        <Item>
          <Button onClick={onClickToEditableRow}>增加可编辑行</Button>
        </Item>
      </Space>
    </Form>
  );
}
