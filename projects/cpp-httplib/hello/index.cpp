#include <cstdio>
#include "C:/Users/SunDawning/Downloads/cpp-httplib-0.10.6/httplib.h"
int main()
{
    setvbuf(stdout, NULL, _IONBF, 0);
    SetConsoleOutputCP(65001);
    printf("Hello, cpp-httplib\n");
    httplib::Client client("http://cpp-httplib-server.yhirose.repl.co");
    auto response = client.Get("/hi");
    printf("返回数据\n");
    printf("%s\n", response->body.c_str());
    getchar();
}
