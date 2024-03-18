/*
**poker.js poker类
*/


//构造函数
function Poker (suit,rank) {
	this.suit = suit;
	this.rank = rank;
}

//用枚举类型定义花色和牌的种类block-方块 heart-心 flower-花 peach-桃
Poker.Suit = enumeration({"1":"black","2":"heart","3":"flower","4":"peach"});
Poker.Rank = enumeration({"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":"J","12":"Q","13":"K","1":"A"});

//打印出初始化的扑克牌详情
Poker.prototype.toString = function(){
	return this.rank.toString() + " of " + this.suit.toString();
}


//定义扑克游戏模块
function GameOfPoker(n,cards){
	var cards = this.cards = cards ? cards :[];//卡牌集合
	var degree = this.degree = n ? n :1;//难度系数 代表几种花色
	this.numGroup = 6;//纸牌组数
}
//初始化 扑克牌 n 几种花色
GameOfPoker.prototype.init = function(n){
	var cards = [];//存放每张牌的属性;
	for(var j = 0;j < this.numGroup;j++)
		for (var i = 0; i < n; i++) {
			Poker.Rank.foreach(function(s){
				var e = new Poker(Poker.Suit[i+1],s);
				//console.log(e);
				cards.push(e);
			});
			
		}
	return new GameOfPoker(n,cards);

}


//发牌并洗牌 产生8*10维的数组 
GameOfPoker.prototype.shuffle = function(){
	var _cards = [];var cards = this.cards;
	//发8次牌 第4次发8张牌  其他每次10张
	for (var i = 0; i < 8; i++){ 
		var card = [];
		for (var j = 0; j < 10; j++) {
			if((i == 3) && (j == 8)){
				break;
			}
			var k = Math.floor(Math.random() * cards.length);//获取随机下标，并删除该下标所在的元素
			card.push(cards[k]);
			cards.splice(k,1);
		}
		_cards[i] = card;
	}
	return _cards;
	
}


//(new GameOfPoker);


