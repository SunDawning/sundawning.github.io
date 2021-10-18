/**
 * @see SQLite快速上手 — Node.js小册: https://nodejs.fasionchan.com/zh_CN/latest/database/sqlite/index.html
 */
let sqlite3=require(`sqlite3`).verbose();
let fs=require(`fs`);
let dbFile=`./user.db`;
fs.writeFileSync(dbFile,``);
let db=new sqlite3.Database(dbFile,sqlite3.OPEN_READWRITE,function(error){
    if(error){
        console.log(error);
    }else{
        console.log(`已连接数据库`);
    }
});
db.serialize(function(){
    db.run(`
CREATE TABLE IF NOT EXISTS user(name text)
`, function(error){
    if(error){
        console.log(error);
    }else{
        console.log(`已创建表：user`);
    }
});
    db.run(`
INSERT INTO user(name) VALUES(?)
`,["梅尘"],function(error){
    if(error){
        console.log(error);
    }else{
        console.log(`新增数据：${JSON.stringify(this)}`);
    }
});
    db.all(`
SELECT name From user
WHERE name = ?
`,["梅尘"],function(error,rows){
    if(error){
        console.log(error);
    }else{
        console.log(`查找到数据：${JSON.stringify(rows)}`);
    }
});
});
