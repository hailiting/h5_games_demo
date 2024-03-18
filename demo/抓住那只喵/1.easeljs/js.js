/**
 * Created by DLTB on 2015/2/21.
 */
var stage = new createjs.Stage("gameView");

var gameView = new createjs.Container();
stage.addChild(gameView);

var s = new createjs.Shape();
s.graphics.beginFill("red");
s.graphics.drawCircle(50,50,25);
s.graphics.endFill();
gameView.addChild(s);

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);