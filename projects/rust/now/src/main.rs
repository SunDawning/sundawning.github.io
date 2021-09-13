use print_time::{print_time,now};
fn launch(){
    print_time(format!("{}","程序启动"));
    print_time(format!("当前时间：{}",now()));
}
fn main() {
    launch();
}
