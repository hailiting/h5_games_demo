/**
 * Created by DLTB on 2015/2/21.
 */
/*绘制圆*/
function Circle(){
    createjs.Shape.call(this);//调用构造方法
    this.setCircleType=function(type){
        this.circleType = type;
        switch (type){
            case Circle.TYPE_UNSELECTED:
                this.setColor("gray");
                break;
            case Circle.TYPE_SELECTED:
                this.setColor("orange");
                break;
            case Circle.TYPE_CAT:
                this.setColor("red");
                break;
        }
    };

    this.setColor = function (colorString) {
        this.graphics.beginFill(colorString);
        this.graphics.drawCircle(0,0,25);
        this.graphics.endFill();
    };

    this.getCircleType = function () {
        return this.circleType;
    };

    this.setCircleType(1);//默认
}

Circle.prototype = new createjs.Shape();

Circle.TYPE_UNSELECTED = 1;//定义成公共的,可以直接通过类名调用
Circle.TYPE_SELECTED = 2;
Circle.TYPE_CAT = 3;