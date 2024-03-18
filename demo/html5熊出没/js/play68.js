function play68_init() {
	updateShare(0);
}

function goHome() {
	window.location.href = HOME_PATH;
}

function play68_submitScore(score) {
	updateShareScore(score);
	//show_share();
}

function updateShare(bestScore) {
	/*imgUrl = 'http://appthink.duapp.com/3dbear/3dbearicon.png';
	var domains = ['www.lieqicun.com','www.lieqicun.cn','www.lieqicun.net','115.29.44.52'];
	var domain = domains[new Date().getTime()%4];
	lineLink = 'http://'+domain+'/game/11/game.html';
	descContent = "反向跑酷没玩过吧？快来一起跑！";*/
/*	updateShareScore(bestScore);
	appid = '';*/
}

function updateShareScore(bestScore) {
	//这里是完成
	//console.log(bestScore);
	if(bestScore > 0) {
		//shareTitle = "我在《3D熊出没》被追了" + bestScore + "米，你跑了多远？！";
	}
	else{
		//shareTitle = "超华丽跑酷《3D熊出没》，你能跑多远？";
	}
}
var pointerRand = 0; 
function RandQuestion(Questions){
	var getQuestionLength = Questions.length; 
	var Rando= pointerRand;
	pointerRand++;
	if(pointerRand == getQuestionLength){
		pointerRand  = 0; 
	}
	var istring = ''; 
		istring += '<h2 qustionid="'+Questions[Rando].question_id+'" answerid="'+Questions[Rando].answer_id+'">'+Questions[Rando].title+'</h2>';
            istring+='<ul>';
			for(var i=0; i< Questions[Rando].answerarr.length; i++){
				istring+='<li><label><input type="radio" name="radioAll" value="'+Questions[Rando].answerarr[i].answer_id+'" >'+Questions[Rando].answerarr[i].answer_title+'</label></li>';	
			}
            istring+='</ul>';
	$("#QuestionLi").html(istring);
	$("#QustionPop").show();
}
var jf = 0, qst= 0, rightnu = 0;  
function SureFun(){
	qst++;
	var getRadioValue = $("input[name=radioAll]:checked").val();
	if(getRadioValue!=undefined){
		var getAnswerId = $("#QuestionLi").find("h2").attr('answerid');
		if(getRadioValue == getAnswerId){
			jf = jf + 1000; 
			rightnu++;
			
		
		}else{
			$("#jfen").text(jf+" ("+rightnu+"/"+qst+")");
		}
			$("#jfen").text(jf+" ("+rightnu+"/"+qst+")("+Math.floor((rightnu/qst)*100)+"%)");
		$("#QustionPop").hide();
		StartG();
	}
}
var questionsArray = questionsCKD;
function ureF(getSJ){
	//var getSJ = $("#SurType").val(); 

	if(getSJ != ""){
		$("#SelectDKS").hide();
		if(getSJ == "CKD"){
			questionsArray =questionsCKD; 
			return false;	
		}
		if(getSJ == "FBU"){
			questionsArray =questionsFBU; 	
			return false;	
		}
		if(getSJ == "HPV"){
			questionsArray =questionsHPV; 	
			return false;	
		}
		if(getSJ == "RS"){
			questionsArray =questionsRS; 	
			return false;	
		}
		
	}
}