fn main() {
    println!("下面开始显示几行内容：");
    println!();
    println!("欢迎你进入Rust的世界");
    println!("再次欢迎{}进入{}的世界","你","Rust");
    print!("Rust世界欢迎");
    println!("你");
    // 更多组合
    println!("根据位置：{1},{0}；{0},{1}。","Rust","世界");
    println!("别名：name={name},place={place}",name="Rust",place="世界");
    println!("数字PI的值是{0:.100}，{0:.2}",std::f64::consts::PI);
    println!("更多数字：{0:>0距离$}={0:>距离$}={0:#x}",1535,距离=6);
    use std::io::{self,Write};
    let _=write!(&mut io::stdout(),"写入数据流");
    println!();
    println!("输入你的名字：");
    let mut input=String::new();
    if let Ok(n)=std::io::stdin().read_line(&mut input){
        println!("欢迎你，{}({}bytes)",input,n);
    }else{
        eprintln!("出错了：");
    }
}
