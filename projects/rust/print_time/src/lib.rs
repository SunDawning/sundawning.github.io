extern crate chrono;
/**
 * rust - Format std::time output - Stack Overflow: https://stackoverflow.com/questions/38957718/format-stdtime-output
 * https://crates.io/crates/chrono
 * format in std - Rust: https://doc.rust-lang.org/std/macro.format.html
 * 关于rust：将本地字符串作为切片返回(＆str) | 码农家园: https://www.codenong.com/29428227/
 * chrono::format::strftime - Rust: https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html#specifiers
 */
fn now()->String{
    return format!("{}",chrono::Local::now().format("%Y-%m-%d %H:%M:%S%.3f"));
}
/**
 * Rust 输出到命令行 | 菜鸟教程: https://www.runoob.com/rust/rust-println.html
 */
pub fn print_time(string:String){
    println!("[{}] {}",now(),string);
}
