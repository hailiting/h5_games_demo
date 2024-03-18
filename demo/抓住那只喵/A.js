/**
 * Created by DLTB on 2015/2/21.
 */
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
            }else if(Math.random()<0.1){//默认的不能走的点
                c.setCircleType(Circle.TYPE_SELECTED);
            }
            c.addEventListener("click", circleClicked);//监听
        }
    }
}

/*逻辑*/
var currentCat;
var MOVE_NONE = -1, MOVE_LEFT = 0, MOVE_UP_LEFT = 1, MOVE_UP_RIGHT = 2, MOVE_RIGHT = 3, MOVE_DOWN_RIGHT = 4, MOVE_DOWN_LEFT = 5;

function getMoveDir(cat) {//方向

    var distanceMap = [];
    //left
    var can = true;
    for (var x = cat.indexX; x >= 0; x--) {
        if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_LEFT] = cat.indexX - x;//左边可以动区域
            break;
        }
    }
    if (can) {
        return MOVE_LEFT;
    }
    //left up
    can = true;
    var x = cat.indexX, y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_UP_LEFT] = can.indexY - y;
            break;
        }
        if (y % 2 == 0) {
            x--;
        }
        y--;
        if (y < 0 || x < 0) {//出界
            break;
        }
    }
    if (can) {
        return MOVE_UP_LEFT;
    }
    //right up
    can = true;
    x = cat.indexX;
    y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_UP_RIGHT] = can.indexY - y;
            break;
        }
        if (y % 2 == 1) {//单双行
            x++;
        }
        y--;
        if (y < 0 || x > 8) {//出界
            break;
        }
    }
    if (can) {
        return MOVE_UP_RIGHT;
    }
    //right
    can = true;

    for (var x = cat.indexX; x < 9; x++) {
        if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_RIGHT] = x - cat.indexX;
            break;
        }
    }
    if (can) {
      //  alert(cat.indexX);
        return MOVE_RIGHT;
    }

    //right down
    can = true;
    x = cat.indexX;
    y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_DOWN_RIGHT] = cat.indexY;
            break;
        }
        if (y % 2 == 1) {
            x++;
        }
        y++;
        if (y > 8 || x > 8) {
            break;
        }
    }
    if (can) {
        return MOVE_DOWN_RIGHT;
    }
    //left down
    can = true;
    x = cat.indexX;
    y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_DOWN_LEFT] = y - cat.indexY;
            break;
        }
        if (y % 2 == 0) {
            x--;
        }
        y++;
        if (y > 8 || x < 0) {
            break;
        }
    }
    if (can) {
        return MOVE_DOWN_LEFT;
    }
    /*处理6个方向都有东西的情况*/
    var maxDir = -1,maxValue = -1;
    for(var dir = 0;dir<distanceMap.length;dir++){
        if(distanceMap[dir]>maxValue){//还有路可走
            maxValue = distanceMap[dir];
            maxDir = dir;
        }
    }
    if(maxValue>1){
        return maxDir;
    }else{
        return MOVE_NONE;
    }
}

function circleClicked(e) {
    if (e.target.getCircleType() == Circle.TYPE_UNSELECTED) {//空的点
        e.target.setCircleType(Circle.TYPE_SELECTED);
    }else{
        return;//不再运行,等待下次点击
    }

    if (currentCat.indexX == 0 || currentCat.indexX == 8 || currentCat.indexY == 0 || currentCat.indexY == 8) {//边界
        alert("那只喵逃掉了.");
           return;
    }

    var dir = getMoveDir(currentCat);
    switch (dir) {
        case MOVE_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX - 1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_UP_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY%2?currentCat.indexX:currentCat.indexX - 1][currentCat.indexY-1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_UP_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY-1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX+1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_DOWN_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY+1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_DOWN_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY%2?currentCat.indexX:currentCat.indexX-1][currentCat.indexY+1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        default :
            alert("成功抓住那只喵.");
    }


}

addCircles();