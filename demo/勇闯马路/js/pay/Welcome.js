function Welcome() {
    base(this, LSprite, []);
    this.init();
}

Welcome.prototype.init = function () {
    var self = this;
    self.back = new LBitmap(new LBitmapData(imgList["start_page"], 0, 0, 800, 1280));
    self.backX = 0;
    self.addChild(self.back);
    self.start = new LBitmap(new LBitmapData(imgList["but_start"]));
    self.start.x = (LGlobal.width - self.start.getWidth()) / 2;
    self.start.y = self.start.getHeight();
    self.addChild(self.start);
    var tip = new LBitmapData(imgList["tip_text"], 0, 0, 414, 100);
    var list = LGlobal.divideCoordinate(1656, 100, 1, 4);
    self.tip = new LAnimationTimeline(tip, list);
    self.tip.x = (LGlobal.width - self.tip.getWidth()) / 2;
    self.tip.speed = 2;
    self.tip.y = self.start.y + self.start.getHeight() + self.tip.getHeight() / 3;
    self.addChild(self.tip);

    var txtY = self.tip.y + self.tip.getHeight() + 10;
    self.addText("糟糕！张小盒一不小心睡过头，", txtY);
    txtY += 60;
    self.addText("还差" + (gameTime / 1000) + "秒就要迟到了，", txtY);
    txtY += 60;
    self.addText("快跑啊！！！！", txtY);
    self.addEventListener(LMouseEvent.MOUSE_UP, function () { gameStart(); });
};

Welcome.prototype.addText = function (txt, txtY) {
    var self = this;
    var tip_txt = new LTextField();
    tip_txt.weight = "bold";
    tip_txt.color = "#000000";
    tip_txt.size = 30;
    tip_txt.y = txtY;
    tip_txt.text = txt;
    self.addChild(tip_txt);
    tip_txt.x = (LGlobal.width - tip_txt.getWidth()) / 2;
}