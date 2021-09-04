use std::io;
use rand::Rng;
fn main() {
    println!("开始猜数字游戏");
    let secret_number=rand::thread_rng().gen_range(1..101);
    println!("密码是：{}",secret_number);
    println!("请输入任意一个数字");
    let mut guess=String::new();
    io::stdin().read_line(&mut guess).expect("无法读取当前输入");
    println!("已输入数字：{}",guess);
}
