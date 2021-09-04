use std::io;
use rand::Rng;
use std::cmp::Ordering;
fn main() {
    println!("开始猜数字游戏");
    let secret_number=rand::thread_rng().gen_range(1..101);
    println!("密码是：{}",secret_number);
    loop{
	println!("请输入任意一个数字");
	let mut guess=String::new();
	io::stdin().read_line(&mut guess).expect("无法读取当前输入");
	let guess:u32=guess.trim().parse().expect("无法处理当前的输入");
	println!("已输入数字：{}",guess);
	match guess.cmp(&secret_number){
	    Ordering::Less=>println!("猜小了"),
	    Ordering::Greater=>println!("猜大了"),
	    Ordering::Equal=>{
		println!("猜对了");
		break;
	    },
	}
    }
}
