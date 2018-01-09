/*
 * 游戏引擎
 */
var Game = {
	bullets : [], // 存储所有的子弹
	enemies : [], // 存储所有的敌机
	timer : null, // 用于控制游戏使用计时器的id
	// 游戏引擎初始化
	init : function(){
		Map.init();
	},
	// 启动游戏
	startGame : function(){
		// 计数器
		var count = 0;
		this.timer = setInterval(() => {
			count++;
			// 生成子弹与敌机
			this.generate(count);
			// 子弹与敌机移动
			this.move();
			// 碰撞检测
			this.check();
		}, 1000 / 60);
	},
	// 生成子弹与敌机
	generate : function(count){
		if (count % 10 === 0) { // 生成一颗子弹
			var bullet = new Bullet();
			bullet.init();
			this.bullets.push(bullet); // 将生成子弹添加到数组中保存
		}
		if (count % 30 === 0) { // 生成小型敌机
			var enemy = EnemyFactory.createEnemy("small");
			this.enemies.push(enemy);
		}
		/*if (count % 100 === 0) { // 生成中型敌机
			var enemy = EnemyFactory.createEnemy("middle");
			Game.enemies.push(enemy);
		}
		if (count % 150 === 0) { // 生成大型敌机
			var enemy = EnemyFactory.createEnemy("big");
			Game.enemies.push(enemy);
		}*/
	},
	// 子弹与敌机移动
	move : function(){
		// 让每颗子弹都运动一步
		for (var i = this.bullets.length - 1; i >= 0; i--) {
			this.bullets[i].move();
		}
		// 让每架敌机都运动一步
		for (var i = this.enemies.length - 1; i >= 0; i--) {
			this.enemies[i].move();
		}
	},
	// 判断两个角色对应的矩形是否有相交叉的情况
	// 如果有则返回true，没有相交则返回 false
	intersect : function(role1, role2){
		return !(role1.y > role2.y + role2.height
			|| role2.y > role1.y + role1.height
			|| role1.x > role2.x + role2.width
			|| role2.x > role1.x + role1.width);
	},
	// 碰撞检测
	check : function(){
		// 检测子弹与敌机的碰撞
		for (var i = this.bullets.length - 1; i >= 0; i--) {
			var bullet = this.bullets[i];
			for (var j = this.enemies.length - 1; j >= 0; j--) {
				var enemy = this.enemies[j];
				// 判断当前遍历的子弹与遍历到的敌机是否碰撞
				if (this.intersect(bullet, enemy)) { // 碰撞
					bullet.destroy();
					enemy.destroy();
					break;
				}
			}
		}
		// 检测敌机与战机碰撞
		for (var j = this.enemies.length - 1; j >= 0; j--) {
			var enemy = this.enemies[j];
			// 判断当前遍历的敌机是否与战机碰撞
			if (this.intersect(enemy, Self)) { // 碰撞
				clearInterval(this.timer);
				Self.destroy();
			}
		}
	}
}