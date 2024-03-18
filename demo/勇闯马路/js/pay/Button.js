function Button() {
    base(this, LSprite, []);
    this.init();
}
Button.prototype.init = function() {
    var self = this;
    self.stopBitmapData = new LBitmapData(imgList["but_stop"], 0, 0, 134, 96);
    self.playBitmapData = new LBitmapData(imgList["but_stop"], 134, 0, 134, 96);
    self.stopBitmap = new LBitmap(self.stopBitmapData);
    self.stopBitmap.x = LGlobal.width - self.stopBitmap.getWidth() - 20;
    self.stopBitmap.y = 20;
    self.addChild(self.stopBitmap);

    self.butDownmap = new LBitmap(new LBitmapData(imgList["but_down"], 0, 0, 177, 126));
    self.butDownmap.x = (LGlobal.width - self.butDownmap.getWidth()) / 2;
    self.butDownmap.y = LGlobal.height - self.butDownmap.getHeight() * 2 - 50;
    self.addChild(self.butDownmap);

    var gameTip = new LBitmapData(imgList["game_tip"], 0, 0, 319, 152);
    var list = LGlobal.divideCoordinate(638, 152, 1, 2);
    self.gameTip = new LAnimationTimeline(gameTip, list);
    self.gameTip.x = (LGlobal.width - self.gameTip.getWidth()) / 2;
    self.gameTip.speed = 1;
    self.gameTip.y = self.butDownmap.y - self.gameTip.getHeight() - 10;
    self.addChild(self.gameTip);

    self.tip_time = new LBitmap(new LBitmapData(imgList["tip_time"], 0, 0, 260, 100));
    self.tip_time.x = 20;
    self.tip_time.y = 20;
    self.addChild(self.tip_time);

    var txt = new LTextField();
    txt.weight = "bold";
    txt.color = "#058ED2";
    txt.size = 30;
    txt.x = 40;
    txt.y = self.tip_time.y + 5;
    txt.text = "离上班还剩：";
    self.addChild(txt);

    self.timebox = new LTextField();
    self.timebox.weight = "bold";
    self.timebox.size = 30;
    self.timebox.color = "#FF0000";
    self.timebox.x = 50;
    self.timebox.y = txt.y + txt.getHeight() + 10;
    self.timebox.text = "00:00'0000";
    self.addChild(self.timebox);

    self.addEventListener(LMouseEvent.MOUSE_DOWN, self.mousedown);
    self.addEventListener(LMouseEvent.MOUSE_UP, self.mouseup);
}
Button.prototype.mousedown = function(event) {
    var self = event.clickTarget;
    if (event.selfX > self.stopBitmap.x && event.selfX < self.stopBitmap.x + self.stopBitmap.getWidth() &&
		event.selfY > self.stopBitmap.y && event.selfY < self.stopBitmap.y + self.stopBitmap.getHeight()) {
        if (stopFlag) self.stopBitmap.bitmapData = self.stopBitmapData;
        else self.stopBitmap.bitmapData = self.playBitmapData;
        stopFlag = !stopFlag;
        return;
    }
    if (stopFlag) return;
    var direction = 0;
    if (event.selfX > self.butDownmap.x && event.selfX < self.butDownmap.x + self.butDownmap.getWidth() &&
		event.selfY > self.butDownmap.y && event.selfY < self.butDownmap.y + self.butDownmap.getHeight()) direction = 1;
    if (direction == 0) return;
    if (self.gameTip) self.removeChild(self.gameTip);
    _hero.isdown = direction == 1;
    _hero._run = true;
}
Button.prototype.mouseup = function(event) {
    var self = event.clickTarget;
    if (stopFlag) return;
    _hero._run = false;
}