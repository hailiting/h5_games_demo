var __extends = this.__extends || function (t, e) {
    function i() {
        this.constructor = t
    }
    for (var s in e)
        e.hasOwnProperty(s) && (t[s] = e[s]);
    i.prototype = e.prototype,
	t.prototype = new i
}, BaseMc = function (t) {
    function e(e) {
        t.call(this),
		this.__currentFrame = 0,
		this.__frameRate = 24,
		this.__frameTime = 1e3 / 24,
		this.__currentTime = 0,
		this.__imgArr = e,
		this.initMc()
    }
    return __extends(e, t),
	e.prototype.initMc = function () {
	    for (var t = 0; t < this.__imgArr.length; t++) {
	        var e = this.__imgArr[t];
	        0 == t && this.addChild(e)
	    }
	},
	e.prototype.play = function () {
	    this.__currentTime = 0,
		egret.Ticker.getInstance().register(this.loop, this)
	},
	e.prototype.loop = function (t) {
	    this.__currentTime += t,
		this.__currentTime > this.__frameTime && (this.__currentTime = 0, this.playImg())
	},
	e.prototype.playImg = function () {
	    this.__imgArr[this.__currentFrame].parent && this.removeChild(this.__imgArr[this.__currentFrame]),
		this.__currentFrame < this.__imgArr.length - 1 ? this.__currentFrame++ : this.__currentFrame = 0,
		this.addChild(this.__imgArr[this.__currentFrame])
	},
	e.prototype.stop = function () {
	    egret.Ticker.getInstance().unregister(this.loop, this)
	},
	e.prototype.replay = function () {
	    this.gotoAndStop(0),
		egret.Ticker.getInstance().register(this.loop, this)
	},
	e.prototype.gotoAndStop = function (t) {
	    this.__imgArr[this.__currentFrame].parent && this.removeChild(this.__imgArr[this.__currentFrame]),
		this.__currentFrame = t,
		this.__currentTime = 0,
		this.addChild(this.__imgArr[this.__currentFrame])
	},
	e.prototype.setFrameTime = function (t) {
	    this.__frameTime = t
	},
	e.prototype.setFrameRate = function (t) {
	    this.__frameRate = t,
		this.__frameTime = 1e3 / this.__frameRate
	},
	e
}
(egret.Sprite);
BaseMc.prototype.__class__ = "BaseMc";
var __extends = this.__extends || function (t, e) {
    function i() {
        this.constructor = t
    }
    for (var s in e)
        e.hasOwnProperty(s) && (t[s] = e[s]);
    i.prototype = e.prototype,
	t.prototype = new i
}, ImgBtn = function (t) {
    function e(e) {
        t.call(this),
		this._7 = e,
		this.touchEnabled = !0,
		this.addChild(this._7),
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this),
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.upHandler, this),
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.upHandler, this)
    }
    return __extends(e, t),
	e.prototype.downHandler = function () {
	    this._7.y -= 2,
		this._7.x -= 1
	},
	e.prototype.upHandler = function () {
	    this._7.y += 2,
		this._7.x += 1
	},
	e
}
(egret.Sprite);
; ImgBtn.prototype.__class__ = "ImgBtn";
var __extends = this.__extends || function (t, e) {
    function i() {
        this.constructor = t
    }
    for (var s in e)
        e.hasOwnProperty(s) && (t[s] = e[s]);
    i.prototype = e.prototype,
	t.prototype = new i
}, ImgNumber = function (t) {
    function e(e) {
        t.call(this),
		this.numArr = [],
		this.res = e,
		this.initNumber()
    }
    return __extends(e, t),
	e.prototype.initNumber = function () {
	    for (var t = 0; 10 > t; t++) {
	        var e = new egret.Bitmap;
	        e.texture = this.res.getTexture("number-" + t),
			this.numArr[t] = e
	    }
	},
	e.prototype.getNumber = function (t) {
	    var e = new egret.Bitmap;
	    return e.texture = this.res.getTexture("number-" + t),
		e
	},
	e.prototype.setNumber = function (t) {
	    this.removeChildren();
	    var e = Math.floor(t / 1e3),
		i = Math.floor((t - 1e3 * e) / 100),
		s = Math.floor((t - 1e3 * e - 100 * i) / 10);
	    t = this.getNumber(t - 1e3 * e - 100 * i - 10 * s),
		t.x = 100,
		this.addChild(t),
		s = this.getNumber(s),
		s.x = 50,
		this.addChild(s),
		0 != i && (i = this.getNumber(i), this.addChild(i))
	},
	e
}
(egret.Sprite);
ImgNumber.prototype.__class__ = "ImgNumber";
var __extends = this.__extends || function (t, e) {
    function i() {
        this.constructor = t
    }
    for (var s in e)
        e.hasOwnProperty(s) && (t[s] = e[s]);
    i.prototype = e.prototype,
	t.prototype = new i
}, LoadingUI = function (t) {
    function e() {
        t.call(this),
		this.createView()
    }
    return __extends(e, t),
	e.prototype.createView = function () {
	    this.textField = new egret.TextField,
		this.addChild(this.textField),
		this.textField.y = 300,
		this.textField.width = 480,
		this.textField.height = 100,
		this.textField.textAlign = "center"
	},
	e.prototype.setProgress = function (t, e) {
	    this.textField.text = "娓告垙鍔犺浇涓�..." + t + "/" + e
	},
	e
}
(egret.Sprite);
LoadingUI.prototype.__class__ = "LoadingUI";
var __extends = this.__extends || function (t, e) {
    function i() {
        this.constructor = t
    }
    for (var s in e)
        e.hasOwnProperty(s) && (t[s] = e[s]);
    i.prototype = e.prototype,
	t.prototype = new i
}, Logo = function (t) {
    function e(e, i, s) {
        t.call(this);
        var r = new egret.gui.Label;
        r.text = e,
		r.size = i,
		r.textColor = s,
		this.addChild(r)
    }
    return __extends(e, t),
	e
}
(egret.Sprite);
Logo.prototype.__class__ = "Logo";
var __extends = this.__extends || function (t, e) {
    function i() {
        this.constructor = t
    }
    for (var s in e)
        e.hasOwnProperty(s) && (t[s] = e[s]);
    i.prototype = e.prototype,
	t.prototype = new i
}, Pa = function (t) {
    function e(e) {
        t.call(this),
		this.spaceTime = 10,
		this.current = this.runTime = 0,
		this.isHide = !1,
		this.pa = e,
		this.addChild(e),
		this.alpha = 0
    }
    return __extends(e, t),
	e.prototype.hide = function () {
	    this.isHide = !0,
		this.alpha = this.runTime = this.current = 0
	},
	e.prototype.show = function (t) {
	    this.isHide = !1,
		this.alpha = 1,
		this.totalTime = t,
		this.everyTime = this.totalTime / 10,
		egret.Ticker.getInstance().register(this.loop, this)
	},
	e.prototype.loop = function (t) {
	    !this.isHide && (this.runTime += t, this.runTime > this.everyTime && (this.current++, this.runTime = 0, this.alpha = 1 - .1 * this.current), this.current == this.spaceTime || this.isHide) && (egret.Ticker.getInstance().unregister(this.loop, this), this.runTime = this.current = 0)
	},
	e
}
(egret.Sprite);
Pa.prototype.__class__ = "Pa";
var __extends = this.__extends || function (t, e) {
    function i() {
        this.constructor = t
    }
    for (var s in e)
        e.hasOwnProperty(s) && (t[s] = e[s]);
    i.prototype = e.prototype,
	t.prototype = new i
}, ViewRect = function (t) {
    function e(e, i, s, r, h) {
        t.call(this),
		this.x = e,
		this.y = i,
		this.width = s,
		this.height = r,
		h && this.addChild(h)
    }
    return __extends(e, t),
	e
}
(egret.Sprite);
ViewRect.prototype.__class__ = "ViewRect";
var __extends = this.__extends || function (t, e) {
    function i() {
        this.constructor = t
    }
    for (var s in e)
        e.hasOwnProperty(s) && (t[s] = e[s]);
    i.prototype = e.prototype,
	t.prototype = new i
}, NewGame = function (t) {
    function e() {
        t.call(this),
		this._8 = 0,
		this._11 = new egret.Bitmap,
		this._6 = 0,
		this._10 = 1e4,
		this.__title = "鏍规湰鍋滀笉涓嬫潵",
		this.__desc = "鏍规湰鍋滀笉涓嬫潵锛屽お瑙ｆ仺浜嗭紒-7K7K娓告垙",
		this.__iconLink = "http://g.wanh5.com/sc/choumao/icon.jpg",
		this.topbg = new egret.Bitmap,
		this.bottombg = new egret.Bitmap,
		this.centerbg = new egret.Bitmap,
		this.headbg = new egret.Bitmap,
		this.startImg1 = new egret.Bitmap,
		this.frameImg0 = new egret.Bitmap,
		this.frameImg1 = new egret.Bitmap,
		this.frameImg2 = new egret.Bitmap,
		this.frameImg3 = new egret.Bitmap,
		this.frameImg4 = new egret.Bitmap,
		this.frameImg5 = new egret.Bitmap,
		this.rightHand = new egret.Bitmap,
		this.leftHand = new egret.Bitmap,
		this.pa = new egret.Bitmap,
		this.daji = new egret.Bitmap,
		this.daji2 = new egret.Bitmap,
		this.qdImg1 = new egret.Bitmap,
		this.qdImg2 = new egret.Bitmap,
		this.zdImg1 = new egret.Bitmap,
		this.zdImg2 = new egret.Bitmap,
		this.ss = new egret.Bitmap,
		this.ckTxt = new egret.Bitmap,
		this.bxTxt = new egret.Bitmap,
		this.frameImgArr = [],
		this.soundArr = [],
		this.playTime = 0,
		this.playloopDif = 100,
		this.prevClickTime = 0,
		this.speed = 1,
		this.clickGoRightSlow = [4, 3],
		this.clickGoRightFast = [4, 5, 4, 3],
		this.clickGoLeftSlow = [1, 2],
		this.clickGoLeftFast = [1, 0, 1, 2],
		this.playArr = [],
		this._9 = new egret.Sprite,
		this._13 = new egret.gui.Label,
		this._12 = new egret.gui.Label,
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this),
		window.EgretRuntimeBridgeInit();

    }
    return __extends(e, t),
	e.prototype.addToStage = function () {
	    this.loadingView = new LoadingUI,
		this.stage.addChild(this.loadingView),
		this.addLogo(),
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
		RES.loadConfig("resource/resource.json", "resource/"),
		RES.loadGroup("preload")
	},
	e.prototype.addLogo = function () {
	    // var t = new Logo("Powered by Egret", 20, 13804642);
	    var t = new egret.Bitmap();
	    t.texture = RES.getRes("logo");
	    t.x = 148,
		t.y = 685,
		this.addChild(t)
	},
	e.prototype.onResourceProgress = function (t) {
	    "preload" == t.groupName && this.loadingView.setProgress(t.itemsLoaded, t.itemsTotal)
	},
	e.prototype.onResourceLoadComplete = function () {
	    this.stage.removeChild(this.loadingView),
		RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
		this.initAudio(),
		this.initImg(),
		this.initGame(),
		this.initImgBtn(),
		this.addLogo()
	},
	e.prototype.initAudio = function () {
	    for (var t = 1; 11 > t; t++) {
	        var e = RES.getRes("clickSound" + t);
	        this.soundArr.push(e)
	    }
	},
	e.prototype.initImg = function () {
	    this._0 = RES.getRes("Sprites"),
		this._4 = new ImgNumber(this._0),
		this._11.texture = this._0.getTexture("arrow"),
		this.frameImg0.texture = this._0.getTexture("mao-4"),
		this.frameImg0.anchorX = .5,
		this.frameImg0.scaleX = -1,
		this.frameImg0.x = 247,
		this.frameImg1.texture = this._0.getTexture("mao-3"),
		this.frameImg1.anchorX = .5,
		this.frameImg1.scaleX = -1,
		this.frameImg1.x = 247,
		this.frameImg2.texture = this._0.getTexture("mao-2"),
		this.frameImg2.anchorX = .5,
		this.frameImg2.scaleX = -1,
		this.frameImg2.x = 247,
		this.frameImg3.texture = this._0.getTexture("mao-2"),
		this.frameImg4.texture = this._0.getTexture("mao-3"),
		this.frameImg5.texture = this._0.getTexture("mao-4"),
		this.frameImgArr[0] = this.frameImg0,
		this.frameImgArr[1] = this.frameImg1,
		this.frameImgArr[2] = this.frameImg2,
		this.frameImgArr[3] = this.frameImg3,
		this.frameImgArr[4] = this.frameImg4,
		this.frameImgArr[5] = this.frameImg5,
		this.rightHand.texture = this._0.getTexture("tuoxie-1"),
		this.rightHand.x = 265,
		this.rightHand.y = 280,
		this.rightHand.anchorX = .5,
		this.rightHand.visible = !1,
		this.qdImg1.texture = this._0.getTexture("mao-5"),
		this.qdImg2.texture = this._0.getTexture("mao-5"),
		this.qdImg2.y = 3,
		this.qdMc = new BaseMc([this.qdImg1, this.qdImg2]),
		this.qdMc.x = 20,
		this.qdMc.y = 125,
		this.zdImg1.texture = this._0.getTexture("mao-6"),
		this.zdImg2.texture = this._0.getTexture("mao-6"),
		this.zdImg2.anchorX = .5,
		this.zdImg2.scaleX = -1,
		this.zdImg2.x = 247,
		this.zdMc = new BaseMc([this.zdImg1, this.zdImg2]),
		this.zdMc.x = 20,
		this.zdMc.y = 125,
		this.startImg1.texture = this._0.getTexture("mao-1"),
		this.startMc = new BaseMc([this.startImg1])
	},
	e.prototype.initGame = function () {
	    this.topbg.texture = this._0.getTexture("chendi-1"),
		this.topbg.anchorY = .5,
		this.topbg.scaleY = -1,
		this.topbg.anchorX = .5,
		this.topbg.scaleX = -1,
		this.bottombg.texture = this._0.getTexture("chendi-1"),
		this.centerbg.texture = this._0.getTexture("beijing-2"),
		this.headbg.texture = this._0.getTexture("beijing-1"),
		this.headRect = new ViewRect(0, 140, this.stage.stageWidth, 450, this.headbg),
		this.addChild(this.headRect),
		this.centerRect = new ViewRect(0, 140, 600, 450, this.centerbg),
		this.centerRect.y = 140,
		this.centerRect.x = -50,
		this.centerRect.visible = !1,
		this.addChild(this.centerRect),
		this.topRect = new ViewRect(240, 0, this.stage.stageWidth, 200, this.topbg),
		this.topRect.x = 240,
		this.topRect.height = 200,
		this.addChild(this.topRect),
		this.bottomRect = new ViewRect(0, 440, this.stage.stageWidth, 320, this.bottombg),
		this.bottomRect.y = 440,
		this.addChild(this.bottomRect),
		this.qdMc.visible = !1,
		this.zdMc.visible = !1,
		this.addChild(this.qdMc),
		this.addChild(this.zdMc),
		this.ss.texture = this._0.getTexture("duihuakuang-1"),
		this.ss.x = 50,
		this.addChild(this.ss),
		this.ckTxt.texture = this._0.getTexture("word-haochangkuai-1"),
		this.ckTxt.x = 0,
		this.ckTxt.y = 350,
		this.ckTxt.visible = !1,
		this.bxTxt.texture = this._0.getTexture("word-xiaopengyou-1"),
		this.bxTxt.x = 0,
		this.bxTxt.y = 350,
		this.bxTxt.visible = !1,
		this._1 = 0,
		this._3 = new egret.TextField,
		this._3.text = "鏃堕棿锛�10:00 ",
		this._3.size = 30,
		this._3.x = 20,
		this._3.y = 20,
		this._3.textColor = 13804642,
		this._3.visible = !1,
		this.addChild(this._3),
		this._2 = new egret.Sprite,
		this._2.x = 20,
		this._2.y = 125,
		this.startMc.x = 20,
		this.startMc.y = 125,
		this.startMc.touchEnabled = !0,
		this.startMc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBallHandler, this),
		this.addChild(this.startMc),
		this._2.visible = !1,
		this._2.touchEnabled = !0,
		this._2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBallHandler, this),
		this.addChild(this._2),
		this.addChild(this.rightHand),
		this.addChild(this.ckTxt),
		this.addChild(this.bxTxt),
		this._4.setNumber(0),
		this._4.x = 150,
		this._4.y = 58,
		this._4.visible = !1,
		this.addChild(this._4),
		this._5 = new egret.TextField,
		this._5.x = 250,
		this._5.y = 20,
		this._5.size = 30,
		this._5.textColor = 13804642
	},
	e.prototype.initImgBtn = function () {
	    var t = new egret.Bitmap;
	    t.texture = this._0.getTexture("btn-chouyade-1"),
		this.cydBtn = new ImgBtn(t),
		this.cydBtn.x = 45,
		this.cydBtn.y = 415,
		this.addChild(this.cydBtn),
		this.cydBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBallHandler, this),
		t = new egret.Bitmap,
		t.texture = this._0.getTexture("btn-gengduoyouxi-1"),
		this.moreBtn = new ImgBtn(t),
		this.moreBtn.x = 150,
		this.moreBtn.y = 600,
		this.addChild(this.moreBtn),
		this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moreGameBtnClick, this),
		t = new egret.Bitmap,
		t.texture = this._0.getTexture("btn-zaichouyici-1"),
		this.zcycBtn = new ImgBtn(t),
		this.zcycBtn.x = 20,
		this.zcycBtn.y = 480,
		this.zcycBtn.visible = !1,
		this.addChild(this.zcycBtn),
		this.zcycBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resetGame, this),
		t = new egret.Bitmap,
		t.texture = this._0.getTexture("btn-zhaorenbangmang-1"),
		this.zrbmBtn = new ImgBtn(t),
		this.zrbmBtn.x = 250,
		this.zrbmBtn.y = 480,
		this.zrbmBtn.visible = !1,
		this.addChild(this.zrbmBtn),
		this.zrbmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareGame, this),
		this.pa.texture = this._0.getTexture("word-pa-1"),
		this.daji.texture = this._0.getTexture("daji"),
		this.daji2.texture = this._0.getTexture("daji"),
		this.daji2.anchorX = .5,
		this.daji2.scaleX = -1,
		this.pa.y = 200,
		this.pa.alpha = .9,
		this.pa.visible = !1,
		this.addChild(this.pa),
		this.daji.y = 100,
		this.daji.visible = !1,
		this.daji.alpha = .5,
		this.addChild(this.daji),
		this.daji2.y = 100,
		this.daji2.visible = !1,
		this.daji2.alpha = .5,
		this.addChild(this.daji2)
	},
	e.prototype.gameOver = function () {
	    this.pa.visible = !1,
		this.daji.visible = !1,
		this.daji2.visible = !1,
		this.cydBtn.visible = !1,
		this.centerRect.visible = !1,
		this.zcycBtn.visible = !0,
		this.zrbmBtn.visible = !0,
		this.headRect.visible = !0,
		this._8 = this._1 > this._8 ? this._1 : this._8,
		this._5.text = "鏈€濂芥垚缁╋細" + this._8 + "娆�",
		this.addChild(this._5),
		this._2.visible = !1,
		this._2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBallHandler, this),
		this.rightHand.visible = !1,
		55 < this._1 ? (this.zdMc.visible = !0, this.zdMc.setFrameTime(1e3), this.zdMc.play(), this.ckTxt.visible = !0) : (this.qdMc.visible = !0, this.qdMc.setFrameTime(150), this.qdMc.play(), this.bxTxt.visible = !0),
		this.__title = "鏍规湰鍋滀笉涓嬫潵",
		this.__desc = "10绉掓垜鑳芥娊涓�" + this._1 + "娆★紒浣犺锛熶綘璇曡瘯",
		dp_submitScore(this._1);
	},
	e.prototype.resetGame = function () {
	    this._9.parent && this.removeChild(this._9),
		this.prevClickTime = this.playTime = this._6 = this._1 = 0,
		this.playArr = [],
		this._3.text = "鏃堕棿锛�10:00 ",
		this._4.setNumber(0),
		this.zdMc.visible = !1,
		this.qdMc.visible = !1,
		this._4.visible = !1,
		this._2.visible = !1,
		this.startMc.visible = !0,
		this.ss.visible = !0,
		this.cydBtn.visible = !0,
		this.zcycBtn.visible = !1,
		this.zrbmBtn.visible = !1,
		this.bxTxt.visible = !1,
		this.ckTxt.visible = !1,
		this.rightHand.visible = !1,
		this._5.visible = !1,
		this._3.visible = !1,
		this._2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBallHandler, this)
	},
	e.prototype.touchBallHandler = function (t) {
	    this.setSpeed(this._6),
		this.prevClickTime = this._6,
		0 == this._1 && (egret.Ticker.getInstance().register(this.timeLoop, this), egret.Ticker.getInstance().register(this.imgLoop, this), this.headRect.visible = !1, this.centerRect.visible = !0, this.ss.visible = !1, this.startMc.visible = !1, this.rightHand.visible = !0, this._2.visible = !0, this._4.visible = !0, this._5.visible = !0, this._3.visible = !0, this.daji.visible = !0, this.daji2.visible = !0, this.pa.visible = !0),
		this._1 % 2 ? (this.rightHand.scaleX = -1, t = !1, this.pa.x = 40, this.daji.visible = !0, this.daji.x = 180, this.daji2.visible = !1) : (this.rightHand.scaleX = 1, t = !0, this.pa.x = 370, this.daji.visible = !1, this.daji2.visible = !0, this.daji2.x = 150),
		this.playClickSound(),
		this._1++,
		1 == this._1 ? (this.addPlayArr(!0, 1), this.playImg()) : this.addPlayArr(t, this.speed)
	},
	e.prototype.timeLoop = function (t) {
	    this._6 += t,
		this._6 > this._10 && (egret.Ticker.getInstance().unregister(this.timeLoop, this), egret.Ticker.getInstance().unregister(this.imgLoop, this), this.gameOver()),
		this.centerRect.x = 0 > this.centerRect.x ? this.centerRect.x + 3 : -90,
		this._3.text = "鏃堕棿锛�" + this.timeToString(Math.floor(this._6 / 10)),
		this._4.setNumber(this._1)
	},
	e.prototype.imgLoop = function (t) {
	    var e = this.playArr.length;
	    4 > e && (this.playloopDif = 100),
		e > 6 && (this.playloopDif = 50),
		e > 8 && (this.playloopDif = 20),
		this.prevClickTime < this._6 - 500 ? 0 < this.playArr.length && (t = this.playArr[this.playArr.length - 1], this.playArr = [], this.playArr.push(t), this.playImg()) : (this.playTime += t, this.playTime >= this.playloopDif && (this.playTime = 0, this.playImg()))
	},
	e.prototype.playImg = function () {
	    if (this.playArr.length) {
	        for (var t = 0; t < this.frameImgArr.length; t++)
	            this.frameImgArr[t].parent && this.frameImgArr[t].parent.removeChild(this.frameImgArr[t]);
	        t = this.playArr.shift(),
			this._2.addChild(this.frameImgArr[t])
	    }
	},
	e.prototype.getSound = function () {
	    return 0 != this.soundArr.length ? this.soundArr.pop() : null
	},
	e.prototype.setSpeed = function (t) {
	    var e = t - this.prevClickTime;
	    e > 500 && (this.speed = 1),
		e > 200 && 500 >= e && (this.speed = 2),
		200 >= e && (this.speed = 3);
	    //console.log(t, this.prevClickTime, e),
	    //console.log(this.playArr.length)
	},
	e.prototype.addPlayArr = function (t) {
	    var e;
	    if (t)
	        switch (this.speed) {
	            case 3:
	                e = this.clickGoRightFast;
	                break;
	            default:
	                e = this.clickGoRightSlow
	        }
	    else
	        switch (this.speed) {
	            case 3:
	                e = this.clickGoLeftFast;
	                break;
	            default:
	                e = this.clickGoLeftSlow
	        }
	    for (var i = 0; i < e.length; i++)
	        this.playArr.push(e[i])
	},
	e.prototype.playClickSound = function () {
	    function t() {
	        e.removeEventListener("ended", t),
			i.soundArr.push(e)
	    }
	    var e = this.getSound(),
		i = this;
	    e && (e.play(), e.addEventListener("ended", t))
	},
	e.prototype.timeToString = function (t) {
	    t = 1e3 - t;
	    var e = Math.floor(t / 100);
	    t -= 100 * e,
		0 > e && (e = 0),
		0 > t && (t = 0);
	    var e = e.toString(),
		i = t.toString();
	    return 10 > t && (i = "0" + i),
		e + ":" + i + " "
	},
	e.prototype.shareGame = function () {
	    dp_share();
	},
	e.prototype.moreGameBtnClick = function () {
	    clickMore();
	},
	e
}
(egret.DisplayObjectContainer);
NewGame.prototype.__class__ = "NewGame";