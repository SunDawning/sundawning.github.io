import { Space, Button } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
export default function IndexPage() {
  return (
    <Space style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
      <Button
        title="基本设置"
        icon={<SettingOutlined></SettingOutlined>}
      ></Button>
      <Button title="用户管理" icon={<UserOutlined></UserOutlined>}></Button>
    </Space>
  );
}
