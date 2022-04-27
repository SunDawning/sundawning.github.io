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

### `cv::imread(std::\_\_cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > const&, int)'

```
g++ -g index.cpp -o index.exe -I "./include"
C:/msys64/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/11.2.0/../../../../x86_64-w64-mingw32/bin/ld.exe: C:\Users\SUNDAW~1\AppData\Local\Temp\ccU9P7qJ.o:C:\Users\SunDawning\Downloads\gitee.com\sundawning\sundawning.gitee.io\projects\opencv\hello/index.cpp:5: undefined reference to `cv::imread(std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > const&, int)'

C:/msys64/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/11.2.0/../../../../x86_64-w64-mingw32/bin/ld.exe: C:\Users\SUNDAW~1\AppData\Local\Temp\ccU9P7qJ.o: in function `main':
C:\Users\SunDawning\Downloads\gitee.com\sundawning\sundawning.gitee.io\projects\opencv\hello/index.cpp:6: undefined reference to `cv::Mat::~Mat()'
collect2.exe: error: ld returned 1 exit status
```

https://blog.csdn.net/qq_29695701/article/details/89213984

```sh
g++ -g index.cpp -o index.exe -I "./include" -D_GLIBCXX_USE_CXX11_ABI=0
```

### `cv::imread(std::string const&, int)'

```
g++ -g index.cpp -o index.exe -I "./include" -D_GLIBCXX_USE_CXX11_ABI=0
C:/msys64/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/11.2.0/../../../../x86_64-w64-mingw32/bin/ld.exe: C:\Users\SUNDAW~1\AppData\Local\Temp\cc4W8Dn1.o:C:\Users\SunDawning\Downloads\gitee.com\sundawning\sundawning.gitee.io\projects\opencv\hello/index.cpp:5: undefined reference to `cv::imread(std::string const&, int)'
C:/msys64/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/11.2.0/../../../../x86_64-w64-mingw32/bin/ld.exe: C:\Users\SUNDAW~1\AppData\Local\Temp\cc4W8Dn1.o: in function `main':
C:\Users\SunDawning\Downloads\gitee.com\sundawning\sundawning.gitee.io\projects\opencv\hello/index.cpp:6: undefined reference to `cv::Mat::~Mat()'
collect2.exe: error: ld returned 1 exit status
```

https://blog.csdn.net/KKKiwiXU/article/details/115872573

```sh
g++ -g index.cpp -o index.exe -I "./include" -D_GLIBCXX_USE_CXX11_ABI=1
```

这个问题与已经存在的另一个问题相悖
