// 使用carol开发deno桌面程序 － 小专栏: https://xiaozhuanlan.com/topic/2986750431
// deno run --allow-env --allow-run --allow-write --allow-read --allow-net index.js 
import{launch}from "https://deno.land/x/carol/mod.ts";
let app=await launch({
    title:"weather",
    width:800,
    height:600,
});
app.onExit().then(function(){
    Deno.exit(0);
});
