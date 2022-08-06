index();
async function index() {
  // 复制并更新manifest.json里的版本号
  const manifest_json_file = "manifest.json";
  buildFile(manifest_json_file, function (from_string) {
    const from_json = JSON.parse(from_string);
    // 从package.json里读取version和description
    {
      const package_json_file = "package.json";
      const fs = require("fs");
      const path = require("path");
      const package_json_string = fs.readFileSync(
        path.join(__dirname, package_json_file),
        {
          encoding: "utf-8",
        }
      );
      const package_json = JSON.parse(package_json_string);
      const { version, description } = package_json;
      Object.assign(from_json, {
        version,
        description,
      });
    }
    return JSON.stringify(from_json);
  });
  // 复制文件
  ["README.md", "popup.html"].forEach(function (name) {
    buildFile(name);
  });
  // 混淆js文件
  const JavaScriptObfuscator = require("javascript-obfuscator");
  ["popup.js", "content.js"].forEach(function (name) {
    buildFile(name, function (from_string) {
      const obfuscationResult = JavaScriptObfuscator.obfuscate(from_string, {
        stringArrayEncoding: ["base64", "rc4"],
        stringArrayThreshold: 1,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
        debugProtection: true,
        debugProtectionInterval: true,
        renameGlobals: true, // 重命名函数名
        selfDefending: true,
        unicodeEscapeSequence: true,
      });
      const to_string = obfuscationResult.getObfuscatedCode();
      return to_string;
    });
  });
}
function buildFile(name, onFile) {
  const fs = require("fs");
  const path = require("path");
  const src_directory = path.join(__dirname, "src/");
  const dist_directory = path.join(__dirname, "dist/");
  const from = path.join(src_directory + name);
  const to = path.join(dist_directory, name);
  if (onFile) {
    const from_string = fs.readFileSync(from, { encoding: "utf-8" });
    const to_string = onFile(from_string);
    fs.writeFileSync(to, to_string);
  } else {
    fs.copyFileSync(from, to);
  }
  console.log(from, "=>", to);
}
