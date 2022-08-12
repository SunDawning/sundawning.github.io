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
        return <a>Delete</a>;
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
      </Space>
    </Form>
  );
}
