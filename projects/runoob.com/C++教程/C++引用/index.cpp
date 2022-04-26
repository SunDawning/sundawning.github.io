#include <iostream>
void swap(int &a, int &b)
{
    int c = a;
    a = b;
    b = c;
    return;
}
double vals[] = {1, 2, 3, 4, 5};
double &setValues(int c)
{
    double &reference = vals[c];
    return reference;
};
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
    // 函数返回值是引用
    std::cout << "before: " << vals[2] << std::endl;
    setValues(2) = 10;
    std::cout << "after: " << vals[2] << std::endl;
    getchar();
}
