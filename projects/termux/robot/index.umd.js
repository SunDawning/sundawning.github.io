(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    function hello(){
        console.log("欢迎");
    }
    /**
     * 是否安装了模块
     */
    function is_module_installed(module){
        return require("fs").existsSync(`./node_modules/${module}`);
    }
    /**
     * 安装模块
     * 依赖：
     * - 模块：cross-spawn
     */
    function install_module(module){
        if(is_module_installed(module)===true){return;}
        console.log(`将安装模块：${module}`);
        require("cross-spawn").sync("pnpm",["add",module,"--save-dev"]);
        console.log(`已安装模块：${module}`);
    }
    /**
     * 安装与导入模块
     */
    function install_require_module(module){
        install_module(module);
        return require(module);
    }
    /**
     * 获取系统正在运行的程序
     */
    async function get_process_list(){
        return await install_require_module("ps-list")();
    }
    /**
     * 后台运行系统程序
     * 依赖：
     * - 模块：cross-spawn
     * ```JavaScript
     * start_process({program:"sshd",args:["-p","8022"]});
     * ```
     * @param options Object https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
     */
    function start_process(cmd,options){
        console.log(`启动程序：${cmd.program}`);
        return require("cross-spawn")(cmd.program,cmd.args,options);
    }
    function start_process_sync(cmd,options){
        console.log(`启动程序：${cmd.program}`);
        return require("cross-spawn").sync(cmd.program,cmd.args,options);
    }
    /**
     * 安装程序
     * ```JavaScript
     * install_program("crontab",{program:"pkg",args:["install","cronie","-y"]});
     * ```
     */
    function install_program(name,cmd,onInstall){
        install_require_module("which")(name,function(error,resolvePath){
            if(error){
                console.log(`未安装程序：${name}`);
                console.log(`将安装程序：${name}`);
                start_process_sync(cmd);
            }
            if(onInstall){onInstall();}
        });
    }
    /**
     * 后台启动一些程序
     * @param processes Object
     * ```JavaScript
     * start_processes({
     *     "crond":{cmd:{program:"crond",args:[]},install:{program:"pkg",args:["install","cronie","-y"]}},
     *     "sshd":{cmd:{program:"sshd",args:["-p","8022"]},install:{program:"pkg",args:["install","openssh","-y"]}}
     * })
     * ```
     */
    async function start_processes(processes){
        if(processes===undefined){return;}
        let processList=await get_process_list();
        Object.keys(processes).forEach(function(name){
            let matched=processList.filter(function(item){
                return item.name===name;
            });
            if(matched.length===0){
                install_program(name,processes[name].install,function(){
                    start_process(processes[name].cmd);
                });
            }else {
                console.log(`已启动程序：${name}`);
            }
        });
    }
    /**
     * 添加crontab定时任务
     * 依赖：
     * - crontab终端命令
     * - crontab模块
     * ```JavaScript
     * create_crontab_tasks([
     *     ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
     *     ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
     * ]);
     * ```
     */
    async function create_crontab_tasks(tasks){
        if(tasks===undefined){return;}
        await start_processes({
            "crond":{cmd:{program:"crond",args:[]},install:{program:"pkg",args:["install","cronie","-y"]}},
        });
        install_require_module("crontab").load(function(error,crontab){
            // 空白的crontab
            if(crontab===null){
                create_crontab_tasks(tasks);
                return;
            }
            let crontabList=crontab.jobs().map(function(job){return job.toString();});
            tasks.forEach(function(item){
                if(crontabList.includes(item.join(" "))===true){return;}
                crontab.create(item[1],item[0]);
                console.log("创建任务：",item[0],item[1]);
            });
            crontab.save();
        });
    }

    /**
     * 运行本程序
     * 依赖：
     * - 模块：cross-spawn
     */
    async function index(){
        hello();
        install_program("pm2",{program:"pnpm",args:["add","pm2","-g"]},function(){
            start_processes({
                "mysqld":{cmd:{program:"pm2",args:["start","mysqld"]},install:{program:"pkg",args:["install","mariadb","-y"]}},
            });
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

})));
