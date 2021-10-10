export function hello(){
    console.log("欢迎");
}
/**
 * ```Javascript
 * child_process_exec_sync("npm config set registry https://registry.npm.taobao.org")
 * ```
 */
export function child_process_exec_sync(cmd){
    let{execSync}=require("child_process");
    return execSync(cmd);
}
/**
 * npm config set registry https://registry.npm.taobao.org
 * 设置npm源的几种方式 - 云+社区 - 腾讯云: https://cloud.tencent.com/developer/article/1588050
 */
export function npm_config_set_regisitry_taobao(){
    return child_process_exec_sync("npm config set registry https://registry.npm.taobao.org");
}
/**
 * npm init -y
 */
export function npm_init_y(){
    // 不存在 ./node_modules
    let{existsSync}=require("fs");
    if(existsSync(`./node_modules/`)===true){return;};
    // npm init -y
    child_process_exec_sync("npm init -y");
}
/**
 * 获取不同操作系统查找命令的程序
 */
export function get_platform_which_command(){
    switch(process.platform){
        case "win32":
            return "where";
        case "android":
            return "which";
        default:
            return "";
    }
}
/**
 * 查找是否存在命令
 * ```JavaScript
 * executable_find("pnpm")
 * ```
 */
export function executable_find(command){
    try{
        return child_process_exec_sync(`${get_platform_which_command()} ${command}`);
    }catch(error){
        return undefined;
    }
}
/**
 * 使用pnpm init -y
 * 强制初始化
 */
export function pnpm_init_y(){
    // npm init -y
    npm_init_y();
    // 确保pnpm命令存在
    if(executable_find("pnpm")===undefined){
        child_process_exec_sync("npm install pnpm -g");
    };
}
/**
 * 安装模块
 * pnpm add module --save-dev
 * ```JavaScript
 * pnpm_add_save_dev("cross-spawn")
 * ```
 */
export function pnpm_add_save_dev(module){
    // 已经添加了模型
    let{existsSync}=require("fs");
    if(existsSync(`./node_modules/${module}`)===true){return;}
    // 确保存在 ./node_modules及pnpm命令
    pnpm_init_y();
    console.log(`将安装模块：${module}`);
    child_process_exec_sync(`pnpm add ${module} --save-dev`);
    console.log(`已安装模块：${module}`);
}
/**
 * 安装与导入模块
 */
export function install_require_module(module){
    pnpm_add_save_dev(module);
    return require(module);
}
/**
 * 获取系统正在运行的程序
 */
export async function get_process_list(){
    return await install_require_module("ps-list")();
}
export async function is_process_live(name){
    let processList=await get_process_list();
    let matched=processList.filter(function(item){
        return item.name===name;
    });
    if(matched.length===0){
        return false;
    }else{
        return true;
    }
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
export function create_crontab_tasks(tasks){
    if(tasks===undefined){return;}
    if(executable_find("crond")===undefined){
        child_process_exec_sync("pkg install cronie -y");
    }
    if(is_process_live("crond")===false){
        child_process_exec_sync("crond");
    }
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
 * 使用termux-notification发送消息到下拉消息栏
 * @param options Object
 * 命令：
 * termux-notification --id "test" --content "内容" --title "标题" --button1-action "termux-open-url https://bing.com" --button1 "必应搜索" --button2-action "am start -a android.settings.BLUETOOTH_SETTINGS" --button2 "设置Bluetooth" --led-color 00A4FF --led-on 500
 * 对应为：
 * ```JavaScript
 * termux_notification({
 *     "--id":"test",
 *     "--content":"内容",
 *     "--title":"标题",
 *     "--button1-action":"termux-open-url https://bing.com",
 *     "--button1":"必应搜索",
 *     "--button2-action":"am start -a android.settings.BLUETOOTH_SETTINGS",
 *     "--button2":"设置Blutetooth",
 *     "--led-color":"00A4FF",
 *     "--led-on":"500"
 * })
 * ```
 * termux-notification命令行支持的参数：
 * ```text
 * termux-notification --help
 * Usage: termux-notification [options]
 * Display a system notification. Content text is specified using -c/--content or read from stdin.
 * Please read --help-actions for help with action arguments.
 *   --action action          action to execute when pressing the notification
 *   --alert-once             do not alert when the notification is edited
 *   --button1 text           text to show on the first notification button
 *   --button1-action action  action to execute on the first notification button
 *   --button2 text           text to show on the second notification button
 *   --button2-action action  action to execute on the second notification button
 *   --button3 text           text to show on the third notification button
 *   --button3-action action  action to execute on the third notification button
 *   -c/--content content     content to show in the notification. Will take
 *                            precedence over stdin. If content is not passed as
 *                            an argument or with stdin, then there will be a 3s delay.
 *   --group group            notification group (notifications with the same
 *                            group are shown together)
 *   -h/--help                show this help
 *   --help-actions           show the help for actions
 *   -i/--id id               notification id (will overwrite any previous notification
 *                            with the same id)
 *   --icon icon-name         set the icon that shows up in the status bar. View
 *                            available icons at https://material.io/resources/icons/
 *                            (default icon: event_note)
 *   --image-path path        absolute path to an image which will be shown in the
 *                            notification
 *   --led-color rrggbb       color of the blinking led as RRGGBB (default: none)
 *   --led-off milliseconds   number of milliseconds for the LED to be off while
 *                            it's flashing (default: 800)
 *   --led-on milliseconds    number of milliseconds for the LED to be on while
 *                            it's flashing (default: 800)
 *   --on-delete action       action to execute when the the notification is cleared
 *   --ongoing                pin the notification
 *   --priority prio          notification priority (high/low/max/min/default)
 *   --sound                  play a sound with the notification
 *   -t/--title title         notification title to show
 *   --vibrate pattern        vibrate pattern, comma separated as in 500,1000,200
 *   --type type              notification style to use (default/media)
 * Media actions (available with --type "media"):
 *   --media-next             action to execute on the media-next button
 *   --media-pause            action to execute on the media-pause button
 *   --media-play             action to execute on the media-play button
 *   --media-previous         action to execute on the media-previous button
 * ```
 */
export function termux_notification(options){
    if(options===undefined){options={};}
    let args=[];
    Object.keys(options).forEach(function(key){
        args.push(key,options[key]);
    });
    if(executable_find("termux-notification")===undefined){
        child_process_exec_sync("pkg install termux-api -y");
    }
    child_process_exec_sync(`termux-notification ${args.join(" ")}`);
}
export function is_file_exists(path){
    return require("fs").existsSync(path);
}
