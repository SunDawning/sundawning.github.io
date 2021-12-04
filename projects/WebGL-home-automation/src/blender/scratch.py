# Python画字_qq_37473463的博客-CSDN博客: https://blog.csdn.net/qq_37473463/article/details/80804457

import turtle as t 

pensize = 50 #画笔宽度 

t.screensize(400, 300, "#66ccff") 

a = t.window_width() 
b = t.window_height() 

#初始化画笔 
t.pensize(pensize) 
t.pencolor("#FF0000") 
t.penup() 
t.speed(10) 
#画笔宽度初始化 

t.write("你好，世界！",move=False,align='center',font=("微软雅黑",72,'normal')) 
