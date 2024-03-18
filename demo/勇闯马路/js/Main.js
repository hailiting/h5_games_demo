LGlobal.aspectRatio = PORTRAIT;  //LANDSCAPE;
var iWidth = 800;
var iHeight = 1280;
init(50, "zbox", iWidth, iHeight, main);
var loadingLayer, imgList;
//游戏底层
var baseLayer;
//背景层
var backLayer;
//人物(车)层
var charaLayer;
//按钮层
var butLayer;
var stopFlag = false;
var _car = null;
var _hero = null;
//出现车的几率
var showCar = 20;
//英雄速度
var heroSpeed = 15;  //点击一次运动距离
//英雄移动距离
var heroPoints = 0;
var pointsY = 32;        //得分等于距离除以
//是否游戏结束
var gameover = false;
var overtime = 2;        //结束后等待时间（秒）
var overTimeout;        //结束定时器
var gameTime = 90 * 1000;      //游戏限时(毫秒)
var startTime = 0;      //游戏持续时间(毫秒)
var succeed_count = 25;     //规定时间内过的马路数超过这个值则为成功
var loadData = [
    { name: "but_down", path: "images/but_down.png" }
    , { name: "but_reset", path: "images/but_reset.png" }
    , { name: "but_start", path: "images/but_start.png" }
    , { name: "but_stop", path: "images/but_stop.png" }
    , { name: "but_up", path: "images/but_up.png" }
    , { name: "che_1", path: "images/che_1.png" }
    , { name: "che_r_1", path: "images/che_r_1.png" }
    , { name: "che_2", path: "images/che_2.png" }
    , { name: "che_3", path: "images/che_3.png" }
    , { name: "che_4", path: "images/che_4.png" }
    , { name: "che_5", path: "images/che_5.png" }
    , { name: "che_6", path: "images/che_6.png" }
    , { name: "che_7", path: "images/che_7.png" }
    , { name: "gou", path: "images/gou.png" }
    , { name: "daolu", path: "images/daolu.png" }
    , { name: "over_page", path: "images/over_page.png" }
    , { name: "start_page", path: "images/start_page.png" }
    , { name: "renxingdao", path: "images/renxingdao.png" }
    , { name: "zbox_chezhuang", path: "images/zbox_chezhuang.png" }
    , { name: "zbox_deng", path: "images/zbox_deng.png" }
    , { name: "zbox_gouyao", path: "images/zbox_gouyao.png" }
    , { name: "zbox_zou", path: "images/zbox_zou.png" }
    , { name: "tip_text", path: "images/tip_text.png" }
    , { name: "game_tip", path: "images/game_tip.png" }
    , { name: "tip_time", path: "images/tip_time.png" }
    , { name: "tip_over", path: "images/tip_over.png" }
    , { name: "but_succeed_reset", path: "images/but_succeed_reset.png" }
    , { name: "succeed_bg", path: "images/succeed_bg.png" }
    , { name: "over_time", path: "images/over_time.png" }
    , { type: "js", path: "js/pay/Welcome.js" }
    , { type: "js", path: "js/pay/Background.js" }
    , { type: "js", path: "js/pay/Character.js" }
    , { type: "js", path: "js/pay/CharacterList.js" }
    , { type: "js", path: "js/pay/Player.js" }
    , { type: "js", path: "js/pay/Button.js" }
    , { type: "js", path: "js/pay/Gover.js" }
];

var ACTION = { DENG: 0, ZOU: 1, CHEZHUANG: 2, GOUYAO: 3 };
//方向
var DIRECTION = { RIGHT: "right", LEFT: "left" };
function main() {
    if (LGlobal.mobile) {
        LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
        LSystem.screen(LStage.FULL_SCREEN);
    }
    loadingLayer = new LoadingSample4();
    addChild(loadingLayer);
    LLoadManage.load(loadData, function (progress) {
        loadingLayer.setProgress(progress);
    }, gameInit);
}

//游戏初始化
function gameInit(result) {
    imgList = result;
    removeChild(loadingLayer);
    loadingLayer = null;

    //初始层
    baseLayer = new LSprite();
    addChild(baseLayer);
    baseLayer.addChild(new Welcome());
}

//游戏开始
function gameStart() {
    //shareInit();
    stopFlag = false;
    heroPoints = 0;
    gameover = false;
    overTimeout = null;
    startTime = 0;
    baseLayer.removeAllChild();
    //背景层
    backLayer = new LSprite();
    backLayer.posY = 0;
    baseLayer.addChild(backLayer);
    //人物层
    charaLayer = new LSprite();
    baseLayer.addChild(charaLayer);
    //按钮层
    butLayer = new LSprite();
    baseLayer.addChild(butLayer);
    butLayer.button = new Button();
    butLayer.addChild(butLayer.button);

    //添加默认车道
    backLayer.addChild(new Background("top"));
    backLayer.addChild(new Background("malu"));
    backLayer.addChild(new Background("malu"));
    backLayer.addChild(new Background("malu"));
    backLayer.addChild(new Background("renxingdao"));

    //添加英雄
    var heroData = CharacterList.hero();
    _hero = new Player(heroData, "hero", 2);
    _hero.anime.x = 360;
    _hero.anime.y = 28;
    charaLayer.addChild(_hero);
    baseLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
}

//游戏结束
function over(type) {
    baseLayer.removeAllChild();
    backLayer = null;
    charaLayer = null;
    butLayer = null;
    baseLayer.gover = new Gover(type);
    baseLayer.addChild(baseLayer.gover);
}

//隐藏结果层
function closetip() {
    return;
    if (!baseLayer.gover) return;
    if (baseLayer.gover.tip_over) baseLayer.gover.removeChild(baseLayer.gover.tip_over);
    if (baseLayer.gover.txt1) baseLayer.gover.removeChild(baseLayer.gover.txt1);
    if (baseLayer.gover.txt2) baseLayer.gover.removeChild(baseLayer.gover.txt2);
    if (baseLayer.gover.txt_share) baseLayer.gover.removeChild(baseLayer.gover.txt_share);
    for (var i = 0; i <= 3; i++) eval("if(baseLayer.gover.desc_" + i + ")baseLayer.gover.removeChild(baseLayer.gover.desc_" + i + ");");
}

var min_speed = 40, max_speed = 130;
//添加车
function addCar(back) {
    var carData = CharacterList.car(back.back.y);
    _car = new Player(carData, back.name);
    _car.back = back;
    _car.anime.x = back.direction == DIRECTION.LEFT ? _car.poxX : (iWidth - _car.poxX);
    _car.anime.y = _car.poxY;
    var ms = min_speed;
    if (back.cars < 1 && back._speed > 0 && back._speed < 80) ms = min_speed + parseInt(getnum(min_speed, max_speed - min_speed) / 5);
    var _speed = getnum(ms, back.cars < 1 ? max_speed : back._speed);
    back._speed = _speed;
    _car._speed = _speed;
    if (_car.cheIndex == 0 && back.direction == DIRECTION.RIGHT) _car.anime.bitmap.bitmapData = new LBitmapData(imgList["che_r_1"], 0, 0, 1078 / 2, 181);
    _car.anime.setAction(0, 0, null, back.direction == DIRECTION.RIGHT);
    _car.setLocation();
    charaLayer.addChild(_car);
}

function onframe() {
    if (!charaLayer || !charaLayer || !butLayer) return;
    var key = null;
    charaLayer.childList = charaLayer.childList.sort(function (a, b) { return (a.y + a.getHeight()) - (b.y + b.getHeight()); });
    for (key in charaLayer.childList) {
        _car = charaLayer.childList[key];
        if (!_car.back) continue;
        if (!_car.back.allow) continue;
        if (_car.back.direction == DIRECTION.LEFT) {
            if (_car.anime.x <= 0) _car.back.allow = false;
        }
        else {
            if (_car.anime.x >= (iWidth - _car.anime.getWidth() * 0.5)) _car.back.allow = false;
        }
    }
    for (key in backLayer.childList) backLayer.childList[key].onframe();
    for (key in charaLayer.childList) charaLayer.childList[key].onframe();
    if (stopFlag || gameover) return;
    startTime += 45;
    var num = gameTime - startTime;
    if (num <= 0) return over("timeover");
    var m = parseInt(num / (60 * 1000));
    m = m < 10 ? ("0" + m) : m;
    var s = parseInt((num % (60 * 1000)) / 1000);
    s = s < 10 ? ("0" + s) : s;
    var ms = num % 1000;
    ms = ms < 100 ? ("0" + ms) : (ms < 10 ? ("00" + ms) : (ms < 0 ? "000" : ms));
    butLayer.button.timebox.text = m + ":" + s + "'" + ms;
}

//得到随机数
function getnum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

LGlobal.verticalError = function () {
    LGlobal.object.innerHTML = '<img src="images/screenchange.png" style="width:100%" />';
    var f = function () {
        setTimeout(function () { location.href = location.href; }, 100);
    };
    window.onorientationchange = f;
};