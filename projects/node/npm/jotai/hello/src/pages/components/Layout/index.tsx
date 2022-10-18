import { Layout, Menu, Input, Space } from 'antd';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
export default function IndexPage() {
  return (
    <Layout>
      <Header></Header>
      <Content style={{ minHeight: '480px' }}></Content>
      {/* 底部 */}
      <Footer>
        Copyright © 2022 SunDawning
        <a href="mailto:jobsimi@qq.com">jobsimi@qq.com</a>, All Rights Reserved
      </Footer>
    </Layout>
  );
}
