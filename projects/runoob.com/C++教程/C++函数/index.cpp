#include <iostream>
#include <string>
int max(int m, int n)
{
    if (m > n)
    {
        return m;
    }
    else
    {
        return n;
    }
}
int main()
{
    int m = 1;
    int n = 2;
    std::string out = "Max value is:" + std::to_string(max(m, n));
    std::cout << out << std::endl;
    getchar();
}
