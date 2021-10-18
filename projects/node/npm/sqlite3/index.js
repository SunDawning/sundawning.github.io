/**
 * @see SQLite快速上手 — Node.js小册: https://nodejs.fasionchan.com/zh_CN/latest/database/sqlite/index.html
 */
let sqlite3=require("sqlite3").verbose();
let fs=require("fs");
let dbFile="./user.db";
if(fs.existsSync(dbFile)===false){
    fs.writeFileSync(dbFile,"");
};
let db=new sqlite3.Database(dbFile,sqlite3.OPEN_READWRITE,function(error){
    if(error){
        console.log(error);
    }else{
        console.log("已连接数据库");
    }
});
db.run(`
CREATE TABLE IF NOT EXISTS user(name text)
`,
       function(error){
           if(error){
               console.log(error);               
           }else{
               console.log("已创建表：user");
           }
       });
