import { useState } from 'react';
import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
/**
 * 使用Antd创建的示例界面
 */
export default function IndexPage() {
  const [date, setDate] = useState(null);
  function onChange(value) {
    message.info(
      `选择的日期是：${value ? value.format('YYYY年MM月DD日') : '未选择'}`,
    );
    setDate(value);
  }
  return (
    <div>
      <DatePicker onChange={onChange}></DatePicker>
      <div>当前日期：{date ? date.format('YYYY年MM月DD日') : '未选择'}</div>
    </div>
  );
}
