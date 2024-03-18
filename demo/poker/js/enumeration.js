//返回枚举对象 params 键值对
function enumeration(namesToValues){
	var enumeration = function(){ throw "Can't Instraniate Enumeration";};//指定不能二次被继承，即不能通过该构造函数创建新对象

	//枚举值继承该对象
	var proto = enumeration.prototype = {
		constructor : enumeration,//标识类型
		toString : function(){ return this.name;},//返回名字
		valueOf : function(){ return this.value;},//返回值
		toJSON : function(){ return this.name;}//转换为json
	};

	enumeration.values = [];//存放枚举对象的数组
	//创建新类型的实例
	for (name in namesToValues) {
		var e = inherit(proto);
		e.name = name;
		e.value = namesToValues[name];
		enumeration[name] = e;
		enumeration.values.push(e);
	};

	enumeration.foreach = function(f,c){
		for (var i = 0; i < this.values.length; i++) {
			f.call(c,this.values[i]);
		};
	};

	return enumeration;
}