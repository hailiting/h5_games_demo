/**
* Created by niko on 13-12-13.
*/

var Loading = cc.LayerColor.extend({
    loading_label: null,
    loading_logo: null,
    loding: 0,
    init: function () {
        if (this._super(cc.c4b(255, 255, 255, 255))) {


            cc.SpriteFrameCache.getInstance().addSpriteFrames(r_loading_car_plist);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(r_g_plist);

            var size = cc.Director.getInstance().getWinSize();

            var animation1 = cc.Animation.create();
            var str = "";
            for (var i = 1; i < 35; i++) {

                if (i < 10) {
                    str = "LD" + "000" + i + ".png";
                } else {
                    str = "LD" + "00" + i + ".png";
                }
                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
                animation1.addSpriteFrame(frame);
            }
            animation1.setDelayPerUnit(0.02);

            cc.AudioEngine.getInstance().preloadEffect(r_game_target_ok);
            cc.AudioEngine.getInstance().preloadEffect(r_game_target_error);

            LightAnimation = cc.Animation.create();
            var str = "";
            for (var i = 1; i <= 12; i++) {
                str = "G" + i + ".png";
                cc.log(" light is : " + str);
                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
                LightAnimation.addSpriteFrame(frame);
            }
            LightAnimation.setDelayPerUnit(0.05);

            this.background = cc.Sprite.create(r_loading_background);
            this.background.setPosition(size.width / 2, size.height / 2);
            this.addChild(this.background);

            this.loading_logo = cc.Sprite.create(r_logo);
            this.loading_logo.setPosition(size.width / 2 + 265, size.height / 2 + 455);
            this.addChild(this.loading_logo);

            this.car = cc.Sprite.create();
            this.car.setPosition(size.width / 2, size.height / 2 + 150);
            this.addChild(this.car);
            this.car.setScale(2);
            this.car.runAction(cc.Animate.create(LightAnimation));

            this.loading_label = cc.LabelTTF.create("0%", "", 24);
            this.loading_label.setPosition(size.width / 2, size.height / 2);

            this.loading_label.enableStroke(cc.c3b(199, 140, 87), 1);
            this.loading_label.setColor(cc.c3b(255, 255, 255));
            alert("33")
            this.addChild(this.loading_label);

            //            if(device.ios()){
            //                if(window.screen.height == (1136 / 2)){
            //                    this.background.setPosition(size.width/2,size.height/2+120);
            //                    this.loading_logo.setPositionY(this.loading_logo.getPositionY()+64);
            //                    this.car.setPositionY(this.car.getPositionY()+64);
            //                    this.loading_label.setPositionY(this.loading_label.getPositionY()+64);
            //                }else if(window.screen.height == (960 / 2)){
            //                    this.loading_logo.setPositionY(this.loading_logo.getPositionY()-160);
            //                    this.car.setPositionY(this.car.getPositionY()+64);
            //                    this.loading_label.setPositionY(this.loading_label.getPositionY()+64);
            //
            //                }
            //            }
            document.images[0].style.display = 'none'

            this.scheduleUpdate();
            return true;
        }
        return false;
    },
    update: function (dt) {
        this.percentTo2(this.loding += 2);
        if (this.loding == 4) {
            this.unscheduleUpdate();
        }
    },
    percentTo: function (percent) {
        if (percent <= this.loding) return;
        var tmpStr = percent + "%";
        this.loading_label.setString(tmpStr);
        var str = "";
        var i = parseInt(percent / 3);
        if (i < 10) {
            str = "LD" + "000" + i + ".png";
        } else {
            str = "LD" + "00" + i + ".png";
        }

        this.car.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(str))
    },
    percentTo2: function (percent) {
        var tmpStr = percent + "%";
        this.loading_label.setString(tmpStr);
    }
});


/**
* Used to display the loading screen
* @class
* @extends cc.Scene
*/
LoadingScene = cc.Scene.extend(/** @lends PuzzleLoaderScene# */{
/**
* Constructor
*/
loading_layer: null,
ctor: function () {
    cc.Scene.prototype.ctor.call(this);
    this._winSize = cc.Director.getInstance().getWinSize();
},
init: function () {

    cc.Scene.prototype.init.call(this);

    //logo
    this.loading_layer = new Loading();
    this.loading_layer.init();
    this.addChild(this.loading_layer);
},

_initStage: function (centerPos) {
    this._texture2d = new cc.Texture2D();
    this._texture2d.initWithElement(this._logoTexture);
    this._texture2d.handleLoadedTexture();
    this._logo = cc.Sprite.createWithTexture(this._texture2d);

    this._logo.setPosition(centerPos);
    this._bgLayer.addChild(this._logo, 10);

    //load resources
    this._logoFadeIn();
},

onEnter: function () {

    cc.Node.prototype.onEnter.call(this);
    this.schedule(this._startLoading, 0.3);
},

onExit: function () {
    cc.Node.prototype.onExit.call(this);
},

/**
* init with resources
* @param {Array} resources
* @param {Function|String} selector
* @param {Object} target
*/
initWithResources: function (resources, selector, target) {
    this.resources = resources;
    this.selector = selector;
    this.target = target;
},

_startLoading: function () {
    this.unschedule(this._startLoading);
    cc.Loader.preload(this.resources, this.selector, this.target);
    this.schedule(this._updatePercent);
},

_logoFadeIn: function () {
    var logoAction = cc.Spawn.create(
            cc.EaseBounce.create(cc.MoveBy.create(0.25, cc.p(0, 10))),
            cc.FadeIn.create(0.5));

    var labelAction = cc.Sequence.create(
            cc.DelayTime.create(0.15),
            logoAction.clone());

    this._logo.runAction(logoAction);
    this._label.runAction(labelAction);
},

_updatePercent: function () {
    var percent = cc.Loader.getInstance().getPercentage();
    if (this.loading_layer) {
        this.loading_layer.percentTo(percent);

    }

}
});

LoadingScene.preload = function (resources, selector, target) {
    if (!this._instance) {
        this._instance = new LoadingScene();
        this._instance.init();
    }

    this._instance.initWithResources(resources, selector, target);

    var director = cc.Director.getInstance();
    if (director.getRunningScene()) {
        director.replaceScene(this._instance);
    } else {
        director.runWithScene(this._instance);
    }

    return this._instance;
};
