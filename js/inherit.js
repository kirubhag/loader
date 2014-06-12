function inherit(baseClass){
	function inheritance(){};
	inheritance.prototype=baseClass;
	return new inheritance();
}