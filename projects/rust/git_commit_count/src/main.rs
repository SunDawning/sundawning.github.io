use print_time::print_time;
fn main() {
    print_time(format!("Welcome to Git Commit Count!"));
    let args="rev-list --all --count".split(" ");
    let current_dir="c:/Users/sgs/AppData/Roaming/literate-programming";
    let command_output=std::process::Command::new("git").args(args).current_dir(current_dir).output().expect("Error: Get git commit count.");
    let command_string=String::from_utf8_lossy(&command_output.stdout);
    let count:u32=command_string.trim().parse().expect("Error: parse.");
    print_time(format!("{}",count));
}
