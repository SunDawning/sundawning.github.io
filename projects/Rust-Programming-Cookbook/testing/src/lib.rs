#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
#[derive(Clone)]
struct Node<T>where T:Sized+Clone{
    value:T,
    next:Link<T>
}
impl<T>Node<T>where T:Sized+Clone{
    fn new(value:T)->Rc<RefCell<Node<T>>>{
	Rc::new(RefCell::new(Node{
	    value:value,
	    next:None
	}))
    }
}
type Link<T>=Option<Rc<RefCell<Node<T>>>>;
#[derive(Clone)]
pub struct List<T>where T:Sized+Clone{
    head:Link<T>,
    tail:Link<T>,
    pub length:usize
}
impl<T>List<T>where T:Sized+Clone{
    pub fn new_empty()->List<T>{
	List{
	    head:None,
	    tail:None,
	    length:0
	}
    }
    pub fn append(&mut self,value:T){
	let new=Node::new(value);
	match self.tail.take(){
	    Some(old)=>old.borrow_mut().next=Some(new.clone()),
	    None=>self.head=Some(new.clone())
	}
	self.length+=1;
	self.tail=Some(new);
    }
    pub fn pop(&mut self)->Option<T>{
	self.head.take().map(|head|{
	    if let Some(next)=head.borrow_mut().next.take(){
		self.head=Some(next)
	    }else{
		self.tail.take();
	    }
	    self.length-=1;
	    Rc::try_unwrap(head).ok().expect("出错了").into_inner().value
	})
    }
}

