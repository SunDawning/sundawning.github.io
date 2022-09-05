const { encode, decode, encodeRow, decodeRow } = require("./index");
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
