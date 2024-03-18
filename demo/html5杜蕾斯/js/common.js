
var isWebkit = function() {
	return document.body.style.WebkitBoxShadow !== undefined;
};
windowWidth=0,windowHeight=0,windowWidthScale=1,windowHeightScale=1;
skySize={width:640,height:28800,acWidth:640,acHeight:28800};
var startObj=null;
var gameObj=null;
var gameEndObj=null;
var weixinUser=null;
var couponsData=[
	{level:1,code:"YZGGM5OZ",url:"http://www.amazon.cn/gp/aw/feature/id=DurexWorldCup1"},
	{level:2,code:"5XQ8UKQS",url:"http://www.amazon.cn/gp/aw/feature/id=DurexWorldCup2"},
	{level:3,code:"YQIO5TMY",url:"http://www.amazon.cn/gp/aw/feature/id=DurexWorldCup3"},
	{level:4,code:"S8SE6CQC",url:"http://www.amazon.cn/gp/aw/feature/id=DurexWorldCup4"},
	{level:5,code:"KPPIX2CX",url:"http://www.amazon.cn/gp/aw/feature/id=DurexWorldCup5"},
	{level:6,code:"EDYCYTER",url:"http://www.amazon.cn/gp/aw/feature/id=DurexWorldCup6"}
];
$(function(){
	if(!isPC()){
		window.location.href="http://football.durex.com.cn/game.html";
		return;
	}
	windowInit();
	if(!isWebkit()){
		$(".wrap").remove();
		$('<div style="position:relative;height:100%;text-align:center;overflow:hidden;"><img src="http://football.durex.com.cn/images/wb.jpg" style="position:relative;height:100%;"/></div>').appendTo("body");
		showMsg("<p>骚瑞，由于本游戏所使用技术的特殊性，请您使用webkit内核的浏览器进行游戏，如：chrome谷歌浏览器，360浏览器极速模式，搜狗浏览器极速模式等！<br>手机扫二维码进入游戏，每周大奖等你来拿！</p><div style='text-align:center'><img src='images/qrcode.jpg' height='186'></div>");
		return;		
	}
	document.body.addEventListener('touchmove',function(e){
		e.stopPropagation();
		e.preventDefault();
	});
	filesLoad();
	_smq.push(['custom', '杜杜足球赛', '游戏页面', '开始加载', ,1]);

	var url="http://"+window.location.host+window.location.pathname;
	function filesLoad(){
		var isLoaded=false;
		var loadingTxt=$("#loading .ft");
		var queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.Sound);
		queue.on("complete", handleComplete, this);
		queue.on("progress", handleProgress, this);
		//queue.loadFile({id:"sound", src:"mp3/1.mp3"});
		queue.loadManifest([
			{id:"sound", src:"mp3/2.mp3"},
			
			
			{id: "footballshadow", src:"images/footballshadow.png"},
			{id: "prose", src:"images/prose.png"},
			{id: "shareico", src:"images/shareico.png"},
			{id: "football", src:"images/football.png"},
			
			
			
			{id: "startbg", src:"images/start/bg.jpg"},
			{id: "start-txt-1", src:"images/start/start-txt-1.png"},
			{id: "start-txt-2", src:"images/start/start-txt-2.png"},
			{id: "zha", src:"images/start/zha.png"},
			{id: "logo", src:"images/start/logo.png"},
			{id: "img", src:"images/start/img.png"},
			{id: "halo-1", src:"images/start/halo-1.png"},
			{id: "halo-2", src:"images/start/halo-2.png"},
			{id: "halo-3", src:"images/start/halo-3.png"},
			{id: "halo-4", src:"images/start/halo-4.png"},
			{id: "hand", src:"images/start/hand.png"},
			{id: "speed-nbg", src:"images/start/speed/nbg.png"},
			{id: "speed-nhand", src:"images/start/speed/nhand.png"},
			{id: "speed-ntxt", src:"images/start/speed/ntxt.png"},
			
			
			
			{id: "flightbg", src:"images/gaming/bg.jpg"},
			{id: "cjb", src:"images/gaming/1.png"},
			{id: "gaming-football", src:"images/gaming/football.png"},
			{id: "gaming-huo", src:"images/gaming/huo.png"},
			{id: "gaming-superman", src:"images/gaming/superman.png"},
			{id: "gaming-tao", src:"images/gaming/tao.png"},
			{id: "gaming-wate-g", src:"images/gaming/wate-g.png"},
			{id: "gaming-wate-g-1", src:"images/gaming/wate-g-1.png"},
			{id: "gaming-wate-g-2", src:"images/gaming/wate-g-2.png"},
			
			{id: "gend-b-3", src:"images/gameend/b-3.png"},
			{id: "gend-c1", src:"images/gameend/c1.png"},
			{id: "gend-c2", src:"images/gameend/c2.png"},
			{id: "gend-h", src:"images/gameend/h.png"},
			{id: "gend-t-0", src:"images/gameend/t-0.png"},
			{id: "gend-t-1", src:"images/gameend/t-1.png"},
			{id: "gend-t-2", src:"images/gameend/t-2.png"},
			{id: "gend-t-3", src:"images/gameend/t-3.png"},
			{id: "gend-t-s", src:"images/gameend/t-s.png"},
			{id: "gend-y-1", src:"images/gameend/y/1.png"},
			{id: "gend-y-2", src:"images/gameend/y/2.png"},
			{id: "gend-y-3", src:"images/gameend/y/3.png"},
			{id: "gend-y-4", src:"images/gameend/y/4.png"},
			{id: "gend-y-5", src:"images/gameend/y/5.png"},
			{id: "gend-y-6", src:"images/gameend/y/6.png"},
			
			{id: "grand-b1", src:"images/rand/b1.png"},
			{id: "grand-b2", src:"images/rand/b2.png"},
			{id: "grand-line", src:"images/rand/line.png"},
			{id: "grand-listshadow", src:"images/rand/listshadow.png"},
			{id: "grand-title", src:"images/rand/title.png"}			
		]);
		function handleComplete() {
			if(isLoaded){return;}
			isLoaded=true;
			//var flightbg = $(queue.getResult("flightbg"));
			//flightbg.css({width:skySize.acWidth,height:skySize.acHeight });
			//flightbg.addClass("bg");
			//flightbg.appendTo(".gaming .sky");
			$(".gaming .sky").css({width:skySize.acWidth,height:skySize.acHeight,backgroundImage:"url("+queue.getResult("flightbg").src+")"});
			
			loadingTxt.text("100%");
			
			startObj=start();
			gameObj=game();
			gameEndObj=gend();
			gameRandObj=grand();
			$(".start .loading").hide();
			if(getQueryString("id")){
				gameRandObj.show({id:getQueryString("id")});
				if(!document.all){
					history.pushState(null, null, url);
				}
				else{
					window.location.href="#12";
				}
			}else{
				startObj.startInit();
			}
			_smq.push(['custom', '杜杜足球赛', '游戏页面', '加载完成', ,1]);
		}
		function handleProgress(a,b,c){
			loadingTxt.text((parseInt(a.currentTarget._numItemsLoaded/a.currentTarget._numItems*100).toFixed(0))+"%");
		}
	}
	$(".bdsharebuttonbox .weixin").bind("click",function(e){
		$(".weixinbox").show();
		e.preventDefault();
	});
	$(".weixinbox").bind("click",function(e){
		$(this).hide();
	});
	$(".bdsharebuttonbox a").click(function(e){
		if($(this).hasClass("weixin")){
			_smq.push(['custom', '杜杜足球赛', '分享', '微信']);
			_gaq.push(['_trackEvent', '杜杜足球赛', '分享', '微信']);
		}else if($(this).hasClass("bds_tsina")){
			_smq.push(['custom', '杜杜足球赛', '分享', '新浪微博']);
			_gaq.push(['_trackEvent', '杜杜足球赛', '分享', '新浪微博']);
		}else if($(this).hasClass("bds_renren")){
			_smq.push(['custom', '杜杜足球赛', '分享', '人人网']);
			_gaq.push(['_trackEvent', '杜杜足球赛', '分享', '人人网']);
		}else if($(this).hasClass("bds_douban")){
			_smq.push(['custom', '杜杜足球赛', '分享', '豆瓣']);
			_gaq.push(['_trackEvent', '杜杜足球赛', '分享', '豆瓣']);
		}else if($(this).hasClass("bds_tqq")){
			_smq.push(['custom', '杜杜足球赛', '分享', '腾讯微博']);
			_gaq.push(['_trackEvent', '杜杜足球赛', '分享', '腾讯微博']);
		}
	});
	
});
function start(){
	var football=$(".start .football");
	//足球光环动画
	var haloDom=$(".start .halo");
	var haloNum=1;
	var haloIsPlay=true;
	function haloPlay(){
		haloNum++;
		if(haloNum>4){
			haloNum=1;
		}
		setTimeout(function(){
			haloDom.attr("class","P_layer halo halo-"+haloNum);
			if(haloIsPlay){
				haloPlay();
			}
		},400);
	};
	//力度条
	/*var prosess=$(".start .prosess>div");
	var prosessSize=0;
	var prosessStep=1;
	var prosessIsPlay=true;
	function prosessPlay(){
		if(prosessSize==0){
			prosessStep=1;
		}else if(prosessSize==100){
			prosessStep=-1;
		}
		prosessSize+=prosessStep;
		setTimeout(function(){
			prosess.width(prosessSize+"%");
			if(prosessIsPlay){
				prosessPlay();
			}
		},10);
	}
	function getProsessSize(){
		return prosessSize;
	}*/
	//标题入场动画监听
	$(".start .txt-1").get(0).addEventListener('webkitTransitionEnd', function () {
		$(".start .box .txt-star").show();
	});
	function startInit(){
		clickNumSize=0;
		clickNum=0;
		haloIsPlay=true;
		haloNum=1;
		haloPlay();
		
		clickNumStatus=false;
		/*prosessIsPlay=true;
		prosessSize=0;
		prosessStep=1;
		prosessPlay();*/
		
		
		speedupProsess.width(0);
			
		//活动标题入场动画
		$(".start .box .logo,.start .box .logo-amazon,.start .box .txt-1,.start .box .txt-2").show();
		setTimeout(function(){
			$(".start .txt-1,.start .txt-2").css({transform:"translate(0,0)"});
		},1000);
		$(".start .txt-1").get(0).addEventListener('webkitTransitionEnd', function () {
			$(".start .halo,.start .football,.start .tip,.start .hand,.start .prize").fadeIn(300);
		});
		
		football.unbind("click").one("click",function(e){
			audioobj.play();
			autioIsPlay();
			//startReady();
			haloNum=0;
			haloDom.attr("class","P_layer halo");
			football.unbind("click");
			_smq.push(['custom', '杜杜足球赛', '游戏页面', '开始']);
			_gaq.push(['_trackEvent', '杜杜足球赛', '游戏页面', '开始']);
		});
		
		gameObj.gameInit();
	}
	function startReplay(){
		footballEventCount=0;
		//$(".start").css({transition:"none"}).removeClass("start-go");
		$(".start").show();
		//$(".start .halo,.start .tip,.start .hand").show();
		football.css({
			left:"50%",
			bottom:19,
			marginLeft:-91,
			width:183,
			height:186,
			transition:"none"
		});
		
		$(".start .speedup,.start .speedup .txt-s div").hide();
		
		startInit();
	}
	//足球进门监听-游戏开始
	var footballEventCount=0;
	$(".start .football").get(0).addEventListener('webkitTransitionEnd', function (e) {
		footballEventCount++;
		if(footballEventCount==4){
			$(".start").hide();
			$(".start .football,.start .box .logo,.start .box .logo-amazon,.start .box .txt-1,.start .box .txt-2").hide();
			$(".start .txt-1").css({transform:"translate(-500px,0)"});
			$(".start .txt-2").css({transform:"translate(500px,0)"});
			gameObj.gameStart(clickNumSize);
		}
	});
	function startPlay(){
		footballEventCount=0;
		var footballBottom=($(window).height()-$(".footballtarget").position().top*windowWidthScale)/windowWidthScale;
		football.css({
			bottom:footballBottom,
			marginLeft:0,
			width:0,
			height:0,
			transition:"all 1s"
		});
	}
	function startReady(){
		haloIsPlay=false;
		$(".start .hand,.start .tip").hide();
		$(".start .speedup").show();
		
		countdownNum=5;
		countdownToStart(0);
		//startPlay();
	}
	var countdownNum=5;
	function countdownToStart(a){
		if(a==0){
			a++;
			setTimeout(function(){
				$(".start .speedup .txt-s .ready").show();
				setTimeout(function(){
					countdownToStart(1);
				},1000);
			},500);
		}else if(a==1){
			$(".start .speedup .txt-s .ready").hide();
			$(".start .speedup .txt-s .go").show();
			setTimeout(function(){
				countdownToStart(2);
			},1000);
		}else if(a==2){
			$(".start .speedup .txt-s .go").hide();
			$(".start .speedup .txt-s .num").show();
			countdownToStart();
			football.unbind("click").bind("click",function(e){
				clickNum++;
				haloNum++;
				if(haloNum>4){
					haloNum=1;
				}
				clickNumSize=clickNum/clickNumCount*100;
				speedupProsess.width(clickNumSize+"%");
				haloDom.attr("class","P_layer halo halo-"+haloNum);
			});
		}else{
			if(countdownNum<0){
				football.unbind("click");
				$(".start .halo").hide();
				$(".start .speedup").fadeOut(500);
				startPlay();
			}else{
				$(".start .speedup .txt-s>.num").text(countdownNum);
				setTimeout(function(){
					countdownToStart();
				},1000);
				countdownNum--;
			}
		}
	}
	var clickNumSize=0;
	var clickNumCount=100;
	var clickNum=0;
	var clickNumStatus=false;
	var speedupProsess=$(".start .speedup .prosess1 .b span");
	var audioobj=$("audio").get(0);
	function autioIsPlay(){
		footballClickStatus=true;
		if(audioobj.currentTime>0){
			
			
			
			
			startReady();
		}else{
			setTimeout(function(){
				autioIsPlay();
			},50);
		}
	}
	var footballClickStatus=false;
	/*football.bind("touchstart",function(e){
		if(footballClickStatus){return false;}
		if(haloIsPlay){
			//createjs.Sound.play("sound");
			audioobj.play();
			autioIsPlay();
			//startReady();
			haloNum=0;
			haloDom.attr("class","P_layer halo");
			_smq.push(['custom', '杜杜足球赛', '游戏页面', '开始']);
			_gaq.push(['_trackEvent', '杜杜足球赛', '游戏页面', '开始']);
		}else if(clickNumStatus){
			clickNum++;
			haloNum++;
			if(haloNum>4){
				haloNum=1;
			}
			clickNumSize=clickNum/clickNumCount*100;
			speedupProsess.width(clickNumSize+"%");
			haloDom.attr("class","P_layer halo halo-"+haloNum);
		}
		
	});*/
	return {
		football:football,
		//getProsessSize:getProsessSize,
		startInit:startInit,
		startPlay:startPlay,
		startReplay:startReplay
	}
}
function game(){
	var sky=$(".gaming .sky");
	var highSize=0;//目标高度
	function gameInit(){
		sky.removeClass("sky-go-0").css({transform:"translate(0,-"+(skySize.acHeight-windowHeight)+"px)"});
	}
	function gameReplay(){
		$(".gaming").removeClass("gamingshow");
		$(".gaming .football .txt,.gaming .football .shock,.gaming .football .shock-1,.gaming .football .shock-2,.gaming .football .ball-1,.gaming .football .ball-2,.gaming .football .ball-3").hide();
		$(".gaming .superman").removeClass("supermanshow");
		$(".gaming .football").show().css({transform:"translate(0,"+windowHeight+"px)"});
		$(".gaming .football .ball").removeClass("ball-end");
		$(".gaming .footballflightnum").removeClass("footballflightnum-end");
		timing.text(0);
		
		highSize=0;
		timingNum=0;
		
		
		gameInit();
	}
	function gameStart(prosessSize){
		$(".gaming").addClass("gamingshow");
		//$(".gaming .pagelock").show();		
		$(".gaming .football").show().css({transform:"translate(0,"+(windowHeight*0.3/windowWidthScale)+"px)"});
		$(".gaming .football .ball").show();
		
		//游戏开始转场监听
		//setTimeout(function(){
			//$(".gaming .pagelock .speedup").show();
			haloNum=1;
			haloIsPlay=true;
			//haloPlay();
			gameGo(prosessSize);
		//},1200);
		
	}
	//开始
	function gameGo(prosessSize){
		$(".gaming .pagelock,.gaming .pagelock .speedup").hide();
		$(".gaming .superman").addClass("supermanshow");
		var pscale=prosessSize/100;
		highSize=(29000*pscale+randomBetween(0,999,true)).toFixed(0);
		highSize=randomBetween(highSize*0.8,highSize,true);
		var high=skySize.acHeight/2-skySize.acHeight/2*pscale;
		//var flightTime=pscale*10+10;
		$(".gaming .footballflightnum,.gaming .football .shock").show();
		sky.addClass("sky-go-0");
		setTimeout(function(){
			sky.css({transform:"translate(0,-"+high+"px)"/*,"-webkit-transition-delay":flightTime+"s"*/});
		},50);
		timingStep=parseInt(highSize/9/20);
		timingIsPlay=true;
		timingPlay();
		/*$(".gaming .football .ball").hide();
		$(".gaming .football .ball-1").show();*/
		//冲击波
		setTimeout(function(){
			$(".gaming .football .shock").hide();
			$(".gaming .football .shock-1").show();
			
			/*$(".gaming .football .ball-1").hide();
			$(".gaming .football .ball-2").show();*/
			setTimeout(function(){
				$(".gaming .football .shock-1").hide();
				$(".gaming .football .shock-2").show();
			
				/*$(".gaming .football .ball-2").hide();
				$(".gaming .football .ball-3").show();*/
			},3000);
		},3000);
	}
	sky.get(0).addEventListener('webkitTransitionEnd', function () {
		//alert("fd");
		$(".gaming .football").css({transform:"scaleX(0.9) translate(0,"+(windowHeight*0.1/windowWidthScale)+"px)"});
		$(".gaming .football .ball").addClass("ball-end");
		$(".gaming .footballflightnum").addClass("footballflightnum-end");
		timingIsPlay=false;
		timing.text(highSize);
		//
		setTimeout(function(){
			gameEndObj.show(highSize);
			$(".gaming .footballflightnum").hide();
			$(".gaming .football,.gaming .football .ball").hide();
		},2500);
	});
	var timing=$(".gaming .footballflightnum .num");
	var timingIsPlay=false;
	var timingNum=0;
	var timingStep=0;
	function timingPlay(){
		
		setTimeout(function(){
			if(timingIsPlay){
				timing.text(timingNum);
				timingNum+=timingStep;
				timingPlay();
			}else{
				timing.text(highSize);
			}
		},50);
	}
	return {
		gameInit:gameInit,
		gameStart:gameStart,
		gameReplay:gameReplay
	}
}
function getCoupons(distance){
	if(distance<=9000){
		coupons=couponsData[0];
		$(".gend .c1 a").attr("class","co-0");
	}else if(distance<=11000){
		coupons=couponsData[1];
		$(".gend .c1 a").attr("class","co-1");
	}else if(distance<=13000){
		coupons=couponsData[2];
		$(".gend .c1 a").attr("class","co-2");
	}else if(distance<=15000){
		coupons=couponsData[3];
		$(".gend .c1 a").attr("class","co-3");
	}else if(distance<=18000){
		coupons=couponsData[4];
		$(".gend .c1 a").attr("class","co-4");
	}else if(distance<=30000){
		coupons=couponsData[5];
		$(".gend .c1 a").attr("class","co-5");
	}
}
var coupons=null;
function gend(){
	var gend=$(".gend");
	var football=$(".gend .football");
	var yuan=$(".gend .yuan");
	var xh=$(".gend .xh");
	var t1=$(".gend .t1");
	var t2=$(".gend .t2");
	var t3=$(".gend .t3");
	var b1=$(".gend .b1");
	var b2=$(".gend .b2");
	var b3=$(".gend .b3");
	
	
	var c1=$(".gend .c1");
	var c2=$(".gend .c2");
	
	
	yuan.get(0).addEventListener("webkitAnimationEnd",function(e){
		t1.show();
		xh.show();
		setTimeout(function(){
			t2.show();
		},200);
		setTimeout(function(){
			t3.show();
		},400);
	});
	function gendClose(){
		gend.hide();
		xh.hide();
		football.hide();
		t1.hide();
		t2.hide();
		t3.hide();
	}
	c2.bind("click",function(e){
		if(!is_weixn()){
			showMsg("<p>骚瑞，排行榜仅对微信用户开放~ 想拿杜杜大礼包？手机扫二维码进入游戏，每周大奖等你来拿！</p><div style='text-align:center'><img src='images/qrcode.jpg' height='186'></div>");
			return false;
		}
	});
	c1.bind("click",function(e){
		if(coupons){
			_smq.push(['custom', '杜杜足球赛', '电商', 'G点戳戳-游戏结束-优惠券'+coupons.level]);
			_gaq.push(['_trackEvent', '杜杜足球赛', '电商', 'G点戳戳-游戏结束-优惠券'+coupons.level]);
			window.location.href=coupons.url;
		}
		e.preventDefault();
	});
	
	b3.bind("click",function(e){
		startObj.startReplay();
		gameObj.gameReplay();
		gameEndObj.gendClose();
		_smq.push(['custom', '杜杜足球赛', '游戏页面', '再来一发']);
		_gaq.push(['_trackEvent', '杜杜足球赛', '游戏页面', '再来一发']);
	});
	var distanceKM=0;
	function show(distance){
		setTimeout(function(){
			football.fadeIn(300);
		},1000);
		distanceKM=distance;
		getCoupons(distance);
		
		/*var level=(distance/2900).toFixed(0);
		if(level<=5){
			coupons=couponsData[0];
			$(".gend .c1 a").attr("class","co-1");
		}else{
			coupons=couponsData[level-5];
			$(".gend .c1 a").attr("class","co-"+(level-5));
		}*/
		
		t2.find("b").text(distance+"km");
		gend.show();
	}
	
	
	return {
		show:show,
		gendClose:gendClose
	}
}
function grand(){
	var rand=$(".rand");
	var rb1=$(".rand .b1");
	var rb2=$(".rand .b2");
	
	rb1.bind("click",function(e){
		startObj.startReplay();
		gameObj.gameReplay();
		rand.hide();
		_smq.push(['custom', '杜杜足球赛', '排行榜', '再来一发']);
		_gaq.push(['_trackEvent', '杜杜足球赛', '排行榜', '再来一发']);
	});
	rb2.bind("click",function(e){
		if(coupons){
			_smq.push(['custom', '杜杜足球赛', '电商', 'G点戳戳-排行榜-优惠券'+coupons.level]);
			_gaq.push(['_trackEvent', '杜杜足球赛', '电商', 'G点戳戳-排行榜-优惠券'+coupons.level]);
			window.location.href=coupons.url;
		}
		e.preventDefault();
	});
	function show(data){
		rand.show();
		showData(data);
	}
	function showData(data){
		$(".rand .list>.l").html("");
		
	}
	function hide(){
		rand.show();
	}
	return {
		show:show,
		hide:hide
	}
}
$(window).resize(windowInit);
function windowInit(){
	
	
	windowWidth=640*($(window).height()/960);
	windowHeight=$(window).height();
	
	$(".wrap").width(windowWidth);
	
	windowWidthScale=windowWidth/640;
	windowHeightScale=windowHeight/960;
	skySize.acWidth=windowWidth;
	skySize.acHeight=skySize.height*windowWidthScale;
	$(".zoom").css("zoom",windowWidthScale);
	$(".zoomh").css("zoom",windowHeightScale);
	$(".weixinbox>img").css({marginLeft:windowHeight/2*-1});
}
var browser={
    versions:function(){
           var u = navigator.userAgent, app = navigator.appVersion;
           return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
function randomBetween(c, a, d) {
	d = d ? d: false;
	var b = c + (Math.random() * (a + 2 - c));
	b = Math.min(b, a);
	return d ? parseInt(b,10) : b
};
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function showMsg(txt){
	var html=$('<div class="noweixinopen"><div class="box"><h3>提示！</h3><p>'+txt+'</p><div class="btns"><a href="#" class="btn">我知道了</a></div></div></div>').appendTo("body");
	html.find(".box").css({top:(windowHeight-html.find(".box").outerHeight())/2}).find(".btns>.btn").click(function(e){
		html.remove();
		e.preventDefault();
	});
}
function isPC(){ 
	var userAgentInfo = navigator.userAgent; 
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
	var flag = true; 
	for (var v = 0; v < Agents.length; v++) { 
	if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
	} 
	return flag; 
}