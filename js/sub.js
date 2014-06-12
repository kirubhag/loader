var subclass={
	test:function(baseClass){
		return inherit(baseClass);
	}
};

var obj=subclass.test(Student);
