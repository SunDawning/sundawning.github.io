// https://www.npmjs.com/package/koa
const koa=require("koa");
const app=new koa();
app.use(function(context){
    context.body="拼";
});
app.listen(8080);
