import{
    hello,
    create_crontab_tasks,
}from"./utility.js";
hello();
// crond
create_crontab_tasks([
    ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
    ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
]);
