import { Form, Input } from 'antd';
const { Item } = Form;
export default function IndexPage({ dataBase, setDataBase }) {
  const [form] = Form.useForm();
  function onChangeTitle(event) {
    dataBase.title = event.target.value;
    // console.log('dataBase', dataBase);
    setDataBase({ ...dataBase });
  }
  return (
    <Form form={form}>
      <Item label="标题" name="title">
        <Input onChange={onChangeTitle}></Input>
      </Item>
    </Form>
  );
}
