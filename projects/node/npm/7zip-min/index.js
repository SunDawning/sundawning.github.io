let p7zip=require("7zip-min");
p7zip.pack("index.js","7zip-min.7z",function(error){
    console.log(error);
});
p7zip.pack("package.json","7zip-min.7z",function(error){
    console.log(error);
});
