#[cfg(test)]
mod tests {
    #[test]
    fn 一些数学计算(){
	assert_eq!(2+2,4);
	assert_eq!(3.14+22.86,26_f32);
	assert_eq!(2_i32.pow(2),4);
	assert_eq!(4_f32.sqrt(),2_f32);
	let a:u64=32;
	let b:u64=64;
	assert_eq!(b-a,32);
	assert_eq!(a.overflowing_sub(b),(18446744073709551584,true));
	let mut c=100;
	c+=1;
	assert_eq!(c,101);
    }
}
