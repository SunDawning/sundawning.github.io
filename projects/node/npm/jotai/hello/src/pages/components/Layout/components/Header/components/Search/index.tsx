import { Input } from 'antd';
const { Search } = Input;
export default function IndexPage() {
  return (
    <Search
      style={{ width: '100%', display: 'block' }}
      size="large"
      width="100%"
    ></Search>
  );
}
