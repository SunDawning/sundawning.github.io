import Search from './components/Search';
import Buttons from './components/Buttons';
import { Layout, Space } from 'antd';
const { Header } = Layout;
export default function IndexPage() {
  return (
    <Header>
      <Space
        style={{ width: '100%', height: '100%', justifyContent: 'center' }}
      >
        <Search></Search>
        <Buttons></Buttons>
      </Space>
    </Header>
  );
}
