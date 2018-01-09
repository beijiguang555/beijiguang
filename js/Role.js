/*
 * 角色类：战机、子弹、敌机的父类
 */
class Role {
	constructor(width, height, img, x, y, speed) {
		this.width = width;
		this.height = height;
		this.element = null; // 战机所使用到的DOM元素
		this.img = img;
		this.x = x;
		this.y = y;
		this.speed = speed; // 速度
	}

	/*
	 * 初始化DOM元素
	 */
	init() {
		var _img = this.element = document.createElement("img");
		_img.src = this.img;
		Map.addRole(this);
		// 设置CSS
		css(_img, {
			width : this.width + "px",
			height : this.height + "px",
			position: "absolute",
			top: this.y + "px",
			left : this.x + "px"
		});
	}

	/*
	 * 实现在地图中的移动动作
	 */
	move() {
		this.y += this.speed;
		css(this.element, {
			top: this.y + "px"
		});
		if (this.y < 0 || this.y > Map.height) // 子弹或敌机移出地图范围
			this.destroy();
	}

	/*
	 * 实现当前角色资源销毁
	 */
	destroy() {
		Map.removeRole(this);
	}
}