var obj = null;
var obj_1 = null;
var str_2 = "";
var arrshow=[];
var start=1;
var timr1=null;
var startobj=null;

//构造删除数组的原型
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
	if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
	this.splice(index, 1);
	}
};
function fn_num_str(str)
{
	var num = parseInt(str)+1000;
	num+='';
	return num.substring(1);
};
function fn_selechange(e) 
{
	var str_ = $(e).val();
	obj.find("tr").each(function() 
	{
		var str = $(this).find(".t2").html();
		if (str_ == "all") 
		{
			obj.find("tr").css("display", "table-row");
			return false;
		}
		if (str.indexOf(str_)!=-1) 
		{
			$(this).css("display", "table-row");
		} 
		else
		{
			$(this).css("display", "none");
		}
	})
};

function fn_seach_input(e) 
{
	var str_ = $(e).val();
	obj.find("tr").each(function()
	{
		var str = ($(this).find(".t4 span").html())+($(this).find(".t3 span").html());
		if (str.indexOf(str_) != -1)
		{
			$(this).css("display", "table-row");
		}
		else
		{
			$(this).css("display", "none");
		}
	})
}

function fn_show_zh(e) 
{
	var str_ = $(e).html();
	if (str_ == "隐藏释义")
	{
		$(e).html("显示释义");
		fn_startshow();
	}
	else
	{
		$(e).html("隐藏释义");
		fn_startshow();
	}

};

function fn_show_en(e)
{
	var str_ = $(e).html();
	if (str_ == "隐藏API名称")
	{
		$(e).html("显示API名称");
		fn_startshow();
	}
	else
	{
		$(e).html("隐藏API名称");
		fn_startshow();
	}
};
function fn_startshow()
{
	var val1= $(".btn1").html();
	var val2= $(".btn2").html();
	if(val1 == "隐藏释义" && val2 == "隐藏API名称")
	{
		start = 1;
		obj.find("tr").each(function(){
		 	$(this).find(".t3 span").css("display", "block");
		 	$(this).find(".t3 div").css("display", "block");
		 }).each(function(){
		 	$(this).find(".t4 span").css("display", "block");
		 });
	};
	if(val1 == "显示释义" && val2 == "隐藏API名称")
	{
		start = 2;
		obj.find("tr").each(function(){
		 	$(this).find(".t3 span").css("display", "none");
		 	$(this).find(".t3 div").css("display", "none");
		 }).each(function(){
		 	$(this).find(".t4 span").css("display", "block");
		 });
	};
	if(val1 == "隐藏释义" && val2 == "显示API名称")
	{
		start = 3;
		obj.find("tr").each(function(){
		 	$(this).find(".t3 span").css("display", "block");
		 	$(this).find(".t3 div").css("display", "block");
		 }).each(function(){
		 	$(this).find(".t4 span").css("display", "none");
		 });
	};
	if(val1 == "显示释义" && val2 == "显示API名称")
	{
		start = 4;
		obj.find("tr").each(function(){
		 	$(this).find(".t3 span").css("display", "none");
		 	$(this).find(".t3 div").css("display", "none");
		 }).each(function(){
		 	$(this).find(".t4 span").css("display", "none");
		 });
	};
	$(".eyes").removeClass('on');
}
function fn_listinputfus(e)
{
	obj_1=$(e);
	obj_1.parents("tr").addClass('tron').siblings().removeClass('tron');
	str_2=$.trim($(e).parents("tr").find(".t4 span").html());
};
function fn_listinputkeup(e)
{
	var str = $(e).val();
	var num = str.length;
	var star=1;
	for(var i=0;i<num;i++)
	{
		if(str[i] != str_2[i])
		{
			star = 0;
		}
	};
	if(star == 0)
	{
		$(e).addClass('no');
	}
	else
	{
		$(e).removeClass('no');
	}
	if(star == 1 && num == str_2.length)
	{
		$(e).addClass('ok');
	}
	else
	{
		$(e).removeClass('ok');
	};
};
function fn_lock(e)
{
	//fn_num_str;
	var str_="";
	var num = 0;
	$(".table1 tbody tr").each(function(index, el) {
		var str = $(this).attr("data");
		var str1_ = $(this).find(".t3").attr("val");
		var str2_ = $(this).find(".t4").attr("val");
		var str1 = $(this).find(".t3 span").html();
		var str2 = $(this).find(".t4 span").html();
		var shu = $(this).find(".t2").html();
		$(".tk").show();
		if(str == 1)
		{
			num++;
			str_+=fn_returnstr(fn_num_str(num),0,"",str1_,str1,"","");
		}
		else if(str == 2)
		{
			num++;
			str_+=fn_returnstr(fn_num_str(num),0,"","","",str2_,str2);
		}
		else if(str == 3)
		{
			num++;
			str_+=fn_returnstr(fn_num_str(num),0,"",str1_,str1,str2_,str2);
		}
		else if(str == 4)
		{
			shu = $(this).find(".t2 input").val();
			num++;
			str_+=fn_returnstr(fn_num_str(num),1,shu,str1_,str1,str2_,str2);
		};
	});
	$(".tk tbody").html(str_);
};
///////////
function fn_returnstr(num,strt,shu,str1,str2,str3,str4)
{

	strt=strt==0?"修改":"新增"
	var str3='<tr>'+
			'<td>'+num+'</td>'+
			'<td>'+strt+'</td>'+
			'<td>'+shu+'</td>'+
			'<td>'+str1+'</td>'+
			'<td>&gt;&gt;</td>'+
			'<td>'+str2+'</td>'+
			'<td>'+str3+'</td>'+
			'<td>&gt;&gt;</td>'+
			'<td>'+str4+'</td>'+
		'</tr>';
	return str3;
}
function fn_add(e)
{
	var num = parseInt($(".table1 tr:last").find(".t1").html())+1;
	var str4='<tr data="4"><td class="t1">'+fn_num_str(num)+
			'<td class="t2">'+
			'<input type="text" placeholder="类别">'+
			'</td>'+
			'<td class="t4" val="">'+
			'<span></span>'+
			'</td>'+
			'<td val="" class="t3">'+
			'<span></span>'+
			'<div onmouseout="fn_mouseout(this)" onmouseover="fn_mouseover(this)"></div>'+
			'</td>'+
			'<td class="t5">'+
			'<input onfocus="fn_listinputfus(this)" onkeyup="fn_listinputkeup(this)" class="" type="text"></td>'+
			'<td class="t6">'+
			'<i onClick="fn_eyes(this)" class="icon iconfont icon-03zichanxianshifuzhi"></i></td>'+
			'<td class="t7"><i onClick="fn_seach(this)" class="icon iconfont icon-sousuokuangsousuo"></i></td>'+
			'<td class="t8"><i onClick="fn_key(this)" class="icon iconfont icon-zhongdian"></i></td></tr>';
		$(".table1 tbody").append(str4);
};
function fn_guishu(e)
{
	var val = $(e).text();
	$(e).html("<input onblur='fn_addblues(this)' type='text' value='"+val+"'>");
	$(e).find("input").focus();
};
function fn_addblues(e)
{
	var val = $(e).val();
	$(e).parent().html(val);
};
function fn_eyes(e)
{
	var e1= $(e).parents("tr");
	var e2 = e1.find('.t3 span');
	var e2_ = e1.find('.t3 div');
	var e3 = e1.find('.t4 span');
	if(start==2)
	{
		if(e2.css("display")=="none")
		{
			e2.css("display","block");
			e2_.css("display","block");
			$(e).addClass('on');
		}
		else
		{
			e2.css("display","none");
			e2_.css("display","none");
			$(e).removeClass('on');
		}
	};
	if(start==3)
	{
		if(e3.css("display")=="none")
		{
			e3.css("display","block");
			$(e).addClass('on');
		}
		else
		{
			e3.css("display","none");
			$(e).removeClass('on');
		}
	};
};
function fn_seach(e)
{
	var arr = $(e).parents("tr").find(".t2").text().split(",");
	var str = $(e).parents("tr").find(".t4 span").html()+"";
	var str1=str.replace(/\:.+/,"")
	var str2=str1.replace(/\(.+/,"")
	window.open("http://www.baidu.com/s?&wd="+arr[0]+" "+str2);
};
function fn_key(e)
{
	var arr=[];
	if(localStorage.shuju)
	{
		arr = localStorage.shuju.split(",");
	};
	var num = $(e).parents("tr").find(".t1").html();
	if($(e).hasClass('on'))
	{
		$(e).removeClass('on');
		arr.remove(num);
	}
	else
	{
		$(e).addClass('on');
		arr.push(num);
	};
	localStorage.shuju = arr;
};
function fn_mouseover(e)
{
	if($(".fk").css("display")=="none")
	{
		var left= $(e).offset().left;
		var top= $(e).offset().top;
		var str1 = $(e).siblings().html();
		var str2 = $(e).parents("tr").find(".t4 span").html();
		$(".fk").css({left:left,top:top+19,display:"block"}).find('input').val(str2).siblings().val(str1);
		startobj = $(e).parents("tr");
	};
	if(timr1){
		clearTimeout(timr1);
	};
	
};
function fn_mouseout(e)
{
	timr1 = setTimeout(function(){
		fn_leve();
	},0);
};
function fn_divmouseover(e)
{
	clearTimeout(timr1);
};
function fn_divmouseout(e)
{
	clearTimeout(timr1);
	timr1 = setTimeout(function(){
		fn_leve();
	},0);
};
function fn_leve()
{
	$(".fk").css("display","none");
	var val1 = $(".fk").find("input").val();
	var val2 = $(".fk").find("textarea").val();
	var str2 = startobj.find(".t3").attr("val");
	var str1 = startobj.find(".t4").attr("val");
	if(val1 == str1 && val2 == str2){return;}
	if(val1 != str1 && val2 != str2)
	{
		if(startobj.attr("data")!=4)
		{
			startobj.attr("data",3);
		};
		startobj.find(".t3 span").html(val2);
		startobj.find(".t4 span").html(val1);
		return;
	};
	if(val1 == str1 && val2 != str2)
	{
		if(startobj.attr("data")!=4)
		{
			startobj.attr("data",1);
		};
		startobj.find(".t3 span").html(val2);
		return;
	};
	if(val1 != str1 && val2 == str2)
	{
		if(startobj.attr("data")!=4)
		{
			startobj.attr("data",2);
		};
		startobj.find(".t4 span").html(val1);
		return;
	};
};
function fn_returjsn(jsn,num)
{
	var str='<tr><td class="t1">'+fn_num_str(num)+
			'<td class="t2">'+
			jsn.claSs+
			'</td>'+
			'<td class="t4" val="'+jsn.name+'">'+
			'<span>'+jsn.name+'</span>'+
			'</td>'+
			'<td val="'+jsn.explain+'" class="t3">'+
			'<span>'+jsn.explain+'</span>'+
			'<div onmouseout="fn_mouseout(this)" onmouseover="fn_mouseover(this)"></div>'+
			'</td>'+
			'<td class="t5">'+
			'<input onfocus="fn_listinputfus(this)" onkeyup="fn_listinputkeup(this)" class="" type="text"></td>'+
			'<td class="t6">'+
			'<i onClick="fn_eyes(this)" class="icon iconfont icon-03zichanxianshifuzhi"></i></td>'+
			'<td class="t7"><i onClick="fn_seach(this)" class="icon iconfont icon-sousuokuangsousuo"></i></td>'+
			'<td class="t8"><i onClick="fn_key(this)" class="icon iconfont icon-zhongdian"></i></td></tr>';
	return str;

};
$(function()
{

	obj = $("table tbody");
//fn_returjsn
var str5="";
for(var i=0;i<dataApi.length;i++)
{
	str5+=fn_returjsn(dataApi[i],i+1);
};
$(".table1 tbody").html(str5);
	if(!localStorage.shuju){return;}
	var arr = localStorage.shuju.split(",");
	$("tbody tr").each(function(){
		var t1 = $(this).find(".t1").html();
		var t2 = $(this).find(".t8 i");
		if(arr.indexOf(t1)!=-1)
		{
			t2.addClass('on');
		}
	});
});

