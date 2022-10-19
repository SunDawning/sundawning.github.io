import { Space, Button } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
export default function IndexPage() {
  return (
    <Space style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
      <Button title="设置" icon={<SettingOutlined></SettingOutlined>}></Button>
      <Button title="注销" icon={<LogoutOutlined></LogoutOutlined>}></Button>
    </Space>
  );
}
