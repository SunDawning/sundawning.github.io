SQLite BASE64 编码与解码

2022-09-05 09:28:07

# 安装

```sh
pnpm add @sundawning/sqlite-base64
```

# 使用

```js
const {
  encode,
  decode,
  encodeRow,
  decodeRow,
} = require("@sundawning/sqlite-base64");
{
  const _encode = encode("拼");
  console.log(`encode("拼")`, _encode);
  console.log(`decode(${_encode})`, decode(_encode));
}
{
  const _encode = encodeRow({ 拼: "音" });
  console.log(`encodeRow({ 拼: "音" })`, _encode);
  console.log(`decodeRow(${JSON.stringify(_encode)})`, decodeRow(_encode));
}
```

执行时：

```js
encode("拼") JUU2JThCJUJD
decode(JUU2JThCJUJD) 拼
encodeRow({ 拼: "音" }) { JUU2JThCJUJD: 'JUU5JTlGJUIz' }
decodeRow({"JUU2JThCJUJD":"JUU5JTlGJUIz"}) { '拼': '音' }
```
