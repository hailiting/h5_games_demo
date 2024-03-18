function Character(list, name, speed) {
    base(this, LSprite, []);
    //初始化
    var self = this;
    self.dataList = list[0];
    self.coordinateList = list[1];
    self.locationList = list[2];
    self.attackList = list[3];
    self.speed = speed == null ? 1 : speed;
    self.speedIndex = 0;
    self.action = ACTION.DENG;
    //加载车辆
    if (name != "hero") {
        var index = getnum(0, self.dataList.length - 2);
        if (name == "renxingdao") index = self.dataList.length - 1;
        self.cheIndex = index;
        self.data = self.dataList[index];
        self.coordinate = self.coordinateList[index];
        self.attack = self.attackList[index];
        self.poxX = self.locationList[index].x;
        self.poxY = self.locationList[index].y;
    }
    else {
        self.data = self.dataList[self.action];
        self.coordinate = self.coordinateList[self.action];
        self.isdown = true;
        self._run = false;
        self.dieIndex = 0;
        self.dieFPS = 0;
        self.moveCount = 0;
        self.dieType = "";
    }
    self.name = name;
    self.anime = new LAnimation(self, self.data, self.coordinate);
    self.anime.setAction(0);
    self.anime.x = -self.data.width;
    self.anime.y = -self.data.height;
}
Character.prototype.onframe = function() {
    var self = this;
    if (self.name == "hero" && gameover) return self.paydie();
    if (self.speedIndex++ < self.speed) return;
    //人物动画播放
    self.speedIndex = 0;
    self.anime.onframe();
    if (stopFlag) return;
    if (self.name == "hero") return self.move();
    self.setDie();      //死亡判断
    self.back.allow = true;
    if (self.back.direction == DIRECTION.LEFT) {
        if (self.anime.x >= iWidth) return self.back.cars--, charaLayer.removeChild(self), self = null;
        self.anime.x += self._speed;
    }
    else {
        if (self.anime.x <= self.anime.getWidth() * -0.5) return self.back.cars--, charaLayer.removeChild(self), self = null;
        self.anime.x -= self._speed;
    }
    self.anime.y = self.poxY + backLayer.y;
}
Character.prototype.setAction = function(action) {
    var self = this;
    if (self.action == action) return;
    self.data = self.dataList[action];
    self.anime.bitmap.bitmapData = self.data;
    self.anime.bitmap.bitmapData.setCoordinate(0, 0);
    self.anime.imageArray = self.coordinateList[action];
    self.action = action;
    self.anime.setAction(0);
}
Character.prototype.setLocation = function() {
    var self = this;
    if (self.back.direction == DIRECTION.LEFT) return;
    self.anime.x -= self.data.width;
};
Character.prototype.move = function() {
    if (stopFlag || gameover) return;
    var self = this;
    if (!self._run) return self.setAction(ACTION.DENG);
    if (!self.isdown && self.anime.y < 28) return self.setAction(ACTION.DENG);
    self.setAction(ACTION.ZOU);
    if (self.isdown && self.anime.y >= (160 * 3)) {
        backLayer.y -= heroSpeed;
        heroPoints += heroSpeed;
        if (backLayer.getHeight() <= (iHeight - backLayer.y)) {
            backLayer.addChild(new Background("malu"));
            backLayer.addChild(new Background("malu"));
            backLayer.addChild(new Background("malu"));
            backLayer.addChild(new Background("renxingdao"));
        }
    }
    else if (backLayer.y < 0 && !self.isdown) {
        backLayer.y += heroSpeed;
        heroPoints -= heroSpeed;
    }
    else {
        self.anime.y += heroSpeed * (self.isdown ? 1 : -1);
        heroPoints += heroSpeed * (self.isdown ? 1 : -1);
    }
}
Character.prototype.setDie = function() {
    if (stopFlag) return;
    if (gameover || _hero.dieIndex > 0) return;
    var self = this;
    var posX = _hero.anime.x + (_hero.anime.getWidth() / 2);
    var posY = _hero.anime.y + (_hero.anime.getHeight() / 2) + 50;
    var attack = self.attack;
    var isDie = false;

    if (posX > (attack[0][0] + self.anime.x) && posY > (attack[0][1] + self.anime.y)
    && posX < (attack[1][0] + self.anime.x) && posY > (attack[1][1] + self.anime.y)
    && posX > (attack[2][0] + self.anime.x) && posY < (attack[2][1] + self.anime.y)
    && posX < (attack[3][0] + self.anime.x) && posY < (attack[3][1] + self.anime.y)) isDie = true;
    if (!isDie) return;
    gameover = true;
    if (self.name == "renxingdao") {
        _hero.setAction(ACTION.GOUYAO);
        _hero.dieFPS = overtime * 2;
    }
    else {
        _hero.setAction(ACTION.CHEZHUANG),
    _hero.dieFPS = 4;
    }
    if (self.back.direction == DIRECTION.RIGHT) {
        _hero.anime.x = _hero.anime.x - (_hero.anime.getWidth() / 2);
        _hero.anime.setAction(0, 0, null, true);
    }
    _hero.dieType = self.name;
}
Character.prototype.paydie = function() {
    var self = this;
    if (charaLayer && self.dieIndex >= self.dieFPS) {
        if (!overTimeout) overTimeout = window.setTimeout(function() { over(self.dieType); }, overtime * 1000);
        return;
    }
    if (self.speedIndex++ < self.speed) return;
    self.speedIndex = 0;
    self.dieIndex++;
    self.anime.onframe();
}