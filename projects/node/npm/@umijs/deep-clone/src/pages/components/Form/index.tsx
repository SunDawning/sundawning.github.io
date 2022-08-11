import { Form, Input, Button } from 'antd';
const { Item } = Form;
export default function IndexPage({ dataBase, setDataBase }) {
  const [form] = Form.useForm();
  function onChangeTitle(event) {
    dataBase.title = event.target.value;
    // console.log('dataBase', dataBase);
    setDataBase({ ...dataBase });
  }
  function onClickToAddOperationColumn() {
    dataBase.table.columns.push({
      title: '操作',
      dataIndex: 'operation',
      render: function (_, record) {
        return <a>Delete</a>;
      },
    });
    setDataBase(dataBase);
  }
  return (
    <Form form={form}>
      <Item label="标题" name="title">
        <Input onChange={onChangeTitle}></Input>
      </Item>
      <Item>
        <Button onClick={onClickToAddOperationColumn}>增加操作栏</Button>
      </Item>
    </Form>
  );
}
