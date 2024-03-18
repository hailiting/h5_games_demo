function Background(name) {
    base(this, LSprite, []);
    this.init(name);
}

Background.prototype.init = function (name) {
    var self = this;
    var poxY = 0;
    switch (name) {
        case "top": poxY = 320; break;
        case "malu": poxY = 0; break;
        case "malu1": poxY = 160; break;
        case "renxingdao": poxY = 480; break;
        default: return;
    }
    var posY = backLayer.posY;
    self.name = name;
    self.back = new LBitmap(new LBitmapData(imgList["daolu"], 0, poxY, 800, 160));
    self.back.y = posY;
    self._speed = 0;
    self.cars = 0;
    switch (name) {
        default:
        case "malu": self.direction = DIRECTION.LEFT; break;
        case "malu1": self.direction = DIRECTION.RIGHT; break;
        case "renxingdao": self.direction = self.direction = getnum(0, 1) == 1 ? DIRECTION.LEFT : DIRECTION.RIGHT; break;
    }
    self.allow = true;
    posY += self.back.getHeight();
    self.addChild(self.back);
    backLayer.posY = posY;
    if (name == "malu") backLayer.addChild(new Background("malu1"));
}
Background.prototype.onframe = function () {
    var self = this;
    var _showCar = showCar;
    _showCar -= parseInt(backLayer.posY / (2 * 160));
    if (_showCar < 3) _showCar = 3;
    if (stopFlag || self.name == "top" || getnum(1, _showCar) != 1 || !self.allow) return;
    if ((self.y + self.back.getHeight()) <= 0 || self.y >= iHeight) return;
    addCar(self);
    self.cars++;
}