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

function Person(name,age){
    this.name=name;
    this.age=age;
    this.type="学生";
    this.sayName=function(){
        console.log(this.name);
    };
}
var person1=new Person("张三",18);
var person2=new Person("李四",16);
person1.sayName();
person2.sayName();
console.log("person1.constructor",person1.constructor);
console.log("person1.constructor===Person",person1.constructor===Person);
console.log("person1 instanceof Person",person1 instanceof Person);
console.log("person1.sayName===person2.sayName",person1.sayName===person2.sayName);

