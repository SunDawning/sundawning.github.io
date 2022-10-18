import styles from './index.less';
import { Layout, Input, Space, Button } from 'antd';
const { Header } = Layout;
const { Search } = Input;
export default function IndexPage() {
  return (
    <Header>
      <Space
        style={{ width: '100%', height: '100%', justifyContent: 'center' }}
        className={styles.space}
      >
        <Search style={{ width: '100%' }} size="large" width="100%"></Search>
        <Button>属性</Button>
      </Space>
    </Header>
  );
}
