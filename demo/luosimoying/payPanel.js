var userInfo ;   //用户登录信息
var otherInfo = {score:0 , otherisover:false};
var key = "sdh11fgf2!2" ;
var key1= "dsg45d5d56e8@&*!s" ;
var gameId = "131" ;
var itemId = "006060751001" ;   //其余的在  index.html div中
var cpServiceId="602516026835" ;
var userload;
var fhstatus;
var ein;
var pstatus = true;

var payGoldValue = "1_1" ;
var showTxt ;
var errorDiv ;
var errorTxt ;
var money =  10 ;    //暂时没用
var answerCode ;

var payPanelCallback ;
var payPanelCallbackThisObj ;

var getGoldFromServerCallback ;
var getGoldFromServerCallbackThisObj ;
var updateGoldCallback ;
var updateGoldCallbackThisObj ;
var updateToolCallback ;
var updateToolCallbackThisObj  ;


var multiple = true ;  // 多道具
var toolid =0 ;
var toolNum =1;

var proxyUrl = "http://www.g6game.com/h5game/interfaces/proxyGet.php" ;

loadXML = function(xmlString){
            var xmlDoc=null;
            //判断浏览器的类型
            //支持IE浏览器
            if(!window.DOMParser && window.ActiveXObject){   //window.DOMParser 判断是否是非ie浏览器
                var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
                for(var i=0;i<xmlDomVersions.length;i++){
                    try{
                        xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                        xmlDoc.async = false;
                        xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                        break;
                    }catch(e){
                    }
                }
            }
            //支持Mozilla浏览器
            else if(window.DOMParser && document.implementation && document.implementation.createDocument){
                try{
                    /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                     * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                     * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                     * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                     */
                    domParser = new  DOMParser();
                    xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
                }catch(e){
                }
            }
            else{
                return null;
            }

            return xmlDoc;
        }

function login(){	
}
window.onload=login();
function getPara() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    var strs ;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]= unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function fhoper(tar,einp){
	pstatus = true;
	fhstatus = tar;
	fhstatus.onLose();
}

function fhshopc(){
	hwset1();
var ds=$(".fhshopBox").css("display") == 'none' ? 'block':'none' ;
$(".fhshopBox").css("display",ds);
}

function charge(m){
  location.href="/lsmy/Pay/doalipay?uid="+userInfo.uid+"&&usid="+userInfo.usid+"&&total_fee="+m;
  return false;
}

function adclose(){
$(".ad").hide();
}

function fh(){
	pstatus = true;
	updateMoney(); 
	$(".fh_div").hide();
	fhstatus.playLoseIn += ein;
	if(fhstatus.isTimeLevel){
		fhstatus.limitLeft=30;
	}else{
	    fhstatus.limitLeft=10;
    }

}
function canclefh(){
	pstatus = true;
	$(".fh_div").hide();
	fhstatus.onLose();

}

function cz(){
pstatus = true;
$(".fh_div").hide();
fhshopc();
}

function getreal(str){
    if (str.indexOf("px") != -1) {
        strs = str.split("px");
        return parseFloat(strs[0]);
    }
}

function hwset(){
    var Onwidth = $("#canvas").css("width");
    var Onheight = $("#canvas").css("height");
    var rewidth=getreal(Onwidth)/640*436;
    var rhawidth=-rewidth/2;
    var rhwidth=rhawidth.toString()+"px";
    var rwidth=rewidth.toString()+"px";
    var reheight=getreal(Onheight)/960*313;
    var rhaheight=-reheight/2;
    var rhheight=rhaheight.toString()+"px";
    var rheight=reheight.toString()+"px";
    $(".fh_back").css("width",rwidth);
    $(".fh_back").css("height",rheight);
    $(".fh_back").css("margin-top",rhheight);
    $(".fh_back").css("margin-left",rhwidth);
	$(".fh_back").css("background-size","100% 100%");
}

function hwset1(){
    var Onwidth = $("#canvas").css("width");
    var Onheight = $("#canvas").css("height");
    var rewidth=getreal(Onwidth)/640*436;
    var rhawidth=-rewidth/2;
    var rhwidth=rhawidth.toString()+"px";
    var rwidth=rewidth.toString()+"px";
    var reheight=getreal(Onheight)/960*370;
    var rhaheight=-reheight/2;
    var rhheight=rhaheight.toString()+"px";
    var rheight=reheight.toString()+"px";
    $(".fhshopBox").css("width",rwidth);
    $(".fhshopBox").css("height",rheight);
    $(".fhshopBox").css("margin-left",rhwidth);
	$(".fhshopBox").css("background-size","100% 100%");
}

function hwset2(){
    var Onwidth = $("#canvas").css("width");
    var Onheight = $("#canvas").css("height");
    var rewidth=getreal(Onwidth)/640*436;
	var rchwidth=getreal(Onheight)*5/100;
    var chwidth=rewidth/2-rchwidth;
	var chawidth=chwidth.toString()+"px";
    var rhawidth=-rewidth/2;
    var rhwidth=rhawidth.toString()+"px";
    var rwidth=rewidth.toString()+"px";
    var reheight=getreal(Onheight)/960*313;
    var rhaheight=-reheight/2;
    var rhheight=rhaheight.toString()+"px";
    var rheight=reheight.toString()+"px";
    $(".adv").css("width",rwidth);
    $(".adv").css("height",rheight);
	$(".adv").css("margin-top",rhheight);
    $(".adv").css("margin-left",rhwidth);
	$(".chazi").css("margin-left",chawidth);
	$(".chazi").css("margin-top",rhheight);
	$(".adv").css("background-size","100% 100%");
}

function updateMoney(  ){
    
}
function dobackUpdateMoney( result  ){
     result = eval("("+ result +")"); 
	    money = result.money ;
            $(".fhnum").html(money);
}

function getUserMoneyFromServer() {
    
}

function dobackGetUserMoney( target ,result ){
        
		result = eval("("+ result +")"); 
	    money = result.money ;
            $(".fhnum").html(money);
	
}

function getUserInfoFromServer() {
        userload=localStorage.getItem("save");
}

function dobackGetUserInfo( target ,result ){
        
		result = eval("("+ result +")"); 
		if(result.length==0){
			if (!this.isLocalStorageAvailable) return;
            userload=localStorage.getItem("save");
		}else{
	    userload=result.userinfo;
		money = result.money ;
		$(".fhnum").html(money);
        localStorage.setItem("save", userload);
        }
	
}


function saveUserInfo(usif) {

}

function dobackSaveUserInfo( target ,result ){

		
}
   

function dobackUseGold( target ,result ){
    if( result == 0 ){
        userInfo.gold -= 10 ;
    }else if( result == -1 ){
        userInfo.gold = 0 ;
    }else{
//        验证未通过;
    }
    if (updateGoldCallback != null) 
        updateGoldCallback.apply(updateGoldCallbackThisObj,[result]);
    //setGold( gold ) ;
}
var callBackStartGame , callBackUpdateScore ;
var callBackStartGameThisObj , callBackUpdateScoreThisObj ;

function paidui( _startgame , _startgameThisObj , _updateScore , _updateScoreThisObj ) {

}
var intervalId = -1 ;
function dobackPaidui( target ,result  ){
    result = eval("("+ result +")"); 
    if( result.ret ==0 ){
        userInfo.rid = result.rid ; 
        if( result.to == 0 ){   
            
        }else{
            callBackStartGame.apply(_startgameThisObj,[]) ;
            isFighting = true ;
        }
        if( intervalId < 0 ){
            intervalId = setInterval(updatetime ,1000) ;
        }
    }
}
function updatetime(  ){

}
var isFighting = false ;
function dobackUpdatetime( target ,result  ){
    result = eval("("+ result +")"); 
    if( result.ret ==0 ){
        if( result.begin == 1 ){
            if( !isFighting ){  //
                otherInfo.score = result.score ;
                otherInfo.otherisover = result.otherisover ;                
                callBackStartGame() ;
                isFighting = true ;
            }else if( otherInfo.score != result.score || otherInfo.otherisover != result.otherisover ){
                otherInfo.score = result.score ;
                otherInfo.otherisover = result.otherisover ;
                callBackUpdateScore( result ) ;
            }
        }
    }    
}
function updateScore( value ){

}
function dobackUpdatescore( target ,result  ){

    
}
// ------------------------------------------使用金币和回调
function useGoldFromServer(callb,thisObj,value) {
   
}
// -------------------------------使用道具
var lastcount = 0;
function useToolFromServer(callb,thisObj,tid,count) {

}
function dobackUseTool( target ,result ){   //充值到自己服务器
    if( result == 0 ){
        console.info("成功tool_"+toolid);
        userInfo[ "tool_" + toolid ] -= lastcount ;
    }else{
        console.info("tool_" + toolid +"使用失败:"+ result );
    }
    if (updateToolCallback != null) 
        updateToolCallback.apply(updateToolCallbackThisObj,[result]);
}

function dobackPayGold( target ,result ){   //充值到自己服务器
    if( result == 0 ){
        console.info("成功"+payGold);
        userInfo.gold += payGold ;
    }else{
        console.info("失败:"+ result );
    }
}
var payGold = 0 ;    //当前充值金额;

function payGoldToServer( value ){
    
}

function addTool2Server( id , num ){
    
}
function dobackAddTool(target ,result ){   //充值到自己服务器
    if( result == 0 ){
        console.info("成功"+ "tool_"+ toolid +":"+ toolNum );
        userInfo["tool_"+ toolid] = parseInt(userInfo["tool_"+ toolid]) + parseInt(toolNum) ;
    }else{
        console.info("失败:"+ result );
    }
}

var isInGame = true ; //是否在游戏内,好多游戏从body事件就监听并阻止了;
function payAlert( _gameId  , callback ,thisObj ){
    // isInGame = false ;   //isInGame = true 代码在hl.js 中
    gameId = _gameId ;

    showPayPanel();

    payPanelCallback = callback ;
    payPanelCallbackThisObj = thisObj;

    setTimeout( initBuy, 100  ) ;
    // initBuy();
}

function initBuy( _codeFailed ){

}

function getPicBack( data ,result )
{
    result = tran2Obj(result) ;
    if( result.picUrl == undefined || result.picUrl.length == 0){  //错误
        showInfo("验证码获取失败");
        console.info("验证码获取失败");
    }else{
        var question = document.getElementById("question") ;
        question.src = result.picUrl ;
        userInfo.confirmId = result.confirmId ;   
        if( !codeFailed ){  //如果验证码输入错误,直接刷新,
            showInfo("验证码获取成功");
        }         
    }    
}

function tran2Obj( result ){
    var temp ={} ;
    try{
        temp = eval("(" + result + ")") ;
    }catch(e){
        var xml = loadXML(result ) ;
        var list = xml.firstChild.childNodes ;
        listLen = list.length ;
        var key ;
        var value ;
        for( var z = 0 ; z < listLen ; z++ ){
            key = xml.firstChild.childNodes[z].tagName ;
            value = xml.firstChild.childNodes[z].textContent ;
            temp[key] = value ;
        }
    }    
    return temp;
}

//  解析xml 的案例代码 ，可以不用删除
function xml2Obj( result ){
    var xml = loadXML(result ) ;
    var list = xml.firstChild.childNodes ;
    listLen = list.length ;
    var key ;
    var value ;
    for( var z = 0 ; z < listLen ; z++ ){
        key = xml.firstChild.childNodes[z].tagName ;
        value = xml.firstChild.childNodes[z].textContent ;
        userInfo[key] = value ;
    }
}

//点击确认购买
function submitClick(){
    
}
function showInfo( content ){
    errorTxt = document.getElementById("message") ;
    errorTxt.innerHTML= "提示:" + content ;
}

//确认购买成功后返回
function dobackSubmit( target , result ){    
    var obj = tran2Obj(result) ;
    
    if( obj.hRet == 0 ){ //成功
        if( payGoldValue == "1_1" ){
            disableFirst() ;
        }
        hidePayPanel() ;
        if( !multiple ){
            payGoldToServer( payGoldValue ) ;
        }else{
            toolid = payGoldValue.split("_")[0] ;
            toolNum = payGoldValue.split("_")[1] ;
            addTool2Server( toolid , toolNum );
        }        
        showInfo("验证码正确;购买成功");
        doAlert("道具购买成功!");
    }else{
        showInfo("验证码错误,请继续购买");
        initBuy( true );
    }
}
var codeFailed = false ;

function getToolCount(tid)
{
	if (userInfo["tool_"+tid] == undefined)
		return 0;
	return userInfo["tool_"+tid];
}

