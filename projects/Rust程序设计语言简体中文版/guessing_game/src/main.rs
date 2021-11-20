fn main() {
    println!("已进入猜数字游戏");
    println!("你先猜一个数字：");
    // "1"
    let mut guessed_number = String::new();
    std::io::stdin()
        .read_line(&mut guessed_number)
        .expect("无法获取所猜的数字");
    println!("你猜的数字是：{}", guessed_number);
}
