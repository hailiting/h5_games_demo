// JavaScript Document
//startMove(1,6,20,oDiv1,{width:100,top:200,opacity:20});
//第一个参数1为匀速运动0为缓冲运动//第二个参数单位速度第三个参数单位时间第四个参数是对象第五个是json数据格式，后面还有个函数，可以有可以没有
function getStyle(obj,attr){//获取外部样式
if(obj.currentStyle){
	return obj.currentStyle[attr];
	}else{
	return getComputedStyle(obj,false)[attr];
	}
}
//
function startMove(a1,b1,c1,obj,json,fnEnd){//缓冲运动
  clearInterval(obj.timer);
  obj.timer=setInterval(function(){
var bStop=true; //假设：所有的值都已经到了
for(var attr in json){
  var cur=0;
  if(attr=='opacity')
  {
	cur=Math.round(parseFloat(getStyle(obj,attr))*100);
  }
  else
  {
	cur=parseInt(getStyle(obj,attr));
  }
  if(a1==0)
	  {
	  var speed=(json[attr]-cur)/b1;
	  speed=speed>0?Math.ceil(speed):Math.floor(speed);
	  }
	  else
	  {
		 if(json[attr]>cur)
		 {
			 var speed=b1;
		 }
		 else
		 {  
			 var speed=-b1
		 }
	  }
  if(cur!==json[attr])
  {
	
	  bStop=false;
	 if(attr=='opacity')
	 {
	
		if(json[attr]>cur)
		{
			//alert("11");
			if(json[attr]-cur<speed){bStop=true;}
		}
		else
		{
			//alert("12");
			if(json[attr]-cur>speed){bStop=true;}
		}
	 }
	 
	 
		 
	 
	//alert()
  }
  else
  {
  
  }
  if(a1==0)
  {
	  if(cur==json[attr])
	  {}
	  else
	  {
			 if(attr=='opacity')
			 {
				obj.style[attr]=(cur+speed)/100;
			 }
			 else
			 {
			    obj.style[attr]=cur+speed+'px';
			 }
	  }
  }
  else
  {
		//alert('json[attr]='+json[attr]+'aaaaa'+'cur='+cur)
	    if(json[attr]-cur>0)
		{
			  if(json[attr]-cur<b1)
			  {
				 obj.style[attr]=json[attr]+'px';
			  }
			  else
			  {
				   if(attr=='opacity')
				   {
					   obj.style[attr]=(cur+speed)/100;
				   }
				   else
				   {
					   obj.style[attr]=cur+speed+'px';
				   }
			  }
	    }
		else
		{
			if(cur-json[attr]<b1)
			  {
				 obj.style[attr]=json[attr]+'px';
			  }
			  else
			  {
				   if(attr=='opacity')
				   {
					   obj.style[attr]=(cur+speed)/100;
				   }
				   else
				   {
					   obj.style[attr]=cur+speed+'px';
				   }
			  }
		}
	
		
   }

}//json
if(bStop){
	clearInterval(obj.timer);
	if(fnEnd)fnEnd();
	}
  },c1)
}
function getByClass(oParent,sClass){
  var aEle=oParent.getElementsByTagName('*');
  var aResult=[];
  for(var i=0;i<aEle.length;i++){
   if(aEle[i].className==sClass)
   {
	   aResult.push(aEle[i]);
	   }//if
   }//for
return aResult;
}
function getObj(n){//选择器
  var oBody=document.getElementsByTagName("body")[0];
 if(n.indexOf('#')!==-1){
	 //针对id
  n=n.replace(/[#]/ig,"")
  return document.getElementById(n);
  
 }else if(n.indexOf('.')!==-1){
	 //针对class
  n=n.replace(/[.]/ig,"")
  var aN = oBody.getElementsByTagName("*");
  var aResult=[];
  for(var i=0;i<aN.length;i++){
   if(aN[i].className==n)
   {
	   aResult.push(aN[i]);
	   }//if
   }
   if(aResult.length==1){
	  return  aResult[0];
	  }else{
		  return  aResult;
		  }
   
 }else{
	//针对标签
   var aN = oBody.getElementsByTagName(n)
   if(aN.length==1){
	   return aN[0]
	   }else{
		   return aN;
		   }
 }//1级if


}//$();
