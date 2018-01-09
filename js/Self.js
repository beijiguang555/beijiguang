/* 
 * 战机
 */
var Self = (function(){
	class Self extends Role{
		constructor() {
			super(66, 80, "images/self.gif", 100, 100); // 调用父类构造函数
		}

		move() {
			Map.gameElement.onmousemove = (e) => {
				e = e || event;
				offset(this.element, {
					top: page(e).y - this.height / 2,
					left: page(e).x - this.width / 2
				});
				this.x = this.element.offsetLeft;
				this.y = this.element.offsetTop;
			}
		}

		destroy() {
			Map.gameElement.onmousemove = null;
		}
	}

	return new Self();
})();
