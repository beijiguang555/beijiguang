/* 
 * 地图对象
 */
var Map = (function(){
	class Map {
		constructor() { // 构造函数，初始化各属性值
			this.width = 320;
			this.height = 568;
			this.startElement = null;
			this.startImg = "images/start_bg.png";
			this.gameElement = null;
			this.gameImg = "images/bg.png";
		}

		/*
		 * 初始化，创建DOM元素
		 */
		init() {
			// 添加页面元素
			// 游戏地图最外层容器
			var _container = document.createElement("div");
			// 两个小容器
			var _startEle = this.startElement = document.createElement("div"),
				_gameEle = this.gameElement = document.createElement("div");
			// 显示
			_container.appendChild(_startEle);
			_container.appendChild(_gameEle);
			$("body")[0].appendChild(_container);
			// 设置各容器CSS样式
			css(_container, {
				width : this.width + "px",
				height : this.height + "px",
				top : 0,
				left : 0,
				bottom : 0,
				right : 0,
				position: "absolute",
				margin : 'auto',
				overflow: "hidden"
			}),
			css(_startEle, {
				width : this.width + "px",
				height : this.height + "px",
				background : `url(${this.startImg})`
			});
			css(_gameEle, {
				width : this.width + "px",
				height : this.height + "px",
				background : `url(${this.gameImg})`
			});

			// 绑定点击事件，开始游戏
			this.startElement.onclick = function(){
				hide(this);
				// 战机显示
				Self.init();
				// 战机移动事件绑定
				Self.move();
				// 引擎开启游戏
				Game.startGame();
			}
		}

		/*
		 * 向地图游戏界面添加游戏角色
		 */
		addRole(role) {
			this.gameElement.appendChild(role.element);
		}

		/*
		 * 从地图游戏界面删除游戏角色
		 */
		removeRole(role) {
			// 从DOM元素中删除
			this.gameElement.removeChild(role.element);
			if (role instanceof Bullet) {
				// 求当前删除角色在数组中的索引 
				var index = inArray(role, Game.bullets);
				// 从数组中删除
				Game.bullets.splice(index, 1);
			} else if (role instanceof Enemy) {
				// 求当前删除角色在数组中的索引 
				var index = inArray(role, Game.enemies);
				// 从数组中删除
				Game.enemies.splice(index, 1);
			}
		}
	}

	return new Map();
})();