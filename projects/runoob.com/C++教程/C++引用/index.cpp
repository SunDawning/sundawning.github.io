#include <iostream>
void swap(int &a, int &b)
{
    int c = a;
    a = b;
    b = c;
    return;
}
int main()
{
    double a;
    a = 1.5;
    double &r = a;
    std::cout << a << "," << r << std::endl; // 1.5,1.5
    r = 0.5;
    std::cout << a << "," << r << std::endl; // 0.5,0.5
    int c = 1;
    int d = 2;
    std::cout << "before: " << c << ',' << d << std::endl;
    swap(c, d);
    std::cout << "after: " << c << ',' << d << std::endl;
    getchar();
}
