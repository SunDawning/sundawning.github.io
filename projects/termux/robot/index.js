import{
    install_program,
    start_process
}from"./utility.js";
/**
 * 运行本程序
 */
async function index(){
    install_program("pm2",{program:"pnpm",args:["add","pm2","-g"]},function(){
        // pm2 start tasks.min.js
        start_process({program:"pm2",args:["start","tasks.min.js"]});
    });
}
index();
