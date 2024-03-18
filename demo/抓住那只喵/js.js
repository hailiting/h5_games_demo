/**
 * Created by DLTB on 2015/2/21.
 */
/*绘制页面元素*/
var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", stage);

var gameView = new createjs.Container();
gameView.x = 30;
gameView.y = 30;
stage.addChild(gameView);

var circleArr = [[], [], [], [], [], [], [], [], []];//9个

function addCircles() {
    for (var indexY = 0; indexY < 9; indexY++) {
        for (var indexX = 0; indexX < 9; indexX++) {
            var c = new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY] = c;
            c.indexX = indexX;
            c.indexY = indexY;
            //c.x = indexX * 55;
            c.x = indexY % 2 ? indexX * 55 + 25 : indexX * 55;
            c.y = indexY * 55;

            if (indexX == 4 && indexY == 4) {//绘制猫
                c.setCircleType(3);
                currentCat = c;
            }
            c.addEventListener("click", circleClicked);//监听
        }
    }
}

/*逻辑*/
var currentCat;

function circleClicked(e) {
    if (e.target.getCircleType() != Circle.TYPE_CAT) {//不是猫
        e.target.setCircleType(Circle.TYPE_SELECTED);
        return;//不再运行,等待下次点击
    }

    if (currentCat.indexX == 0 || currentCat.indexX == 8 || currentCat.indexY == 0 || currentCat.indexY == 8) {//边界
        alert("游戏失败");
    }

    /*逻辑(还没睡醒的那只喵的喵)*/
    var leftCircle = circleArr[currentCat.indexX - 1][currentCat.indexY];//左
    var rightCircle = circleArr[currentCat.indexX + 1][currentCat.indexY];//右
    var leftTopCircle = circleArr[currentCat.indexX - 1][currentCat.indexY - 1];//左上
    var rightTopCircle = circleArr[currentCat.indexX][currentCat.indexY - 1];//右上
    var leftBottomCircle = circleArr[currentCat.indexX-1][currentCat.indexY + 1];//左下
    var rightBottomCircle = circleArr[currentCat.indexX][currentCat.indexY + 1];//右下
    if (leftCircle.getCircleType() == 1) {//空的
        leftCircle.setCircleType(3);//猫来了
        currentCat.setCircleType(1);//原先的没了
        currentCat = leftCircle;
    } else if (rightCircle.getCircleType() == 1) {
        rightCircle.setCircleType(3);
        currentCat.setCircleType(1);
        currentCat = rightCircle;
    } else if (leftTopCircle.getCircleType() == 1) {
        leftTopCircle.setCircleType(3);
        currentCat.setCircleType(1);
        currentCat = leftTopCircle;
    }else if (rightTopCircle.getCircleType() == 1) {
        rightTopCircle.setCircleType(3);
        currentCat.setCircleType(1);
        currentCat = rightTopCircle;
    }else if (leftBottomCircle.getCircleType() == 1) {
        leftBottomCircle.setCircleType(3);
        currentCat.setCircleType(1);
        currentCat = leftBottomCircle;
    }else if (rightBottomCircle.getCircleType() == 1) {
        rightBottomCircle.setCircleType(3);
        currentCat.setCircleType(1);
        currentCat = rightBottomCircle;
    }else{
        alert("你赢了");
    }
}

addCircles();