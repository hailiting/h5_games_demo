/**

* Created by Administrator on 2014/8/19.

*/
window.liebaoPlatformShare = function (title, imgUrl, cont, url, fun) {
    //游戏酷玩分享
    if (window.updateclient && window.updateclient.updatesharedata) {
        //更新分享数据
        window.updateclient.updatesharedata(title, imgUrl, cont, url);
        //调起客户端分享
        window.updateclient.sharescore();
        return false;
    }
}

var AD = ["res/ad02.png"];

var ADLink = ["http://dl.game.35go.net/weixin/game/tingzhu18/18smiji.html?from=escape18ad"];

var androidAD = ["res/ad05.png", "res/ad04.jpg", "res/ad01.png", "res/ad02.png", "res/ad03.png"];

var androidADLink = ["http://www.liebao.cn/game/ybzsj/?f=escape18", "http://www.ijinshan.com/weixin/cm/shakecola/?f=escape18", "http://www.liebao.cn/game/count_money/?f=escape18", "http://dl.game.35go.net/weixin/game/tingzhu18/18smiji.html?from=escape18ad", "http://www.liebao.cn/game/hitCat/?f=escape18"];

var iosAD = ["res/ad05.png", "res/ad04.jpg", "res/ad01.png", "res/ad02.png", "res/ad03.png"];

var iosADLink = ["http://www.liebao.cn/game/ybzsj/?f=escape18", "http://www.ijinshan.com/weixin/cm/shakecola/?f=escape18", "http://www.liebao.cn/game/count_money/?f=escape18", "http://dl.game.35go.net/weixin/game/tingzhu18/18smiji.html?from=escape18ad", "http://www.liebao.cn/game/hitCat/?f=escape18"];

var adPush = function (b) {

    /*var e = document.createElement("a");

    var a = Math.random() * AD.length >> 0;

    e.target = "_blank";

    e.href = ADLink[a];

    e.addEventListener("touchstart", function() {

    _hmt.push(["_trackEvent", "button", "topAD"]);

    });

    e.style.height = 120 * window.devicePixelRatio/2 + 'px';

    e.style.background = "url(" + AD[a] + ") no-repeat";

    e.style.backgroundSize = "100%";

    e.className = "adbox2";*/



    var d = document.createElement("a");

    if (navigator.userAgent.match(/android/gi) != null) {

        var c = Math.random() * androidAD.length >> 0;

        d.href = androidADLink[c];

        d.style.background = "url(" + androidAD[c] + ") no-repeat bottom";

        _hmt.push(["_trackEvent", "button", "showbottomAndroidAD" + c]);

        d.addEventListener("touchstart", function () {

            _hmt.push(["_trackEvent", "button", "bottomAndroidAD" + c]);

        });

    } else {

        if (navigator.userAgent.match(/iPhone/gi) != null) {

            var c = Math.random() * iosAD.length >> 0;

            d.href = iosADLink[c];

            _hmt.push(["_trackEvent", "button", "showbottomIosAD" + c]);

            d.style.background = "url(" + iosAD[c] + ") no-repeat bottom";

            d.addEventListener("touchstart", function () {

                _hmt.push(["_trackEvent", "button", "bottomIosAD" + c]);

            });

        }

    }

    d.target = "_blank";

    d.style.height = 120 * window.devicePixelRatio / 2 + 'px';

    d.style.backgroundSize = "100%";

    d.className = "adbox";

    if (b) {

        $(".adbox").remove();

        $(".adbox2").remove();

    } else {

        //$("body").append(e);

        $("body").append(d);

    }

};





var headSrc = "res/k_head.png";

var head2Src = null;

var ShareWords = "哥，挺住18秒！躲开条子。这次坚持了1秒，击败了全国1%的人";

var GameLayer = cc.Layer.extend

({



    player: null,

    winSize: null,

    touchBeginPosition: null,

    playerBeginPosition: null,

    isSelected: false,

    playerSize: null,

    playerActualSize: null,

    enmeyList: [],

    enemyDirectionList: [],

    enemySize: [],

    leftBottom: null,

    rightTop: null,

    isStart: false,

    contentLayer: null,

    coefficient: 1.0,

    time: 0.0,

    ctor: function () {

        this._super();

        if ('touches' in sys.capabilities) {

            this.setTouchEnabled(true);

        }

        else if ('mouse' in sys.capabilities)

            this.setMouseEnabled(true);



    },

    //    registerWithTouchDispatcher:function(){

    //        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this,PriorityLayer,true);

    //    },

    onEnter: function () {

        _hmt.push(["_trackEvent", "button", "gameStart"]);

        cc.registerTargetedDelegate(-126, true, this);

        this._super();

    },

    onExit: function () {

        cc.unregisterTouchDelegate(this);

        this._super();

    },



    onTouchBegan: function (touch, event) {

        this.touchBeginPosition = touch.getLocation();

        this.playerBeginPosition = this.player.getPosition();

        var inViewPosition = this.player.convertToNodeSpace(this.touchBeginPosition);

        if (inViewPosition.x > 0 && inViewPosition.x < this.playerSize.width && inViewPosition.y > 0 && inViewPosition.y < this.playerSize.height) {

            this.isSelected = true;

            if (this.isStart == false) {

                this.startGame();

                this.isStart = true;

            }



        }

        return true;

    },

    startGame: function () {

        //update Logic
        this.removeChild(this.tip);
        this.scheduleUpdate();


    },

    update: function (dt) {

        this.time += dt;

        this.coefficient = dt * 40;

        var acceleration = this.time * 0.1;

        if (this.coefficient > 18) this.coefficient = 18;

        var playerRect = cc.rect(this.player.getPosition().x - this.playerActualSize.width / 2,
                        this.player.getPosition().y - this.playerActualSize.height / 2,
                        this.playerActualSize.width, this.playerActualSize.height);

        for (var i = 0; i < this.enmeyList.length; i++) {

            //计算速度增量
            var currentPosition = this.enmeyList[i].getPosition();

            var dPositionX = this.enemyDirectionList[i].x * this.coefficient +
                            (this.enemyDirectionList[i].x / Math.abs(this.enemyDirectionList[i].x)) * acceleration;

            var dPositionY = this.enemyDirectionList[i].y * this.coefficient +
                            (this.enemyDirectionList[i].y / Math.abs(this.enemyDirectionList[i].y)) * acceleration * 2;

            var willPositionX = currentPosition.x + dPositionX;
            var willPositionY = currentPosition.y + dPositionY;


            //碰撞边界
            if (willPositionX < this.leftBottom.x || willPositionX > this.rightTop.x) {

                dPositionX = this.enemyDirectionList[i].x = -this.enemyDirectionList[i].x;

            }

            if (willPositionY < this.leftBottom.y || willPositionY > this.rightTop.y) {

                dPositionY = this.enemyDirectionList[i].y = -this.enemyDirectionList[i].y;

            }

            this.enmeyList[i].setPosition(cc.p(currentPosition.x + dPositionX, dPositionY + currentPosition.y));



            //碰撞检测
            var enemyRect = cc.rect(currentPosition.x - this.enemySize[i].width / 2,
                currentPosition.y - this.enemySize[i].height / 2, this.enemySize[i].width, this.enemySize[i].height);



            if (cc.rectIntersectsRect(enemyRect, playerRect)) {

                if (this.isStart == true) {

                    this.onGameOver();

                    this.isStart = false;

                }

                break;

            }



        }

    },



    onGameOver: function () {



        var words = ["小男人", "宅男", "成年男子", "猛男"];

        var word = words[0];

        var text = 1;

        if (this.time < 1) {//1-10

            word = words[0];

            text = 1 + parseInt((this.time / 1.0) * 9);

        } else if (this.time < 3) {//10-70

            word = words[1];

            text = 10 + parseInt(((this.time - 1) / 2.0) * 60);

        } else if (this.time < 10) {

            word = words[2]; //70-90

            text = 70 + parseInt(((this.time - 3) / 7.0) * 20);



        } else {

            text = 99;

            word = words[3];

        }

        _hmt.push(["_trackEvent", "button", "gameOver", this.time.toFixed(1) + "_s"]);

        if (this.time.toFixed(0) * 1 > 50) {
            ShareWords = "发现一个高分秘籍，哥坚持了" + this.time.toFixed(2) + "秒，你不知道吧！";
        } else {
            ShareWords = "哥，挺住18秒!哥坚持了" + this.time.toFixed(2) + "秒，击败了全国" + text + "%的人，来试试吧！";
        }
        //window['ShareWords'] = ShareWords;


        //ShareWords ="哥，挺住18秒!这次坚持了"+this.time.toFixed(2)+"秒，击败了全国"+text+"%的人";

        this.gameOverLayer = GameOverLayer.create(this.time, text, word);

        this.gameOverLayer.setCallback(this);

        this.addChild(this.gameOverLayer);

        this.time = 0;

        this.unscheduleUpdate();

        cc.AudioEngine.getInstance().playEffect(sound_death);

        this.isSelected = false;

        adPush();

        //$(".ad_banner").css("display","inline");

    },

    onTouchMoved: function (touch, event) {

        if (this.isSelected) {

            var currentMePosition = this.convertToNodeSpace(touch.getLocation());

            var beginMePosition = this.convertToNodeSpace(this.touchBeginPosition);

            this.player.setPosition(this.playerBeginPosition.x + currentMePosition.x - beginMePosition.x, this.playerBeginPosition.y + currentMePosition.y - beginMePosition.y);



        }

    },

    onTouchEnded: function (touch, event) {

        this.isSelected = false;

    },

    playGame: function () {

        try {

            _hmt.push(['_trackEvent', 'escape', 'click', 'start', '1']);

        } catch (e) { }

        this.contentLayer.removeFromParent();

        cc.AudioEngine.getInstance().playEffect(sound_start);



        this.readyGame();



    },

    readyGame: function () {





        if (!this.player) {

            this.leftBottom = cc.p(-20, -20);

            this.rightTop = cc.p(this.winSize.width + 20, this.winSize.height + 20);



            //add Enemy

            var enemy1 = cc.Sprite.create(res_enemy03);

            var enemy2 = cc.Sprite.create(res_enemy04);

            var enemy3 = cc.Sprite.create(res_enemy02);

            var enemy4 = cc.Sprite.create(res_enemy01);



            this.addChild(enemy1);

            this.addChild(enemy2);

            this.addChild(enemy3);

            this.addChild(enemy4);



            this.enmeyList[0] = enemy1;

            this.enmeyList[1] = enemy2;

            this.enmeyList[2] = enemy3;

            this.enmeyList[3] = enemy4;


            this.tip = cc.Sprite.create(res_tiptitle2);
            this.tip.setPosition(this.winSize.width / 2, this.winSize.height / 2 + 100);
            this.tip.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveBy.create(1, cc.p(0, -25)), cc.MoveBy.create(1, cc.p(0, 25)))));
            this.addChild(this.tip);


        }

        if (this.player) {

            this.player.removeFromParent();

        }

        this.player = cc.Sprite.create(headSrc);

        this.playerSize = this.player.getContentSize();

        this.playerActualSize = cc.size(this.player.getContentSize().width - 20, this.player.getContentSize().height - 20);


        this.addChild(this.player);



        this.enemyDirectionList[0] = cc.p(2, 2);

        this.enemyDirectionList[1] = cc.p(-2, 1);

        this.enemyDirectionList[2] = cc.p(-2, -2.1);

        this.enemyDirectionList[3] = cc.p(2, -1.5);



        this.player.setPosition(this.winSize.width / 2, this.winSize.height / 2);



        this.enmeyList[0].setPosition(this.enmeyList[0].getContentSize().width / 2, this.enmeyList[0].getContentSize().height / 2);

        this.enmeyList[1].setPosition(this.winSize.width - this.enmeyList[1].getContentSize().width / 2, this.enmeyList[1].getContentSize().height / 2);

        this.enmeyList[2].setPosition(this.winSize.width - this.enmeyList[2].getContentSize().width / 2, this.winSize.height - this.enmeyList[2].getContentSize().height / 2);

        this.enmeyList[3].setPosition(this.enmeyList[3].getContentSize().width / 2, this.winSize.height - this.enmeyList[3].getContentSize().height / 2);



        for (var i = 0; i < this.enmeyList.length; i++) {

            this.enmeyList[i].setScale(0);

            var action1 = cc.DelayTime.create(parseFloat(Math.random() * 0.5));

            var action2 = cc.EaseBounce.create(cc.Sequence.create(cc.ScaleTo.create(0.3, 1.2), cc.ScaleTo.create(0.3, 1)));

            //console.log(action1)

            this.enmeyList[i].runAction(cc.Sequence.create(action1, action2));

            this.enemySize[i] = cc.size(this.enmeyList[i].getContentSize().width - 20, this.enmeyList[i].getContentSize().height - 20 - (i == 3 ? 5 : 0));

        }

    },

    aginGame: function () {

        if (Math.random() > 0.5) {

            headSrc = res_k_head1;

            head2Src = res_k_head2;

        } else {

            headSrc = res_f_head1;

            head2Src = res_f_head2;

        }
        this.tip = cc.Sprite.create(res_tiptitle2);
        this.tip.setPosition(this.winSize.width / 2, this.winSize.height / 2 + 100);
        this.tip.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveBy.create(1, cc.p(0, -25)), cc.MoveBy.create(1, cc.p(0, 25)))));
        this.addChild(this.tip);

        try {

            _hmt.push(['_trackEvent', 'escape18', 'click', 'restart', '1']);

        } catch (e) { }

        adPush(true);

        // $(".ad_banner").css("display","none");



        this.gameOverLayer.removeFromParent();

        cc.AudioEngine.getInstance().playEffect(sound_restart);



        this.readyGame();

    },

    init: function () {

        var bRet = false;

        if (this._super()) {

            bRet = true;

        }



        cc.AudioEngine.getInstance().preloadEffect(sound_restart);

        cc.AudioEngine.getInstance().preloadEffect(sound_death);

        cc.AudioEngine.getInstance().preloadEffect(sound_click);

        cc.AudioEngine.getInstance().preloadEffect(sound_start);



        if (Math.random() > 0.5) {

            headSrc = res_k_head1;

            head2Src = res_k_head2;

        } else {

            headSrc = res_f_head1;

            head2Src = res_f_head2;

        }

        this.winSize = cc.Director.getInstance().getWinSize();

        var background = cc.Sprite.create(res_background);

        background.setPosition(this.winSize.width / 2, this.winSize.height / 2);

        this.addChild(background);
        var c = document.getElementById("gameCanvas");
        var dd = document.querySelectorAll(".loading")[0];
        //c.style.backgroundColor = "transparent";
        dd.style.display = "none";
        $("body").css("background", "#000");

        this.contentLayer = ContentLayer.create();

        this.contentLayer.setCallback(this);

        this.addChild(this.contentLayer);

        return bRet;

    }

});

var GameScene = cc.Scene.extend({



    onEnter: function () {

        var layer = GameLayer.create();

        this.addChild(layer);

        this._super();



    }

}

);



GameLayer.scene = function () {

    var scene = cc.Scene.create();

    var layer = GameLayer.create();

    scene.addChild(layer);

    return scene;

};

GameLayer.create = function () {

    var sg = new GameLayer();

    if (sg && sg.init()) {

        return sg;

    }

    return null;

};