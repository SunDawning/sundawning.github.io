import { Layout, Menu, Input, Space } from 'antd';
const { Header, Content, Sider, Footer } = Layout;
const { Search } = Input;
export default function IndexPage() {
  return (
    <Layout>
      {/* 头部 */}
      <Header>
        <Space>
          <Search></Search>
        </Space>
      </Header>
      {/* 内容 */}
      <Content style={{ minHeight: '480px' }}></Content>
      {/* 底部 */}
      <Footer>
        Copyright © 2022 SunDawning
        <a href="mailto:jobsimi@qq.com">jobsimi@qq.com</a>, All Rights Reserved
      </Footer>
    </Layout>
  );
}
