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
void print(std::string out)
{
    std::cout << out << std::endl;
}
int main()
{
    int list[4] = {1, 2, 4, 3};
    for (int c = 0; c < 3; c = c + 2)
    {
        int m = list[c];
        int n = list[c + 1];
        print(std::to_string(m) + std::to_string(n) + std::to_string(max(m, n)));
    }
    getchar();
}
