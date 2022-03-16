{
    let[x,y]=[100,100];
    let[x1,y1]=[10,10];
    let theta=30;
    let radian=theta*Math.PI/180;
    console.log(
        [
            x+x1*Math.cos(radian)-y1*Math.sin(radian),
            y+x1*Math.sin(radian)+y1*Math.cos(radian)
        ]
    );
}
