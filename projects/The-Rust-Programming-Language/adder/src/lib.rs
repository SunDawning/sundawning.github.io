#[cfg(test)]
mod 测试 {
    use super::*;
    #[test]
    fn 大矩形能包含小矩形(){
	let 大矩形=矩形{宽:10,高:10};
	let 小矩形=矩形{宽:5,高:5};
	assert!(大矩形.能否包含(&小矩形));
    }
}
#[derive(Debug)]
struct 矩形{
    宽:u32,
    高:u32
}
impl 矩形{
    fn 能否包含(&self,另一个:&矩形)->bool{
	self.宽>另一个.宽&&self.高>另一个.高
    }
}
