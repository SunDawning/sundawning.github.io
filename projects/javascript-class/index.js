// JavaScript 进阶教程(1)--面向对象编程_AlbertYang的博客-CSDN博客_js编程: https://blog.csdn.net/qq_23853743/article/details/108034430
// 封装、继承、多态
// 1. 抽象出Class
function Student(name,score){
    this.name=name;
    this.score=score;
}
Student.prototype.printScore=function(){
    console.log("姓名：",this.name,"成绩：",this.score);
};
// 2. 根据Class创建Instance
var student1=new Student("张三",98);
var student2=new Student("李四",81);
// 3. 指挥Instance得结果
student1.printScore();
student2.printScore();
