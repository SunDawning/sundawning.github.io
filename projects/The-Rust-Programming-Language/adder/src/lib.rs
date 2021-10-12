#[cfg(test)]
mod 测试 {
    #[test]
    fn 探索() {
        assert_eq!(2 + 2, 4);
    }
    #[test]
    fn 故意让测试失败(){
	panic!("");
    }
}
#[derive(Debug)]
struct 矩形{
    宽:u32,
    高:u32
}
impl 矩形{
    fn 是否包含了(&self,另一个:&矩形)->bool{
	self.宽>另一个.宽&&self.高>另一个.高
    }
}
