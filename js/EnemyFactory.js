/*
 * 创建敌机的工厂
 */
var EnemyFactory = {
	// 创建敌机
	createEnemy : function(type){
		var enemy = null;
		if (type.toUpperCase() === "SMALL") { // 小型
			var x = random(0, Map.width - 34),
				speed = 3; // random(3, 5);
			enemy = new Enemy(34, 24, "images/small_fly.png", x, 0, speed);
		} else if (type.toUpperCase() === "MIDDLE") { // 中型
			var x = random(0, Map.width - 46),
				speed = random(2, 3);
			enemy = new Enemy(46, 60, "images/mid_fly.png", x, 0, speed);
		} else if (type.toUpperCase() === "BIG") { // 大型
			var x = random(0, Map.width - 110),
				speed = 1;
			enemy = new Enemy(110, 164, "images/big_fly.png", x, 0, speed);
		}
		// 初始化
		enemy.init();
		// 返回创建的敌机对象
		return enemy;
	}
};