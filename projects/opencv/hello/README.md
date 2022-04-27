创建示例程序

# 探索

## 生成 exe

```sh
g++ -g index.cpp -o index.exe -I "./include"
```

## include

```sh
pnpm install symlink-dir -g
```

```sh
symlink-dir C:/Users/SunDawning/Downloads/opencv/build/include/opencv2 include/opencv2
```

## 问题

### fatal error: opencv2/core/core.hpp: No such file or directory

```
g++ -g index.cpp -o index.exe -I C:\Users\SunDawning\Downloads\opencv\build\include\opencv2
index.cpp:1:10: fatal error: opencv2/core/core.hpp: No such file or directory
    1 | #include <opencv2/core/core.hpp>
      |          ^~~~~~~~~~~~~~~~~~~~~~~
compilation terminated.
```

需要改为“C:\Users\SunDawning\Downloads\opencv\build\include”

类似的还有如下的操作：

```
g++ -g index.cpp -o index.exe -I "./opencv2"
In file included from index.cpp:1:
./opencv2/opencv.hpp:48:10: fatal error: opencv2/opencv_modules.hpp: No such file or directory
   48 | #include "opencv2/opencv_modules.hpp"
      |          ^~~~~~~~~~~~~~~~~~~~~~~~~~~~
compilation terminated.
```

### fatal error: opencv2/core.hpp: No such file or directory

```
g++ -g index.cpp -o index.exe
In file included from index.cpp:1:
./opencv2/core/core.hpp:48:10: fatal error: opencv2/core.hpp: No such file or directory
   48 | #include "opencv2/core.hpp"
      |          ^~~~~~~~~~~~~~~~~~
compilation terminated.
```

### undefined reference to `WinMain'

```
g++ -g index.cpp -o index.exe -I "./include"
C:/msys64/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/11.2.0/../../../../x86_64-w64-mingw32/bin/ld.exe: C:/msys64/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/11.2.0/../../../../lib/libmingw32.a(lib64_libmingw32_a-crt0_c.o): in function `main':
C:/M/mingw-w64-crt-git/src/mingw-w64/mingw-w64-crt/crt/crt0_c.c:18: undefined reference to `WinMain'
collect2.exe: error: ld returned 1 exit status
```

生成 exe 时 cpp 文件里需要有 main 函数
