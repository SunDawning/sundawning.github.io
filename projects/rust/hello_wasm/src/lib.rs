// 编译 Rust 为 WebAssembly - WebAssembly | MDN: https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust_to_wasm
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
#[wasm_bindgen]
extern{
    pub fn alert(s:&str);
}
#[wasm_bindgen]
pub fn greet(name:&str){
    alert(&format!("Hello,{}",name));
}
