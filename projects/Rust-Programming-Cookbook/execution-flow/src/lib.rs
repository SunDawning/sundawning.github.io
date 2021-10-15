#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
    #[test]
    fn 条件句(){
        let i=20;
        if i<2{
            assert!(i<2);
        }else if i>2{
            assert!(i>2);
        }else{
            assert_eq!(i,2);
        }
    }
}
