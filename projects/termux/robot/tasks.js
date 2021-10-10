import{
    hello,
    install_program,
    start_processes,
    create_crontab_tasks,
    start_process,
}from"./utility.js";
async function index(){
    hello();
    // pm2 start mysqld
    start_processes({
        "mysqld":{cmd:{program:"pm2",args:["start","mysqld"]},install:{program:"pkg",args:["install","mariadb","-y"]}},
    });
    // pm2 start koa.min.js
    start_process({program:"pm2",args:["start","koa.min.js"]});
    // sshd -p 8022
    await start_processes({
        "sshd":{cmd:{program:"sshd",args:["-p","8022"]},install:{program:"pkg",args:["install","openssh","-y"]}}
    });
    // crond
    await create_crontab_tasks([
        ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
        ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
    ]);
}
index();
