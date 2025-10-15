// 食物类
class Food {
    constructor(gridSize, canvasWidth, canvasHeight) {
        this.gridSize = gridSize;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = 0;
        this.y = 0;
        this.gridCountX = canvasWidth / gridSize;
        this.gridCountY = canvasHeight / gridSize;
        
        // 随机生成初始位置
        this.randomPosition();
    }

    // 随机生成食物位置
    randomPosition(snakeBody = []) {
        let validPosition = false;
        let newX, newY;
        
        // 确保食物不生成在蛇身上
        while (!validPosition) {
            newX = Math.floor(Math.random() * this.gridCountX) * this.gridSize;
            newY = Math.floor(Math.random() * this.gridCountY) * this.gridSize;
            
            // 检查是否与蛇身重叠
            validPosition = !snakeBody.some(segment => 
                segment.x === newX && segment.y === newY
            );
        }
        
        this.x = newX;
        this.y = newY;
    }

    // 绘制食物
    draw(ctx) {
        // 绘制圆形食物
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(
            this.x + this.gridSize / 2,
            this.y + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // 添加高光效果
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(
            this.x + this.gridSize / 2 - 3,
            this.y + this.gridSize / 2 - 3,
            this.gridSize / 4,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    // 获取位置
    getPosition() {
        return { x: this.x, y: this.y };
    }
}
