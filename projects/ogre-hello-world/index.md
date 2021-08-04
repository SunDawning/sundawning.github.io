OGRE1.12.5+VS2017+windows项目环境搭建_养成系魔法少女笔记-CSDN博客: https://blog.csdn.net/weixin_44230408/article/details/105136349

出现错误：

0x00007FFA612C4ED9 处(位于 ogre-hello-world.exe 中)有未经处理的异常: Microsoft C++ 异常: Ogre::InternalErrorException，位于内存位置 0x000000B198CFF070 处。

在命令行里程序停在：

Loading library c:/Users/sgs/Downloads/ogre-sdk-v1.12.12-vc15-x64/bin\RenderSystem_Direct3D9.dll

搜索＂ogre RenderSystem_Direct3D9.dll＂时找到
Could not load dynamic library .\RenderSystem_Direct3D9_d.dl - Ogre Addon Forums: https://www.ogre3d.org/addonforums/8/t-6817.html
猜测可能是当前电脑的配置无法使用＂Direct3D9＂，即当前电脑不支持Direct3D9。

在＂plugins.cfg＂里注释掉：

```
# Define plugins
 # Plugin=RenderSystem_Direct3D9
 Plugin=RenderSystem_Direct3D11
```
