#include <cstdio>
#include <vector>
int main()
{
    printf("vector\n");
    std::vector<int> vector;
    for (int c = 0; c < 5; c = c + 1)
    {
        vector.push_back(c);
        printf("push_back %d\n", c);
    }
    printf("vector size = %d, begin = %d, end = %d, \n", vector.size(), *vector.begin(), *vector.end());
    for (std::vector<int>::iterator c = vector.begin(); c < vector.end(); c = c + 1)
    {
        printf("vector item: %d\n", *c);
    }
    getchar();
}
