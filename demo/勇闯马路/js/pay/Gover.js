function Gover(type) {
    base(this, LSprite, []);
    this.init(type);
}

Gover.prototype.init = function(type) {
    var self = this;
    var g_time = parseInt(startTime / 1000);
    var g_line = parseInt(heroPoints / 160);
    var over_bg = "over_page";
    issucceed = type == "timeover" && g_line >= succeed_count;
    over_bg = issucceed ? "succeed_bg" : over_bg;
    over_bg = type == "timeover" && g_line < succeed_count ? "over_time" : over_bg;
    self.back = new LBitmap(new LBitmapData(imgList[over_bg], 0, 0, 800, 1280));
    self.backX = 0;
    self.addChild(self.back);
    var s_title = "我" + g_time + "秒闯过了" + g_line + "条马路，称号是", s_ch = "", s_text = "";
    if (g_line <= 5) {
        s_ch = "战五渣";
        s_desc = "只……只差几步了，我想我可以再抢救一下";
        s_text = "只……只差几步了，我想我可以再抢救^一下";
    }
    else if (g_line >= 6 && g_line <= 10) {
        s_ch = "超级幸运王";
        s_desc = "原来我的技能点都加在敏捷上了，闯马路什么的感觉自己棒棒哒！";
        s_text = "原来我的技能点都加在敏捷上了，闯马^路什么的感觉自己棒棒哒！";
    }
    else if (g_line >= 11 && g_line <= 15) {
        s_ch = "马路隐形战士";
        s_desc = "来呀来呀，来追我呀。躲避技能登峰造极！马路杀手攻击全部miss！";
        s_text = "来呀来呀，来追我呀。躲避技能登峰^造极！马路杀手攻击全部miss！";
    }
    else if (g_line >= 16 && g_line <= 20) {
        s_ch = "无敌最空虚";
        s_desc = "卧槽，原来我的耐力这么持久，我是凌驾于马路巅峰的男人！不服来一发！";
        s_text = "卧槽，原来我的耐力这么持久，我是^凌驾于马路巅峰的男人！不服来一发！";
    }
    else {
        s_ch = "坚挺之王";
        s_desc = "我只用了两成功力不到，啧，做人没意思........";
        s_text = "我只用了两成功力不到，啧，做人没^意思........";
    }
    if (issucceed) {
        s_ch = "千里走单骑";
        s_desc = "只有2%能达到这顶峰，我要和朋友们分享这喜悦!";
        s_text = "只有2%能达到这顶峰，我要和朋友们^分享这喜悦!";
    }
   // if (issucceed) setShare("哟西!打卡成功，获得称号【" + s_ch + "】", s_desc);
    //else setShare(s_title + "【" + s_ch + "】", s_desc);
    self.tip_over = new LBitmap(new LBitmapData(imgList["tip_over"], 0, 0, 780, 390));
    self.tip_over.x = 10;
    self.tip_over.y = 10;
    self.addChild(self.tip_over);
    var txtY = 80;
    self.txt1 = new LTextField();
    self.txt1.weight = "bold";
    self.txt1.color = "#000000";
    self.txt1.size = 26;
    self.txt1.x = 50;
    self.txt1.y = txtY;
    self.txt1.text = issucceed ? "哟西!打卡成功，获得称号" : s_title;
    self.addChild(self.txt1);
    self.txt2 = new LTextField();
    self.txt2.weight = "bold";
    self.txt2.color = "#FF0000";
    self.txt2.size = 30;
    txtY += 50;
    self.txt2.y = txtY;
    self.txt2.text = "【" + s_ch + "】";
    self.txt2.x = (LGlobal.width - self.txt2.getWidth()) / 2;
    self.addChild(self.txt2);
    var arr = s_text.split("^");
    for (var i in arr) {
        if (!arr[i]) continue;
        eval("self.desc_" + i + "= new LTextField();");
        eval("self.desc_" + i + ".weight=\"bold\";");
        eval("self.desc_" + i + ".color= \"#000000\";");
        eval("self.desc_" + i + ".size = 30;");
        txtY += 50;
        eval("self.desc_" + i + ".y = txtY;");
        eval("self.desc_" + i + ".text=\"" + arr[i] + "\";");
        eval("self.desc_" + i + ".x=50;");
        eval("self.addChild(self.desc_" + i + ");");
    }
    self.txt_share = new LTextField();
    self.txt_share.weight = "bold";
    self.txt_share.color = "#FF0000";
    self.txt_share.size = 30;
    txtY += 60;
    self.txt_share.y = txtY;
    self.txt_share.text = "";
    self.txt_share.x = (LGlobal.width - self.txt_share.getWidth()) / 2;
    self.addChild(self.txt_share);
    self.reset = new LBitmap(new LBitmapData(imgList[issucceed ? "but_succeed_reset" : "but_reset"]));
    self.reset.x = (LGlobal.width - self.reset.getWidth()) / 2;
    self.reset.y = self.tip_over.y + self.tip_over.getHeight() + 20;
    self.addChild(self.reset);
	dp_submitScore(g_line);
	document.getElementById("game9gtoolbar").style.display="";
    self.addEventListener(LMouseEvent.MOUSE_UP, function(event) {
        var _self = event.clickTarget;
        if (event.selfX > _self.reset.x && event.selfX < _self.reset.x + _self.reset.getWidth() &&
		event.selfY > _self.reset.y && event.selfY < _self.reset.y + _self.reset.getHeight()) {
            gameStart();
			document.getElementById("game9gtoolbar").style.display="none";
        }
    });
}