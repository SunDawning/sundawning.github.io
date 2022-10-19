import { Input, AutoComplete } from 'antd';
import { useState } from 'react';
const { Search } = Input;
export default function IndexPage() {
  const [keywords, setKeywords] = useState([]); // 存储所搜索的关键字
  // 每当搜索时，去重存储关键字。
  function onSearch(value, event) {
    if (value === '') {
      return;
    }
    if (keywords.includes(value) === true) {
      return;
    }
    setKeywords([...keywords, value]);
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
