import { Space, Form, Input, Button } from 'antd';
const { Item } = Form;
export default function IndexPage({ dataBase, setDataBase }) {
  const [form] = Form.useForm();
  function onChangeTitle(event) {
    dataBase.title = event.target.value;
    // console.log('dataBase', dataBase);
    setDataBase({ ...dataBase });
  }
  function onClickToAddColumn() {
    dataBase.table.columns.push({
      title: '操作',
      dataIndex: 'operation',
      render: function (_, record) {
        function onClickDeleteRow() {
          const dataSource = [...dataBase.table.dataSource];
          let index = dataSource.indexOf(record);
          dataSource.splice(index, 1);
          dataBase.table.dataSource = [...dataSource];
          setDataBase({ ...dataBase });
        }
        return (
          <Button type="link" onClick={onClickDeleteRow}>
            Delete
          </Button>
        );
      },
    });
    dataBase.table.columns = [...dataBase.table.columns]; // 复制数组
    setDataBase({ ...dataBase });
  }
  function onClickToRemoveColumn() {
    dataBase.table.columns.pop();
    dataBase.table.columns = [...dataBase.table.columns]; // 复制数据
    setDataBase({ ...dataBase });
  }
  function onClickToEditableRow() {
    dataBase.table.dataSource.push({
      key:
        dataBase.table.dataSource[dataBase.table.dataSource.length - 1].key + 1,
      name: <Input defaultValue={dataBase.table.dataSource.length}></Input>,
      age: dataBase.table.dataSource.length,
      address: '西湖区湖底公园1号',
    });
    dataBase.table.dataSource = [...dataBase.table.dataSource];
    setDataBase({ ...dataBase });
  }
  return (
    <Form form={form}>
      <Space>
        <Item label="标题" name="title">
          <Input onChange={onChangeTitle}></Input>
        </Item>
        <Item>
          <Button onClick={onClickToAddColumn}>增加一列</Button>
        </Item>
        <Item>
          <Button onClick={onClickToRemoveColumn}>删除一列</Button>
        </Item>
        <Item>
          <Button onClick={onClickToEditableRow}>增加可编辑行</Button>
        </Item>
      </Space>
    </Form>
  );
}
/**
 * 版权声明：本文为CSDN博主「码飞_CC」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
 * 原文链接：https://blog.csdn.net/cc18868876837/article/details/114918262
 */
function deepClone(target) {
  const map = new WeakMap();
  function isObject(target) {
    return (
      (typeof target === 'object' && target) || typeof target === 'function'
    );
  }
  function clone(data) {
    if (!isObject(data)) {
      return data;
    }
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }
    if (typeof data === 'function') {
      // return;
      return new Function('return ' + data.toString())();
    }
    const exist = map.get(data);
    if (exist) {
      return exist;
    }
    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }
    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach((val) => {
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }
    const keys = Reflect.ownKeys(data);
    const allDesc = Object.getOwnPropertyDescriptors(data);
    const result = Object.create(Object.getPrototypeOf(data), allDesc);
    map.set(data, result);
    keys.forEach((key) => {
      const val = data[key];
      if (isObject(val)) {
        result[key] = clone(val);
      } else {
        result[key] = val;
      }
    });
    return result;
  }
  return clone(target);
}
