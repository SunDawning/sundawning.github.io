import { Layout } from 'antd';
import { useAtom } from 'jotai';
import { search_keyword_atom } from '../Header/components/Search';
const { Content } = Layout;
export default function IndexPage() {
  const [keyword, setKeyword] = useAtom(search_keyword_atom);
  return (
    <Content style={{ minHeight: '480px' }}>搜索的关键字：{keyword}</Content>
  );
}
