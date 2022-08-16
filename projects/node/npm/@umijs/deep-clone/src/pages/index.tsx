import styles from './index.less';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import Table from './components/Table';

export default function IndexPage() {
  const [dataBase, setDataBase] = useState(initialDataBase);
  useEffect(
    function () {
      console.log('dataBase', dataBase);
    },
    [dataBase],
  );
  return (
    <div>
      <h1 className={styles.title}>{dataBase.title}</h1>
      <Form dataBase={dataBase} setDataBase={setDataBase}></Form>
      <Table dataBase={dataBase} setDataBase={setDataBase}></Table>
    </div>
  );
}
// 初始的数据库
const initialDataBase = {
  title: 'Page index',
  table: {
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ],
    dataSource: [
      {
        key: '0',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '1',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ],
  },
};
function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  function setMergeState(newState) {
    console.log(deepClone, newState);
    return setState(function (prevState) {
      return Object.assign({}, prevState, newState);
    });
  }
  return [state, setMergeState];
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
