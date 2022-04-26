#include <iostream>
int main()
{
    double a;
    a = 1.5;
    double &r = a;
    std::cout << a << "," << r << std::endl; // 1.5,1.5
    r = 0.5;
    std::cout << a << "," << r << std::endl; // 0.5,0.5
    getchar();
}
