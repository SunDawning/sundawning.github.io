#include <iostream>
int main()
{
    int a;
    int &r = a;
    std::cout << a << "," << r << std::endl; // 484,484
    getchar();
}
