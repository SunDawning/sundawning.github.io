import { atom, useAtom } from 'jotai';
import { Input, AutoComplete } from 'antd';
import { useState } from 'react';
const { Search } = Input;
export const search_keyword_atom = atom(''); // 搜索的关键字Atom
export default function IndexPage() {
  const [keywords, setKeywords] = useState([]); // 存储所搜索的关键字
  const [keyword, setKeyword] = useAtom(search_keyword_atom);
  // 每当搜索时，去重存储关键字。
  function onSearch(value, event) {
    if (value === '') {
      return;
    }
    setKeyword(value); // 更新全局搜索关键字
    if (keywords.includes(value) === true) {
      return;
    }
    setKeywords([...keywords, value]); // 存储所搜索的关键字
  }
  // 自动补全时过滤关键字
  function filterOption(inputValue, option) {
    return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  }
  return (
    <AutoComplete
      filterOption={filterOption}
      options={keywords.map(function (keyword) {
        return { value: keyword };
      })}
    >
      <Search
        style={{ width: '100%', display: 'block' }}
        size="large"
        width="100%"
        allowClear={true}
        onSearch={onSearch}
      ></Search>
    </AutoComplete>
  );
}
