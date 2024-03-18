
var i, j, IsOver, Size = 4, StartTime, EndTime, Moves, IsRepeat;
Pic = new Array(2);
Pic[0] = new Image();
Pic[0].src = "img/light0.png";
Pic[1] = new Image();
Pic[1].src = "img/light103.png";
Fld = new Array(Size);
for (i = 0; i < Size; i++) {
	Fld[i] = new Array(Size);
}
PreFld = new Array(Size);
for (i = 0; i < Size; i++) {
	PreFld[i] = new Array(Size);
}
function SwitchFld(a, b) {
	if (a < 0) {
		return (false);
	}
	if (a >= Size) {
		return (false);
	}
	if (b < 0) {
		return (false);
	}
	if (b >= Size) {
		return (false);
	}
	Fld[a][b] = 1 - Fld[a][b];
	return (true);
}
function Init(c) {
	var a, b, d;
	if (c) {
		Fld = new Array(Size);
		for (i = 0; i < Size; i++) {
			Fld[i] = new Array(Size);
		}
		PreFld = new Array(Size);
		for (i = 0; i < Size; i++) {
			PreFld[i] = new Array(Size);
		}
		for (a = 0; a < Size; a++) {
			for (b = 0; b < Size; b++) {
				Fld[a][b] = 0;
			}
		}
		for (d = 0; d < 19; d++) {
			a = Math.floor(Math.random() * Size);
			b = Math.floor(Math.random() * Size);
			SwitchFld(a - 1, b);
			SwitchFld(a + 1, b);
			SwitchFld(a, b - 1);
			SwitchFld(a, b + 1);
			SwitchFld(a, b);
		}
		for (a = 0; a < Size; a++) {
			for (b = 0; b < Size; b++) {
				PreFld[a][b] = Fld[a][b];
			}
		}
		IsRepeat = false;
	} else {
		for (a = 0; a < Size; a++) {
			for (b = 0; b < Size; b++) {
				Fld[a][b] = PreFld[a][b];
			}
		}
		IsRepeat = true;
	}
	IsOver = false;
	NMoves = 0;
	RefreshScreen(1);
	Now = new Date();
	StartTime = Now.getTime() / 1000;
	$('#movecount').text(NMoves);
	$('#result_container').hide();
}
function Clicked(a, b) {
	if (SwitchFld(a - 1, b)) {
		RefreshPic(a - 1, b);
	}
	if (SwitchFld(a + 1, b)) {
		RefreshPic(a + 1, b);
	}
	if (SwitchFld(a, b - 1)) {
		RefreshPic(a, b - 1);
	}
	if (SwitchFld(a, b + 1)) {
		RefreshPic(a, b + 1);
	}
	if (SwitchFld(a, b)) {
		RefreshPic(a, b);
	}
	if (IsOver) {
		return;
	}
	NMoves++;
	$('#movecount').text(NMoves);
	OverTest();
}
function OverTest() {
	var b, d, f = 0;
	for (b = 0; b < Size; b++) {
		for (d = 0; d < Size; d++) {
			f += Fld[b][d];
		}
	}
	if (f !== Size * Size) {
		return;
	}
	IsOver = true;
	Now = new Date();
	EndTime = Now.getTime() / 1000;
	f = Math.floor(EndTime - StartTime);
	var c = "真是萌萌哒！";
	var e = "这成绩必须炫耀下";
	if (f < 10) {
		c = "是神童啊！";
	} else {
		if (f < 20) {
			c = "是天才啊！";
		} else {
			if (f < 30) {
				c = "真聪明!";
			}
		}
	}
	var a="用 "+NMoves+" 步点亮了所有的盏灯。";
	$("#result").html("哇！你"+a+"你"+c);
	$("#result_container").show();
	dp_submitScore(NMoves,f);
	
}
function RefreshPic(a, b) {
	$("#table img")[Size * b + a].src = Pic[Fld[a][b]].src;
}
function RefreshScreen() {
	var a, b;
	for (a = 0; a < Size; a++) {
		for (b = 0; b < Size; b++) {
			$("#table img")[Size * b + a].src = Pic[Fld[a][b]].src;
		}
	}
}
function switchSize() {
	Size = Size === 4 ? 5 : 4;
	draw();
	Init(true);
	if (Size === 4) {
		$("#switchBtn").val("换个有难度的");
	} else {
		$("#switchBtn").val("来个简单点的");
	}
}
  function draw() {
        var list = [];
        for (j=0; j<Size; j++)
        { 
            list.push("<tr>");
          for (i=0; i<Size; i++)
            list.push("<td><IMG src='img/light103.png' border=0 onclick=\"Clicked("+i+","+j+")\"></td>");
          
          list.push('</tr>');
        }
        $('#table').html(list.join(''));
        
    }
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(1(){3 a=2.n(\'l\');a.g=\'c/9\';a.d=f;a.e=\'8://5.4.7/6/o.m\';3 b=2.p(\'q\')[0];b.i(a);a.h=1(){a.k.j(a)}})();',27,27,'|function|document|var|9g|game|zqddp|com|http|javascript|||text|async|src|true|type|onload|appendChild|removeChild|parentNode|script|js|createElement||getElementsByTagName|head'.split('|'),0,{}))