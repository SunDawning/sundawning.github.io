#include "./include/opencv2/opencv.hpp"
int main()
{
    using namespace cv;
    Mat image = imread("./index.png");
    imshow("image", image);
    waitKey(0);
}

// g++ - g index.cpp - o index.exe - I "./include" - L "C:/msys64/mingw64/lib/opencv4" - l opencv_core - l opencv_imgcodecs
