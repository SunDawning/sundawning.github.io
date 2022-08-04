使用 C++编写的中间服务器

基于 cpp-httplib-v0.10.6 和 OpenCV-MinGW-Build-OpenCV-4.5.5-x64

# 安装

1. 下载或链接
   cpp-httplib-v0.10.6 和 OpenCV-MinGW-Build-OpenCV-4.5.5-x64 到当前文件夹
2. pnpm install

# 运行

```sh
pnpm run start
# http://localhost:8080
```

# 探索

## cpp-httplib CORS

2022-04-29 09:57:37

## 生成 exe

```sh
g++ -g index.cpp -I "C:/Users/jobsimi/Documents/tuihuiinfo/github.com/yhirose/cpp-httplib/cpp-httplib-v0.10.6" -o ./build/index.exe -l ws2_32 -l wsock32 -l libssl -l libcrypto -l crypt32
```

## 启动

```sh
./build/index.exe
# http://localhost:8080
```

## 问题

### what(): 'https' scheme is not supported.

访问 https 时出错

```
terminate called after throwing an instance of 'std::invalid_argument'
  what():  'https' scheme is not supported.
```

### undefined reference to `\_\_imp_CertOpenSystemStoreW'

```
undefined reference to `__imp_CertOpenSystemStoreW'
```

```
link to advapi32.lib and/or crypt32.lib
```

https://social.msdn.microsoft.com/forums/en-US/b0faf4bc-5949-409c-aaf8-c5541710a4b6/using-wincrypth

imp_CertOpenSystemStoreW => https://docs.microsoft.com/en-us/windows/win32/api/wincrypt/nf-wincrypt-certopensystemstorew => wincrypt.h

### 查询字符串

https://techoverflow.net/2022/02/13/cpp-httplib-how-to-get-query-parameters/

### 打包成 exe 在其他电脑上运行时缺失 dll

2022-08-04 11:13:01

复制
C:/msys64/mingw64/bin
文件夹下相应缺失的 dll
到 build 文件夹
