/**
 * 子弹对象
 */
class Bullet extends Role{
	constructor() {
		super(6, 14, "images/bullet.png", 0, 0, -4);
		this.x = Self.x + Self.width / 2;
		this.y = Self.y - this.height;
	}
}