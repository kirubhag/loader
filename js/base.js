var Student={
	name:"Kirubha",
	age:23,
	designation:"Software Engineer",
	place:"Chennai",
	ug:function(){
		var ug_degree=inherit(department);
		return ug_degree.ug.BSC.BSC_1;
	}(),
	pg:null,
	setter:function(name,age,designation,place){
		this.name=name;
		this.age=age;
		this.designation=designation;
		this.place=place;
	},
	getter:function(){
		console.log("Name: "+this.name+" Age: "+this.age+" Designation: "+this.designation+" Place: "+this.place+" UG: "+this.ug+" PG: "+this.pg);
	}
};

//Call it from console.
//that will assign pg value to pg object of a student
/*
Student.pg=function(){
var dep=inherit(department);
return dep.pg.MCA;
}();*/