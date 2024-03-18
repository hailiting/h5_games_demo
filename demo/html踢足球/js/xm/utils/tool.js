define(["app"],

// Map dependencies from above array.
function(app) {

    var $ = jQuery;

    var Tool = {};

    
    Tool.randomNum = function(length,num) {
		var a=[]
		var b=[]
        for(var i=0;i<length;i++){
			a.push(i)
		}
		for(var j=0;j<num;j++){
			var tempNum=Math.floor(Math.random()*a.length)
			b.push(a[tempNum])
			a.splice(tempNum,1)
		}
		return b

    };
	Tool.getWord=function(num){
		var tt=['a','b','c','d','e','f','g','A','i','j','k','l','G','n','o','p','q','r','s','t','u','v','w','x','y','z','h','B','C','D','E','F','m','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','v','W','X','Y','Z']	
		var newA=''
		for(var i=0;i<num;i++){
			newA=newA+tt[Math.floor(Math.random()*tt.length)]
		}
		return newA
	};

    // Return the module for AMD compliance.
    return Tool;

});
