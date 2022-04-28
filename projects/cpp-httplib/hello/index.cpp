#include <cstdio>
#include "C:/Users/SunDawning/Downloads/cpp-httplib-0.10.6/httplib.h"
/**
 * @brief 修复printf没有输出的情况
 *
 */
void fixPrintfOutputMissing()
{
    printf("Fix Print Output Missing\n");
    setvbuf(stdout, NULL, _IONBF, 0);
}
/**
 * @brief 修复中文乱码的情况
 *
 */
void fixChineseCharError()
{
    printf("Fix Chinese char error\n");
    SetConsoleOutputCP(65001);
}
int main()
{
    printf("Setting Program Environment\n");
    fflush(stdout);
    fixPrintfOutputMissing();
    fixChineseCharError();
    printf("进入程序\n");
    httplib::Client client("http://cpp-httplib-server.yhirose.repl.co");
    auto response = client.Get("/hi");
    printf("返回数据\n");
    printf("%s\n", response->body.c_str());
    getchar();
}
