#include <cstdio>
#include "C:/Users/SunDawning/Downloads/cpp-httplib-0.10.6/httplib.h"
int main()
{
    printf("Hello, cpp-httplib\n");
    httplib::Client client("http://cpp-httplib-server.yhirose.repl.co");
    auto response = client.Get("/hi");
    printf("%s", response->body);
}
