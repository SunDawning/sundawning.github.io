#include <math.h>
#include <vector>
#include <regex>
#include <cstdio>
#include <iostream>
#include <fstream>
#include <filesystem>
#define CPPHTTPLIB_OPENSSL_SUPPORT
#include "./cpp-httplib-v0.10.6/httplib.h"
#include <opencv2/opencv.hpp>
/**
 * @brief 允许跨域访问，CORS，https://www.cnblogs.com/zlingshi/p/15457931.html
 *
 * @param response
 */
void enableCORS(httplib::Response &response)
{
    response.set_header("Access-Control-Allow-Origin", "*");
}
/**
 * @brief 修复printf没有输出的情况
 *
 */
void fixPrintfOutputMissing()
{
    printf("Fix Printf Output Missing\n");
    setvbuf(stdout, NULL, _IONBF, 0);
}
/**
 * @brief 修复中文乱码的情况
 *
 */
void fixChineseCharError()
{
    printf("Fix Chinese char error\n");
    SetConsoleOutputCP(65001);
}
/**
 * @brief https://blog.csdn.net/sinat_41104353/article/details/83149441
 * "foo/bar/a.js" => "foo/bar/"
 * "foo/bar/" => "foo/bar/"
 * "foo/bar" => "foo/"
 * "foo/" => "foo/"
 * "foo" => "foo/"
 *
 */
void createDirectories(std::string path)
{
    std::string::size_type iPos = path.find_last_of('/');
    if (iPos == (path.length() - 1))
    {
        iPos = path.length();
    }
    std::string directory = path.substr(0, iPos);
    std::filesystem::create_directories(directory);
}
/**
 * @brief 图片保存到本地，https://blog.csdn.net/WCvison/article/details/114890035，http://c.biancheng.net/view/302.html
 *
 * @param path
 * @param text
 */
void imageStringToFile(std::string path, std::string text)
{
    createDirectories(path);
    std::ofstream ofs;                //创建流对象  ->往文件里写
    ofs.open(path, std::ios::binary); //打开文件123.txt如果没有会自动创建，
    ofs << text;
    ofs.close(); //关闭文件
}
/**
 * @brief 本地图片读取为字符串，https://github.com/yhirose/cpp-httplib/issues/235
 *
 * @param path
 * @return std::string
 */
std::string imageFileToString(std::string path)
{
    std::ifstream in(path, std::ios::binary);
    std::ostringstream contents;
    contents << in.rdbuf();
    in.close();
    return contents.str();
}
/**
 * @brief 文件是否存在，https://zhuanlan.zhihu.com/p/180501394
 *
 * @param name
 * @return true
 * @return false
 */
bool isFileExists(std::string &name)
{
    std::ifstream f(name.c_str());
    return f.good();
}
/**
 * @brief cv图片保存到本地文件
 *
 * @param path
 * @param mat
 */
void matToFile(std::string path, cv::Mat mat)
{
    createDirectories(path);
    cv::imwrite(path.c_str(), mat);
}
/**
 * @brief 本地文件读取成cv图片
 *
 * @param path
 * @return cv::Mat
 */
cv::Mat fileToMat(std::string path)
{
    auto image = cv::imread(path.c_str(), cv::IMREAD_UNCHANGED);
    return image;
}
int main(void)
{
    fixPrintfOutputMissing();
    fixChineseCharError();

    using namespace httplib;
    Server local_server;
    Client arcgisonline_server("https://server.arcgisonline.com");
    Client local_proxy_server("http://127.0.0.1:27018");
    // enableCORS(local_server);

    local_server.Get(
        R"(/arcgis/rest/services/World_Street_Map/MapServer.*)",
        [&arcgisonline_server, &local_proxy_server](const Request &request, Response &response)
        {
            enableCORS(response);

            std::string path = request.path; // 请求的地址，具有查询字符串。
            // 1. /arcgis/rest/services/World_Street_Map/MapServer?f=json
            if (request.has_param("f"))
            {
                path = path + "?f=" + request.get_param_value("f");
                auto arcgisonline_server_response = arcgisonline_server.Get(path.c_str());
                printf("GET %s\n", path.c_str());
                response.set_content(arcgisonline_server_response->body, arcgisonline_server_response->get_header_value("Content-Type").c_str());
                return;
            }
            // 2. /arcgis/rest/services/World_Street_Map/MapServer/tile/9/256/256
            std::regex regex(R"(/arcgis/rest/services/World_Street_Map/MapServer/tile/(\d+)/(\d+)/(\d+))");
            std::cmatch cmatch;
            bool matched = std::regex_search(path.c_str(), cmatch, regex);
            if (matched)
            {
                printf("GET %s\n", path.c_str());

                std::vector<int>
                    zyx(3);
                for (auto &item : cmatch)
                {
                    zyx.push_back(std::atoi(item.str().c_str()));
                }
                int L_3857 = zyx[4];
                int Y_3857 = zyx[5];
                int X_3857 = zyx[6];
                printf("[L_3857, X_3857, Y_3857] = [%d, %d, %d]\n", L_3857, X_3857, Y_3857);

                int L_offset = 9; // 3857与临港级别之间的偏移，一般是3857第9级对应临港第0级。
                int L_LG = L_3857 - L_offset;
                if (L_LG < 0)
                {
                    return;
                }

                /**
                 * 当前级别一张图片对应的范围
                 * 3857图层的一张图片对应实际的地理范围，在临港图层里用该地理范围，框出得到9张临港的图片。
                 * 先将9张图片合并成一张768*768的图片，再从这张大图片里截取一张该地理范围对应的289*289的图片。
                 */
                double lods_3857[] = {591657527.591555, 295828763.795777, 147914381.897889, 73957190.948944, 36978595.474472, 18489297.737236, 9244648.868618, 4622324.434309, 2311162.217155, 1155581.108577, 577790.554289, 288895.277144, 144447.638572, 72223.819286, 36111.909643, 18055.954822, 9027.977411, 4513.988705, 2256.994353, 1128.497176, 564.248588, 282.124294, 141.062147, 70.5310735};
                double lods_LG[] = {1024000, 512000, 256000, 128000, 64000, 32000, 16000, 8000, 4000, 2000, 1000, 500};

                // 避免超出级别
                if (L_LG > (sizeof(lods_LG) / sizeof(lods_LG[0]) - 1))
                {
                    return;
                }

                double resolution_3857 = (lods_3857[L_3857] * 2.54) / 96 / 100; // 分辨率，每个像素所对应的实际地理距离，单位是米。因为瓦片json里的自带resolution有误差，便重新计算该值。
                double resolution_LG = (lods_LG[L_LG] * 2.54) / 96 / 100;
                double per_3857 = 256 * resolution_3857; // 一张256*256像素的图片所对应的实际地理距离，单位是米
                double per_LG = 256 * resolution_LG;
                double X_LG = (X_3857 * per_3857) / per_LG;
                double Y_LG = (Y_3857 * per_3857) / per_LG;
                int X_LG_floor = floor(X_LG);
                int Y_LG_floor = floor(Y_LG);
                int tile_size_LG = ceil((256 * resolution_3857) / resolution_LG); // 生成的临港图片的大小，该值越大，在3857的网格集里，显示出来的图片就越小，以达到缩放图片的效果。其值为289。
                printf("[L_LG, X_LG, Y_LG] = [%d, %f, %f]\n", L_LG, X_LG, Y_LG);

                /**
                 * @brief 获取转换成标准3857坐标系后的临港影像路径
                 *
                 */
                auto get_tile_LG_3857_path = [](int z, int y, int x)
                {
                    std::string zyx = std::to_string(z) + "/" + std::to_string(y) + "/" + std::to_string(x);
                    std::string path = "services/LG_T520001_HP_TILE_3857/" + zyx + ".png";
                    return path;
                };
                std::string tile_LG_3857_path = get_tile_LG_3857_path(L_3857, Y_3857, X_3857);
                if (isFileExists(tile_LG_3857_path) == true)
                {
                    printf("读取缓存的二次图片 %s\n", tile_LG_3857_path.c_str());
                    auto content = imageFileToString(tile_LG_3857_path);
                    response.set_content(content, "image/png");
                    return;
                }

                auto image = cv::Mat(256 * 3, 256 * 3, CV_8UC4, cv::Scalar(255, 255, 255, 1));
                int blank_image_count = 0; // 请求在线图片时，没有得到图片，为自定义的透明图片。
                auto get_Tile_LG = [&local_proxy_server, &blank_image_count](int z, int x, int y)
                {
                    std::string zyx = std::to_string(z) + "/" + std::to_string(y) + "/" + std::to_string(x);
                    std::string path = "services/LG_T520001_HP_TILE/" + zyx + ".png";
                    if (isFileExists(path) == true)
                    {
                        printf("读取缓存的原始图片 %s\n", path.c_str());
                        return fileToMat(path);
                    }
                    printf("请求在线的原始图片，[%d, %d, %d]\n", z, x, y);
                    auto response = local_proxy_server.Get(("/?url=http://10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer/tile/" + zyx).c_str());
                    if (response.error() == httplib::Error::Success)
                    {

                        imageStringToFile(path, response->body);
                        return fileToMat(path);
                    }
                    auto image = cv::Mat(256, 256, CV_8UC4, cv::Scalar(255, 255, 255, 1));
                    blank_image_count = blank_image_count + 1;
                    return image;
                };
                int tile_width = 256;
                int x_count = 3; // 3*3九宫格，默认是3
                int y_count = 3;
                /**
                 * 只需要四宫格或六宫格即可包含最后截取的区域，减少网络请求，无需九宫格
                 */
                if (256 * (X_LG - X_LG_floor) + tile_size_LG < 256 * 2)
                {
                    x_count = 2;
                }
                if (256 * (Y_LG - Y_LG_floor) + tile_size_LG < 256 * 2)
                {
                    y_count = 2;
                }
                printf("请求原始图片 %d\n", x_count * y_count);
                for (int x = 0; x < x_count; x = x + 1)
                {
                    for (int y = 0; y < y_count; y = y + 1)
                    {
                        auto _image = get_Tile_LG(L_LG, X_LG_floor + x, Y_LG_floor + y);
                        _image.copyTo(image(cv::Rect(tile_width * x, tile_width * y, tile_width, tile_width)));
                    }
                }
                if (blank_image_count == x_count * y_count)
                {
                    printf("blank_image_count %d %d\n", blank_image_count, x_count * y_count);
                    // 一张完全透明图片
                    return;
                }

                cv::Mat image_crop = image(cv::Rect(ceil(256 * (X_LG - X_LG_floor)), ceil(256 * (Y_LG - Y_LG_floor)), tile_size_LG, tile_size_LG));
                matToFile(tile_LG_3857_path, image_crop);

                // cv::imshow("image_crop", image_crop);
                // cv::waitKey(0);

                // std::string content = local_proxy_server_response1->body;
                auto content = imageFileToString(tile_LG_3857_path);
                response.set_content(content, "image/png");
                return;
            }
            // 3. /arcgis/rest/services/World_Street_Map/MapServer
            auto arcgisonline_server_response = arcgisonline_server.Get(path.c_str());
            printf("GET %s\n", path.c_str());
            response.set_content(arcgisonline_server_response->body, arcgisonline_server_response->get_header_value("Content-Type").c_str());
        });
    auto host = "0.0.0.0";
    auto port = 8080;
    printf("Serve on: http://localhost:%d\n", port);
    local_server.listen(host, port);
}
