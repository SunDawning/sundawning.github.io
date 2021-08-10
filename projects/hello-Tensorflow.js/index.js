function minimize(epochs,learningRate){
    // f（x）=x⁶+2x⁴+3x²+ x + 1
    function f(x){
        return x.pow(tf.scalar(6,"int32")).add(
            x.pow(tf.scalar(4,"int32")).mul(tf.scalar(2))
        ).add(
            x.pow(tf.scalar(2,"int32")).mul(tf.scalar(3))
        ).add(
            x
        ).add(
            tf.scalar(1)
        );
    }
    var y=tf.variable(tf.scalar(0));
    var optim=tf.train.adam(learningRate);
    for(var c=0;c<epochs;c=c+1){
        optim.minimize(function(){
            return f(y);
        });
    }
    return y;
}
minimize(100,0.9);
// Tensor
//     -0.16476447880268097


