import { Layout } from 'antd';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
export default function IndexPage() {
  return (
    <Layout>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </Layout>
  );
}
