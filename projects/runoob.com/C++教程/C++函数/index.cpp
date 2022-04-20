#include <iostream>
#include <string>
#include "max.cpp"
void print(std::string out)
{
    std::cout << out << std::endl;
}
template <class T>
void prints(T &list)
{
    int total = sizeof(list) / sizeof(list[0]);
    for (int c = 0; c < total; c = c + 2)
    {
        int m = list[c];
        int n = list[c + 1];
        print(std::to_string(m) + std::to_string(n) + std::to_string(max(m, n)));
    }
}
int main()
{
    int list[] = {1, 2, 4, 3};
    prints(list);
    getchar();
}
