use std::io;
fn main() {
    println!("开始猜数字游戏");
    println!("请输入任意一个数字");
    let mut guess=String::new();
    io::stdin().read_line(&mut guess).expect("无法读取当前输入");
    println!("已输入数字：{}",guess);
}
