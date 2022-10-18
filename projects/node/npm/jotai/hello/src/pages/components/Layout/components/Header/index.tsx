import { Layout, Input, Space } from 'antd';
const { Header } = Layout;
const { Search } = Input;
export default function IndexPage() {
  return (
    <Header>
      <Space>
        <Search></Search>
      </Space>
    </Header>
  );
}
