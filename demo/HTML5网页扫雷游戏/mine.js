$(document).ready(function(){

// 所有的格子
	var board = [
		"11", "12", "13", "14", "15", "16", "17", "18", "19",
		"21", "22", "23", "24", "25", "26", "27", "28", "29",
		"31", "32", "33", "34", "35", "36", "37", "38", "39", 
		"41", "42", "43", "44", "45", "46", "47", "48", "49",
		"51", "52", "53", "54", "55", "56", "57", "58", "59", 
		"61", "62", "63", "64", "65", "66", "67", "68", "69", 
		"71", "72", "73", "74", "75", "76", "77", "78", "79", 
		"81", "82", "83", "84", "85", "86", "87", "88", "89", 
		"91", "92", "93", "94", "95", "96", "97", "98", "99"];
	
// 重置地雷位置函数
//	var mines = ["22", "24", "35", "38", "43", "64", "73", "77", "87", "89"];

	var mines = [];
	var resetMines = function(){
		while(mines.length <10){
			var a = Math.floor(Math.random()*82);
			if(jQuery.inArray(board[a],mines) < 0){
				mines.push(board[a]);
			}
		}
	}
	
// 地雷初始位置
	resetMines();

// 显示周围地雷数的函数
	var minesNumber = function(box, mines){
		var around = [
			parseInt(box)-11, parseInt(box)-10, parseInt(box)-9, 
			parseInt(box)-1, parseInt(box)+1, parseInt(box)+9, 
			parseInt(box)+10, parseInt(box)+11];
		var number = 0;
		for(i=0; i<around.length; i++){
			if(jQuery.inArray(around[i].toString(), mines) >= 0){
				number++;
			}
		}
		return number;
	}


// 自动打开的函数
	var flipzero = function(mines){
		for(i in board){
			var around = [
				parseInt(board[i])-11, parseInt(board[i])-10, parseInt(board[i])-9, 
				parseInt(board[i])-1, parseInt(board[i])+1, parseInt(board[i])+9, 
				parseInt(board[i])+10, parseInt(board[i])+11];

			if(($("#"+board[i]).attr("class") == "fliped") && (minesNumber(board[i], mines) == 0)){
				for(i in around){
					var box = around[i].toString();
					$("#"+box).removeClass("flag");
					$("#"+box).empty();
					$("#"+box).addClass("fliped");
					if(minesNumber(box,mines) > 0){
						$("#"+box).text(minesNumber(box,mines));
					}
				}
			}
		}
	}

// 计时器
	var c = 0;
	var t;
	window.timeCount = function(){
		$("#timediv").text(c);
		c += 1;
		t = setTimeout("timeCount()",1000);
	}


// 重置的函数
	var reset = function(){
		for(i in board){
			$("#"+board[i]).removeClass("fliped");
			$("#"+board[i]).removeClass("flag");
			$("#"+board[i]).removeClass("mine");
			$("#"+board[i]).empty();
			$("#"+board[i]).css("background-color","#b2b2b2");
		}
	}

// 显示剩余雷数
	$("#minesnumberdiv").text(mines.length);




////////////////////////
// 点击笑脸后发生的事 //
////////////////////////
	$("#face").mousedown(function(){
		$(this).css("border-bottom","4px solid #e6e6e6");
		$(this).css("border-right","4px solid #e6e6e6");
		$(this).css("border-left","4px solid #666666");
		$(this).css("border-top","4px solid #666666");
		reset();
		clearTimeout(t);
		c = 0;
		$("#timediv").text("0");
		$(this).html("<img src='smile.png'/>");
		// 重置雷数
		$("#minesnumberdiv").text(mines.length);
		// 重置地雷位置
		mines = [];
		resetMines();
	});
	$("#face").mouseup(function(){
			$(this).css("border-top","4px solid #e6e6e6");
			$(this).css("border-left","4px solid #e6e6e6");
			$(this).css("border-right","4px solid #666666");
			$(this).css("border-bottom","4px solid #666666");

	});

////////////////////////
// 点击格子后发生的事 //
////////////////////////
	$("div>div").mousedown(function(m){
	if(m.which == 1){
		if($(this).attr("class") == "fliped"){

		}
		
		// 原始状态
		else {	
			// 如果有雷
			if(jQuery.inArray($(this).attr("id"),mines) >= 0){
				for(i in mines){
					$("#"+mines[i]).addClass("mine");
					$("#"+mines[i]).html("<img src='mine.png'/>");
				}
				$(this).css("background","red");
				$("#face").html("<img src='sad.png'/>");
				clearTimeout(t);
			}
			// 如果没有雷		
			else {
				// 检查是不是第一步
				var checkStart = 0;
				for(i in board){
					var cc = $("#"+board[i]).attr("class");
					if(cc == "fliped" || cc == "flag" || cc == "mine"){
						checkStart++;
					}
				}
				if(checkStart == 0){
					timeCount();
				}	
				
				////	
				$(this).addClass("fliped");
				if(minesNumber($(this).attr("id"),mines) > 0){
					$(this).text(minesNumber($(this).attr("id"),mines));
				}
				else{
					var around = [
						parseInt($(this).attr("id"))-11, parseInt($(this).attr("id"))-10, parseInt($(this).attr("id"))-9, 
						parseInt($(this).attr("id"))-1, parseInt($(this).attr("id"))+1, parseInt($(this).attr("id"))+9, 
						parseInt($(this).attr("id"))+10, parseInt($(this).attr("id"))+11];
					for(i in around){
						// 变量
						var box = around[i].toString();
						$("#"+box).removeClass("flag");
						$("#"+box).empty();
						$("#"+box).addClass("fliped");
						if(minesNumber(box,mines) > 0){
							$("#"+box).text(minesNumber(box,mines));
						}
					}
					flipzero(mines);
					flipzero(mines);
					flipzero(mines);
					flipzero(mines);
					flipzero(mines);
					flipzero(mines);
					flipzero(mines);
					flipzero(mines);

				}
				// 检查是不是已完成
				var flipedNum = 0;
				for(i in board){
					if($("#"+board[i]).attr("class") == "fliped"){
						flipedNum++;
					}
				}
				if(flipedNum == board.length - mines.length){
					$("#face").html("<img src='pride.png'/>");
					clearTimeout(t);
				}
			}	
		}
	}
	else if(m.which == 2){
		// 已翻开
		if($(this).attr("class") == "fliped"){
			var around = [
				parseInt($(this).attr("id"))-11, parseInt($(this).attr("id"))-10, parseInt($(this).attr("id"))-9, 
				parseInt($(this).attr("id"))-1, parseInt($(this).attr("id"))+1, parseInt($(this).attr("id"))+9, 
				parseInt($(this).attr("id"))+10, parseInt($(this).attr("id"))+11];
			var flagnumber = 0;
			for(i in around){
				var box = around[i].toString();
				if($("#"+box).attr("class") == "flag"){
					flagnumber++;	
				}
			}

			if(minesNumber($(this).attr("id"),mines) == flagnumber){
				for(i in around){
					var box = around[i].toString();
					// 翻错旗子game over
					if((jQuery.inArray(box,mines) >= 0) && ($("#"+box).attr("class") != "flag")){
						for(i in mines){
							$("#"+mines[i]).addClass("mine");
							$("#"+mines[i]).html("<img src='mine.png'/>");
						}
						$("#"+box).empty()
						$("#"+box).html("<img src='minex.png'/>");
						clearTimeout(t);
					}
					else if(($("#"+box).attr("class") != "fliped") && ($("#"+box).attr("class") != "flag") && (jQuery.inArray(box,mines) < 0)){
						$("#"+box).addClass("fliped");
						if(minesNumber(box,mines) > 0){
							$("#"+box).text(minesNumber(box,mines));
						}
						flipzero(mines);
						flipzero(mines);
					}
				}
			}


				// 检查是不是已完成
				var flipedNum = 0;
				for(i in board){
					if($("#"+board[i]).attr("class") == "fliped"){
						flipedNum++;
					}
				}
				if(flipedNum == board.length - mines.length){
					$("#face").html("<img src='pride.png'/>");
					clearTimeout(t);
				}
				///////////////////
			
		}
		// 有旗子
		else if($(this).attr("class") == "flag"){
			$(this).removeClass("flag");
			$(this).empty();

			// 检查并显示剩余雷数
			var flagNum = 0;
			for(i in board){
				if($("#"+board[i]).attr("class") == "flag"){
					flagNum++;
				}
			}
			$("#minesnumberdiv").text(mines.length - flagNum);
		}
		// 原始
		else{
			$(this).addClass("flag");
			$(this).html("<img src='flag.png'/>");

			// 检查并显示剩余雷数
			var flagNum = 0;
			for(i in board){
				if($("#"+board[i]).attr("class") == "flag"){
					flagNum++;
				}
			}
			$("#minesnumberdiv").text(mines.length - flagNum);

		}
	}
	});



	
});
