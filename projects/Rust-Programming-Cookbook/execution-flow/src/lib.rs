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
    #[test]
    fn 更多条件句(){
        let 选项一=Some(10);
        if let Some(unpacked)=选项一{
            assert_eq!(unpacked,10);
        }
        let mut 选项二=Some(2);
        while let Some(unpacked)=选项二{
            选项二=if unpacked>0{
                Some(unpacked-1)
            }else{
                None
            }
        }
        assert_eq!(选项二,None);
    }
}
