// 编译 Rust 为 WebAssembly - WebAssembly | MDN: https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust_to_wasm
const js = import("../pkg/hello_wasm.js");
js.then(js => {
    js.greet("WebAssembly");
});
