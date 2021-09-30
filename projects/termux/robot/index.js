import{
    hello,
    install_program,
    start_processes,
    create_crontab_tasks,
    start_process
}from"./utility.js";
/**
 * 运行本程序
 */
async function index(){
    hello();
    install_program("pm2",{program:"pnpm",args:["add","pm2","-g"]},function(){
        // pm2 start mysqld
        start_processes({
            "mysqld":{cmd:{program:"pm2",args:["start","mysqld"]},install:{program:"pkg",args:["install","mariadb","-y"]}},
        });
        // pm2 start koa.min.js
        start_process({program:"pm2",args:["start","koa.min.js"]});
    });
    await start_processes({
        "sshd":{cmd:{program:"sshd",args:["-p","8022"]},install:{program:"pkg",args:["install","openssh","-y"]}}
    });
    await create_crontab_tasks([
        ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
        ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
    ]);
}
index();
