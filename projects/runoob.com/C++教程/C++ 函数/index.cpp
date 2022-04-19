#include <iostream>
#include <string>
int main()
{
    int m = 1;
    int n = 2;
    std::string out = "Max value is:" + std::to_string(m) + std::to_string(n);
    std::cout << out << std::endl;
    getchar();
}
