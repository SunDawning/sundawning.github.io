#include <cstdio>
#include "C:/Users/SunDawning/Downloads/cpp-httplib-0.10.6/httplib.h"
int main()
{
    setvbuf(stdout, NULL, _IONBF, 0);
    printf("Hello, cpp-httplib");
    httplib::Client client("http://cpp-httplib-server.yhirose.repl.co");
    auto response = client.Get("/hi");
    printf("%s", response->body.c_str());
    getchar();
}
