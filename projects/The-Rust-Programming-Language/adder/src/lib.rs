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
