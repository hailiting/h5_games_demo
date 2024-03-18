/**

* Created by Administrator on 2014/8/19.

*/

var GameOverLayer = cc.Layer.extend

({

    target: null,

    shareSprite: null,

    menu: null,

    setCallback: function (target) {

        this.target = target;

    },

    textLable: null,

    setText: function (text) {

        if (!this.textLable) {

            this.textLable = cc.LabelTTF.create(text, "bolder 微软雅黑", 16);

            this.textLable.setColor(cc.c3b(0, 0, 0));

            this.textLable.setPosition(this.winSize.width / 2, this.winSize.height / 2 + 19);

            this.addChild(this.textLable);

        } else {

            this.textLable.setString(text);

        }

    },

    ctor: function () {

        this._super();

        if ('touches' in sys.capabilities) {

            this.setTouchEnabled(true);

        }

        else if ('mouse' in sys.capabilities)

            this.setMouseEnabled(true);



    },

    onEnter: function () {



        cc.registerTargetedDelegate(-126, true, this);

        this._super();

    },

    onExit: function () {

        cc.unregisterTouchDelegate(this);

        this._super();

    },

    init: function () {

        this._super();

        this.winSize = cc.Director.getInstance().getWinSize();

        var dialog = cc.Sprite.create(res_dialog_bg);

        dialog.setPosition(this.winSize.width / 2, this.winSize.height / 2);

        this.addChild(dialog);

        var head2 = cc.Sprite.create(head2Src);

        head2.setPosition(this.winSize.width / 2 + 75, this.winSize.height / 2 + 85);

        this.addChild(head2);

        var $this = this;

        var agin = cc.MenuItemImage.create(res_agin_btn, res_agin_btn, function () {

            $this.target.aginGame();

        });

        agin.setPosition(-90, -60);

        var more = cc.MenuItemImage.create(res_more_btn, res_more_btn, function () {

            try {

                _hmt.push(['_trackEvent', 'escape', 'click', 'more', '1']);

            } catch (e) { }

            window.open("http://www.liebao.cn/game/?f=escape18");

        });

        more.setPosition(0, -60);



        var kshare = '', kwidth = "", kheight = "";

        if (navigator.userAgent.match(/liebao/gi) != null) {

            kshare = res_shareLiebao;

        } else {

            kshare = res_share;

        }



        var share = cc.MenuItemImage.create(res_share_btn, res_share_btn, function () {



            if (navigator.userAgent.match(/Gkuwan/gi) != null) {

                var lineLink = "http://q" + (Math.floor(Math.random() * 5000)) + ".140qcloud.com/game/escape18/?t=" + (new Date()).valueOf();



                var shareTitle = '哥，挺住18秒！躲开条子';

                liebaoPlatformShare(

                    shareTitle,

                    "http://www.liebao.cn/game/escape18/res/f_head_3.jpg",

                    ShareWords,

                    lineLink,

                    function () { });

                return

            }



            try {

                _hmt.push(['_trackEvent', 'escape', 'click', 'share', '1']);

            } catch (e) { }

            $(".ad_banner").css("display", "none");

            $this.menu.setEnabled(false);

            $this.shareSprite = cc.Sprite.create(kshare);



            if (navigator.userAgent.match(/liebao/gi) != null) {

                $this.shareSprite.setPosition($this.winSize.width / 2, $this.winSize.height / 2);

            } else {

                $this.shareSprite.setPosition($this.winSize.width - $this.shareSprite.getContentSize().width / 2, $this.winSize.height - $this.shareSprite.getContentSize().height / 2);

            }



            $this.addChild($this.shareSprite);

        });

        share.setPosition(90, -60);



        this.menu = cc.Menu.create(agin, more, share);

        this.menu.setTouchPriority(-126);

        this.addChild(this.menu);



        return true;

    },



    onTouchBegan: function (touch, event) {

        if (this.shareSprite) {

            this.shareSprite.removeFromParent();

            this.menu.setEnabled(true);

            $(".ad_banner").css("display", "inline");



        }



        return true;

    },

    onTouchMoved: function (touch, event) {

    },

    onTouchEnded: function (touch, event) {

    }

});



GameOverLayer.create = function (time, text, word) {

    var sg = new GameOverLayer();

    if (sg && sg.init()) {

        sg.setText("你坚持了" + time.toFixed(2) + "秒，击败了全国" + text + "%的\n人，恭喜获得" + word + "称号");



        return sg;

    }

    return null;

};