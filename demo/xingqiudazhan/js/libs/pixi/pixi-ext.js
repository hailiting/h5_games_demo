PIXI.Point.prototype.normalize = function()
{
	var length = this.getLength();
	this.x /= length;
	this.y /= length;
}

PIXI.Point.prototype.getLength = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

PIXI.Point.prototype.dotProduct = function(v)
{
	return (this.x * v.x) + (this.y * v.y);
}

PIXI.Point.prototype.multiply = function(v)
{
	this.x *= v;
	this.y *= v;
}

PIXI.Point.prototype.rotateAround = function(center, radian)
{
	this.x -= center.x;
	this.y -= center.y;

	var c = Math.cos(radian);
	var s = Math.sin(radian);

	var nX = c * this.x - s * this.y;
	var nY = s * this.x + c * this.y;

	this.x = nX;
	this.y = nY;

	this.x += center.x;
	this.y += center.y;
}

PIXI.Point.prototype.angle = function(v)
{
	return Math.atan2(this.y - v.y, this.x - v.x);
}

PIXI.Point.prototype.equal = function(v)
{
	return this.x == v.x && this.y == v.y;
}