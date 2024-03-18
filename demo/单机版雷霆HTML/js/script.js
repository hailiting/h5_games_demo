var btnstata=getObj(".stata");
var zd_quyu=getObj(".zhandouBox");
var diji_box=getObj(".diji_box");
var wofang=getObj(".wofang");
var beijing=getObj(".bjbox");
var baozhaxiaoguo=getObj(".baozhaxiaoguo_box");//爆炸效果区域

// var paodan=getObj(".paodan");

var wofangimg=wofang.getElementsByTagName("img")[0];
var wo_xue_div=getObj(".wo_xue").getElementsByTagName("div")[0];
var zongfen=getObj(".zongjidefen").getElementsByTagName("span")[0];
//alert(zongfen);
var wofangtime_left=null;//移动
var wofangtime_top=null;//移动
var wofangtime_paodan=null;//发射炮弹；
var wofangtime_speed=10;//我方飞机移动速度

var dijizhizao_speed=2000;//敌机制造速度
var dijizhizao_time=null;//敌机制造循环时间对象

var arr_diji_1=[];//敌机
var arr_diji_2=[];//敌机
var arr_diji_zong=[];//敌机

var arr_diji_chuxian_weizhi=[];//敌机出现位置；

var putong_diji=0;//普通敌机击毁数;
var teshu_diji=0;//厉害敌机击毁数;

var wofang_ss=0;

var nandujiebie=1;
//敌机生产速度加快
function shudujiakaui()
{
	setInterval(function(){
		if(dijizhizao_speed>400)
		{
		dijizhizao_speed-=10;
		};
		if(dijizhizao_speed<1300)
		{
			nandujiebie=3;
			return;
		}
		if(dijizhizao_speed<1700)
		{
			nandujiebie=2;
			return;
		}
	},2000)
}

//敌机炮弹击中后的爆炸效果；效果类型 x坐标 y坐标
function baozhaxiaoguo_fn(n1,x,y)
{
	//炮弹爆炸
	/*var img;*/
	setTimeout(function(){
		if(n1==1)
		{
			var img1=document.createElement("img");
			img1.src="images/baozha_2.gif";
			img1.setAttribute("class","img_1");
			img1.style.left=x+'px';
			img1.style.top=y+'px';
			baozhaxiaoguo.appendChild(img1);
			setTimeout(function(){
				if(img1){
				baozhaxiaoguo.removeChild(img1);
				}
			},1200)
		}
		else if(n1==2)
		{
			var img2=document.createElement("img");
			img2.src="images/pandan_bz.gif";
			img2.setAttribute("class","img_2");
			img2.style.left=x+'px';
			img2.style.top=y+'px';
			baozhaxiaoguo.appendChild(img2);
			setTimeout(function(){
				if(img2){
				baozhaxiaoguo.removeChild(img2);
				}
			},1200)
		}
		else if(n1==3)
		{
			var img3=document.createElement("img");
			img3.src="images/pandan_bz.gif";
			img3.setAttribute("class","img_3");
			img3.style.left=x-30+'px';
			img3.style.top=y-30+'px';
			baozhaxiaoguo.appendChild(img3);
			setTimeout(function(){
				if(img3){
				baozhaxiaoguo.removeChild(img3);
				}
			},1200)
		}
		else if(n1==4)
		{

		}

	},0)
}
function zailaiyici()
{
	wofang_ss=1;
	chuangjiandiji();
	putong_diji=0;
	teshu_diji=0;
	nandujiebie=1;
	dijizhizao_speed=2020;
	getObj(".zongjidefen").style.display="none";
	wo_xue_div.style.width=150+"px";
	wo_xue_div.style.backgroundColor="green";
}

btnstata.onclick=function()
{
	beijing.style.opacity=1;
	wofang.style.opacity=1;
	wofang_ss=1;
	shudujiakaui();
	btnstata.style.display='none';
	chuangjiandiji();
	setInterval(function(){
		panduan_wofang_zj()
	},40);
};
var zongwidth;
var zongheight;

//背景天空
function beijingtiankong()
{	var x=0;
	var hei= beijing.offsetHeight;
	beijing.style.top=-(hei/2)+'px';
	setInterval(function(){ 
		x=x+1;
		beijing.style.top=x+'px';
	 if(x>=0)
		 {
		 	x=-(hei/2);
		 	beijing.style.top=x+'px';
		 }
	},50)
}
//创建天空飞行物敌机//对象，x轴速度，y轴速度，
function tiankongfeixingwu(obj,xspeed,yspeed,timespeed)
{
	obj.timer_2=null;
	obj.xspeed=xspeed;
	obj.yspeed=yspeed;
	obj.timespeed=timespeed;
	obj.timer_2 = setInterval(function(){
		obj.style.left=obj.offsetLeft+obj.xspeed+'px';
		obj.style.top=obj.offsetTop+obj.yspeed+'px';

		if(obj.offsetTop>(zongheight+200))
		{
			clearInterval(obj.timer_2);
			obj.timer_2=null;
			diji_box.removeChild(obj);
		}
	},obj.timespeed)
};
//动态创建飞机函数
function chuangjiandiji()
{
	clearInterval(dijizhizao_time);
	dijizhizao_time  = setInterval(function(){
		if(wofang_ss!=0)
		{
			var suiji_1_8=parseInt(Math.random()*(8-0)+0);
			var wei_zhi=arr_diji_chuxian_weizhi[suiji_1_8];

			if(nandujiebie==2)
			{var xspeed=parseInt(Math.random()*(6-(-6))+(-6));}
			else if(nandujiebie==3)
			{var xspeed=parseInt(Math.random()*(7-(-7))+(-7));}
			else
			{var xspeed=parseInt(Math.random()*(3-(-3))+(-3));}

			if(wei_zhi-(zongwidth/2)>0)
			{
				xspeed = xspeed<0?xspeed:-xspeed;
			}
			else
			{
				xspeed = xspeed<0?-xspeed:xspeed;
			};

			if(nandujiebie==2)
			{
				var yspeed=parseInt(Math.random()*(7-3)+3);
				var timespeed=parseInt(Math.random()*(45-18)+18);
				var x_1=parseInt(Math.random()*(3-1)+1);
			}
			else if(nandujiebie==3)
			{
				var yspeed=parseInt(Math.random()*(8-4)+4);
				var timespeed=parseInt(Math.random()*(40-10)+10);
				var x_1=parseInt(Math.random()*(3-1)+1);
			}
			else
			{
				var yspeed=parseInt(Math.random()*(6-2)+2);
				var timespeed=parseInt(Math.random()*(50-20)+20);
				var x_1=parseInt(Math.random()*(4-1)+1);
			};
			if(x_1==1)
			{
				var div = document.createElement("div");
				div.setAttribute("class","diji_2");
				div.style.left=wei_zhi+'px';
				div.style.top=-190+'px';
				div.innerHTML='<img src="images/diji_zd.png">'+
								'<span class="xue">'+
										'<div></div>'+
								'</span>';
				diji_box.appendChild(div);
				tiankongfeixingwu(div,xspeed,yspeed,timespeed);
			}
			else
			{
				var div1 = document.createElement("div");
				div1.setAttribute("class","diji_1");
				div1.style.left=wei_zhi+'px';
				div1.style.top=-160+'px';
				div1.innerHTML='<img src="images/diji_2.png">'+
								'<span class="xue">'+
										'<div></div>'+
								'</span>';
				diji_box.appendChild(div1);
				tiankongfeixingwu(div1,xspeed,yspeed,timespeed);
			};
		}
	},dijizhizao_speed)
};
//炮弹实例//速度 left top  炮弹类型
function Paodan(obj,speed,lei)
{
	obj.timer_1=null;
	obj.timer_1 = setInterval(function()
	{
		obj.style.top=obj.offsetTop-speed+'px';
		obj.shang=obj.offsetTop;
		arr_diji_1=document.getElementsByClassName("diji_1");//getObj(".diji_1");
		arr_diji_2=document.getElementsByClassName("diji_2");
		arr_diji_zong=diji_box.children;//arr_diji_1.concat(arr_diji_2);
		//console.log(arr_diji_zong.length);
		//线程
		//setTimeout(function(){
			for(var i=0;i<arr_diji_zong.length;i++)
			{
				//线程
				if(impact(obj,arr_diji_zong[i]))
				{
					clearInterval(obj.timer_1);
					obj.timer_1=null;
					var diji_img=arr_diji_zong[i].getElementsByTagName("img")[0];
					baozhaxiaoguo_fn(1,obj.offsetLeft,obj.offsetTop)
					zd_quyu.removeChild(obj);
					if(arr_diji_zong[i].className=="diji_2")
		            {
		            	var div_xue=arr_diji_zong[i].getElementsByTagName("div")[0];
		            	div_xue.style.width=div_xue.offsetWidth-10+'px';
		            	var div_width=div_xue.offsetWidth;
		            	if(div_width<=0)
		            	{
		            		baozhaxiaoguo_fn(3,arr_diji_zong[i].offsetLeft,arr_diji_zong[i].offsetTop);
		        			diji_box.removeChild(arr_diji_zong[i]);
		        			teshu_diji++;
		            		return;
		            	}
		            	if(div_width<100)
		            	{
		            		div_xue.style.backgroundColor="red";
		            		return;
		            	}
		            	if(div_width<150)
		            	{
		            		div_xue.style.backgroundColor="yellow";
		            		return;
		            	}
		            	else
		            	{
		            		div_xue.style.backgroundColor="green";
		            		return;
		            	}
		            }
		            else if(arr_diji_zong[i].className=="diji_1")
		            {
		            	var div_xue_1=arr_diji_zong[i].getElementsByTagName("div")[0];
		            	div_xue_1.style.width=div_xue_1.offsetWidth-10+'px';
		            	var div_width=div_xue_1.offsetWidth;
		            	if(div_width<=0)
		            	{
		            		baozhaxiaoguo_fn(2,arr_diji_zong[i].offsetLeft,arr_diji_zong[i].offsetTop);
		        			diji_box.removeChild(arr_diji_zong[i]);
		        			putong_diji++;
		            		return;
		            	}
		            	if(div_width<50)
		            	{
		            		div_xue_1.style.backgroundColor="red";
		            		return;
		            	}
		            	if(div_width<100)
		            	{
		            		div_xue_1.style.backgroundColor="yellow";
		            		return;
		            	}
		            	else
		            	{
		            		div_xue_1.style.backgroundColor="green";
		            		return;
		            	}

		            }
				}
		        else
		        {
		        	if(obj.shang<-50)
					{
						clearInterval(obj.timer_1);
						obj.timer_1=null;
						if(obj)
						{
							zd_quyu.removeChild(obj);
						}
						return;
					}
		        }

			}
		/*},0)*/
		if(obj.shang<(-50))
		{
			clearInterval(obj.timer_1);
			obj.timer_1=null;
			if(obj)
			{
				zd_quyu.removeChild(obj);
			}
			
		}
	},50)
};
window.onload=function()
{
	/*baozhaxiaoguo_fn(1,50,80);
	baozhaxiaoguo_fn(1,80,80);
	baozhaxiaoguo_fn(1,0,80);
	baozhaxiaoguo_fn(3,10,50);
	baozhaxiaoguo_fn(1,5,20);
	baozhaxiaoguo_fn(2,0,0);*/
	
	beijingtiankong();
	zongwidth = zd_quyu.offsetWidth;
	zongheight = zd_quyu.offsetHeight;
	var weizhi_bili=zongwidth/8;
	for(var i=0;i<8;i++)
	{
		arr_diji_chuxian_weizhi.push(parseInt(i*weizhi_bili));
	};
	wofang.style.left=zongwidth/2-100+'px';
	wofang.style.top=zongheight/2+(zongheight/2-170)+'px';


	//禁止右键菜单
	document.oncontextmenu = function (){
		alert("请尊重下我的劳动成果哈");
		return false;
	};
};
window.onresize = function(){
	location = location;
};
document.onkeydown=function(event)
{
	var e = event || window.event || arguments.callee.caller.arguments[0];

	//保护源码的措施
     //F12
     if(e.keyCode == 123){
     	alert("请尊重下我的劳动成果哈");
         return false;
     //Ctrl+Shift+I
     }else if((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)){
     	alert("请尊重下我的劳动成果哈");
         return false;
     //Shift+F10
     }else if((e.shiftKey) && (e.keyCode == 121)){
     	alert("请尊重下我的劳动成果哈");
         return false;
     //Ctrl+U
     }else if((e.ctrlKey) && (e.keyCode == 85)){
     	alert("请尊重下我的劳动成果哈");
         return false;
     };


	//a65 s83 w87 d68
	if(wofang_ss==0){return false}
		if(e.keyCode==65)
		{
			clearInterval(wofangtime_left);
			wofangtime_left = setInterval(function(){
				if(parseInt(wofang.style.left)<-10)
				{
					wofang.style.left=-20+'px';
					clearInterval(wofangtime_left);
					return;
				};
				wofang.style.left=parseInt(wofang.style.left)-wofangtime_speed+'px';
			},10);
			return;
		}
		if(e.keyCode==87)
		{
			clearInterval(wofangtime_top);
			wofangtime_top = setInterval(function(){
				//panduan_wofang_zj();
				if(parseInt(wofang.style.top)<-10)
				{
					wofang.style.top=-20+'px';
					clearInterval(wofangtime_top);
					return;
				}
				wofang.style.top=parseInt(wofang.style.top)-wofangtime_speed+'px';
			},10);
			return;
		}
		if(e.keyCode==68)
		{
			clearInterval(wofangtime_left);
			wofangtime_left = setInterval(function(){
				//panduan_wofang_zj();
				if(parseInt(wofang.style.left)>zongwidth-200+20)
				{
					wofang.style.left=zongwidth-200+10+'px';
					clearInterval(wofangtime_left);
					return;
				}
				wofang.style.left=parseInt(wofang.style.left)+wofangtime_speed+'px';
			},10);
			return;
		}
		if(e.keyCode==83)
		{
			clearInterval(wofangtime_top);
			wofangtime_top = setInterval(function(){
				//panduan_wofang_zj();
				if(parseInt(wofang.style.top)>zongheight-150+20)
				{
					wofang.style.top=zongheight-150+10+'px';
					clearInterval(wofangtime_top);
					return;
				}
				wofang.style.top=parseInt(wofang.style.top)+wofangtime_speed+'px';
			},10);
			return;
		}
		if(e.keyCode==13)
		{
			var fragment;
			var div_paodan;
			var img_paodan;
			var div_paodan2;
			var img_paodan2;
			clearInterval(wofangtime_paodan);
			wofangtime_paodan = setInterval(function(){

					fragment=document.createDocumentFragment();
					div_paodan = document.createElement("div");
					img_paodan = document.createElement("img");
					div_paodan.setAttribute("class","paodan");
					img_paodan.setAttribute("src","images/paodan.png");
					div_paodan.appendChild(img_paodan);
					fragment.appendChild(div_paodan);
					div_paodan.style.left=wofang.offsetLeft+40+'px';
					div_paodan.style.top=wofang.offsetTop-0+'px';

					div_paodan2 = document.createElement("div");
					img_paodan2 = document.createElement("img");
					div_paodan2.setAttribute("class","paodan");
					img_paodan2.setAttribute("src","images/paodan.png");
					div_paodan2.appendChild(img_paodan2);
					fragment.appendChild(div_paodan2);
					div_paodan2.style.left=wofang.offsetLeft+120+'px';
					div_paodan2.style.top=wofang.offsetTop-0+'px';

					Paodan(div_paodan2,30,"images/paodan_b.png");
					Paodan(div_paodan,30,"images/paodan_b.png");
					zd_quyu.appendChild(fragment);
			},200);

			fragment=document.createDocumentFragment();
			div_paodan = document.createElement("div");
			img_paodan = document.createElement("img");
			div_paodan.setAttribute("class","paodan");
			img_paodan.setAttribute("src","images/paodan.png");
			div_paodan.appendChild(img_paodan);
			fragment.appendChild(div_paodan);
			div_paodan.style.left=wofang.offsetLeft+40+'px';
			div_paodan.style.top=wofang.offsetTop-0+'px';

			div_paodan2 = document.createElement("div");
			img_paodan2 = document.createElement("img");
			div_paodan2.setAttribute("class","paodan");
			img_paodan2.setAttribute("src","images/paodan.png");
			div_paodan2.appendChild(img_paodan2);
			fragment.appendChild(div_paodan2);
			div_paodan2.style.left=wofang.offsetLeft+120+'px';
			div_paodan2.style.top=wofang.offsetTop-0+'px';

			zd_quyu.appendChild(fragment);
			Paodan(div_paodan2,30,"images/paodan_b.png");
			Paodan(div_paodan,30,"images/paodan_b.png");
			return;
		}
}
document.onkeyup=function(event)
{
	var e = event || window.event || arguments.callee.caller.arguments[0];
	//a65 s83 w87 d68
	if(wofang_ss==0){return false}
		if(e.keyCode==65)
		{
			clearInterval(wofangtime_left);
		}
		if(e.keyCode==87)
		{
			clearInterval(wofangtime_top);
		}
		if(e.keyCode==68)
		{
			clearInterval(wofangtime_left);
		}
		if(e.keyCode==83)
		{
			clearInterval(wofangtime_top);
		}
		if(e.keyCode==13)
		{
			clearInterval(wofangtime_paodan);
		}
};
document.onmousedown=function()
{
	
}

 
//判断敌机是否和我机碰撞
function panduan_wofang_zj()
{
	arr_diji_zong=diji_box.children;
	//线程
	
	for(var i=0;i<arr_diji_zong.length;i++)
	{
		if(impact(wofang,arr_diji_zong[i]))
		{
			var diji_img=arr_diji_zong[i].getElementsByTagName("img")[0];
			if(arr_diji_zong[i].className=="diji_2")
            {
				
	            baozhaxiaoguo_fn(3,arr_diji_zong[i].offsetLeft,arr_diji_zong[i].offsetTop);
    			diji_box.removeChild(arr_diji_zong[i]);
				wo_xue_div.style.width=wo_xue_div.offsetWidth-30+'px';
				if(wo_xue_div.offsetWidth<30)
				{
					wo_xue_div.style.width=0;
				}
				console.log(wo_xue_div.offsetWidth)
				if(wo_xue_div.offsetWidth<=0)
    			{
    				gameover();
    				return;
    			}
    			if(wo_xue_div.offsetWidth<=50)
    			{
    				wo_xue_div.style.backgroundColor="red";
    				return;
    			}
    			if(wo_xue_div.offsetWidth<=100)
    			{
    				wo_xue_div.style.backgroundColor="yellow";
    				return;
    			}
    			else
    			{
    				wo_xue_div.style.backgroundColor="green";
    				return;
    			}
			}
			else if(arr_diji_zong[i].className=="diji_1")
			{
				//diji_img.src="images/diji_2_s.png";
	            baozhaxiaoguo_fn(2,arr_diji_zong[i].offsetLeft,arr_diji_zong[i].offsetTop);
				diji_box.removeChild(arr_diji_zong[i]);
    			wo_xue_div.style.width=wo_xue_div.offsetWidth-20+'px';
				if(wo_xue_div.offsetWidth<20)
				{
					wo_xue_div.style.width=0;
				}
    			if(wo_xue_div.offsetWidth<=0)
    			{
    				gameover();
    				return;
    			}
    			if(wo_xue_div.offsetWidth<=50)
    			{
    				wo_xue_div.style.backgroundColor="red";
    				return;
    			}
    			if(wo_xue_div.offsetWidth<=100)
    			{
    				wo_xue_div.style.backgroundColor="yellow";
    				return;
    			}
    			else
    			{
    				wo_xue_div.style.backgroundColor="green";
    				return;
    			}
			}
		}
	}
};
//游戏结束函数
function gameover()
{
	//线程
	setTimeout(function(){
		wofang_ss=0;
		clearInterval(dijizhizao_time);
		dijizhizao_time=null;
		zongfen.innerHTML = putong_diji*100+(teshu_diji*100);
		getObj(".zongjidefen").style.display="block";
	},0)
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