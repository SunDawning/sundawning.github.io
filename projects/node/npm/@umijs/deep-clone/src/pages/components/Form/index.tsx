import { Form, Input } from 'antd';
const { Item } = Form;
export default function IndexPage({ dataBase, setDataBase }) {
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <Item label="标题" name="title">
        <Input></Input>
      </Item>
    </Form>
  );
}
