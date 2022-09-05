module.exports = {
  encode,
  decode,
  encodeRow,
  decodeRow,
  encodeTable,
  decodeTable,
};

function encode(value) {
  // console.log("value", value);
  return btoa(encodeURIComponent(value)).replaceAll("=", "_");
}
function decode(value) {
  return decodeURIComponent(atob(value.replaceAll("_", "=")));
}
/**
 * 编码
 * @param {object} row
 * @returns
 * @example
 * encode({a:btoa})
 * {YQ==: 'ZnVuY3Rpb24gYnRvYSgpIHsgW25hdGl2ZSBjb2RlXSB9'}
 */
function encodeRow(row) {
  Object.keys(row).forEach(function (key) {
    if (key === "key") {
      return;
    }
    row[encode(key)] = encode(row[key]);
    delete row[key];
  });
  return row;
}
/**
 * 解码
 * @param {object} row
 * @returns
 * @example
 * decode({YQ==: 'ZnVuY3Rpb24gYnRvYSgpIHsgW25hdGl2ZSBjb2RlXSB9'})
 * {a: 'function btoa() { [native code] }'}
 */
function decodeRow(row) {
  Object.keys(row).forEach(function (key) {
    if (key === "key") {
      return;
    }
    row[decode(key)] = decode(row[key]);
    delete row[key];
  });
  return row;
}
/**
 * 编码整张表
 */
async function encodeTable({ database, table_name }) {
  const rows = await selects({ database, table_name, decoded: false });
  // console.log(rows);
  const template_table_name = `tmp_${table_name}`;
  await database.exec(
    `ALTER TABLE ${table_name} RENAME TO ${template_table_name}`
  );
  try {
    for (let c = 0; c < rows.length; c = c + 1) {
      const row = rows[c];
      // console.log("row");
      await insert({ database, table_name, row, encoded: true });
    }
    await database.exec(`DROP TABLE tmp_${table_name}`);
  } catch (error) {
    await database.exec(`DROP TABLE ${table_name}`);
    await database.exec(
      `ALTER TABLE ${template_table_name} RENAME TO ${table_name}`
    );
    console.error(error);
  }
}
/**
 * 解码整张表
 */
async function decodeTable({ database, table_name }) {
  const rows = await selects({ database, table_name, decoded: true });
  const template_table_name = `tmp_${table_name}`;
  await database.exec(
    `ALTER TABLE ${table_name} RENAME TO ${template_table_name}`
  );
  try {
    for (let c = 0; c < rows.length; c = c + 1) {
      const row = rows[c];
      // console.log("row");
      await insert({ database, table_name, row, encoded: false });
    }
    await database.exec(`DROP TABLE tmp_${table_name}`);
  } catch (error) {
    await database.exec(`DROP TABLE ${table_name}`);
    await database.exec(
      `ALTER TABLE ${template_table_name} RENAME TO ${table_name}`
    );
    console.error(error);
  }
}
