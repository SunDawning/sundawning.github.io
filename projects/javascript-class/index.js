// 封装、继承、多态

var student1={name:"张三",score:98};
var student2={name:"李四",score:81};
function printScore(student){
    console.log("姓名：",student.name,"成绩：",student.score);
}
printScore(student1);
printScore(student2);
