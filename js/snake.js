// 蛇类
class Snake {
    constructor(gridSize, canvasWidth, canvasHeight) {
        this.gridSize = gridSize;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // 初始化蛇身
        this.body = [
            { x: gridSize * 5, y: gridSize * 5 },
            { x: gridSize * 4, y: gridSize * 5 },
            { x: gridSize * 3, y: gridSize * 5 }
        ];
        
        // 初始方向：向右
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        
        // 是否需要增长
        this.growing = false;
    }

    // 改变方向
    changeDirection(newDirection) {
        // 防止反向移动
        if (newDirection.x === -this.direction.x && newDirection.y === -this.direction.y) {
            return;
        }
        
        this.nextDirection = newDirection;
    }

    // 移动蛇
    move() {
        // 更新方向
        this.direction = this.nextDirection;
        
        // 计算新的头部位置
        const head = this.body[0];
        const newHead = {
            x: head.x + this.direction.x * this.gridSize,
            y: head.y + this.direction.y * this.gridSize
        };
        
        // 添加新头部
        this.body.unshift(newHead);
        
        // 如果不需要增长，移除尾部
        if (!this.growing) {
            this.body.pop();
        } else {
            this.growing = false;
        }
    }

    // 增长
    grow() {
        this.growing = true;
    }

    // 检查是否撞墙
    checkWallCollision() {
        const head = this.body[0];
        
        return (
            head.x < 0 ||
            head.x >= this.canvasWidth ||
            head.y < 0 ||
            head.y >= this.canvasHeight
        );
    }

    // 检查是否撞到自己
    checkSelfCollision() {
        const head = this.body[0];
        
        // 从第二节开始检查
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        
        return false;
    }

    // 检查是否吃到食物
    checkFoodCollision(food) {
        const head = this.body[0];
        const foodPos = food.getPosition();
        
        return head.x === foodPos.x && head.y === foodPos.y;
    }

    // 绘制蛇
    draw(ctx) {
        this.body.forEach((segment, index) => {
            if (index === 0) {
                // 绘制蛇头
                ctx.fillStyle = '#2c3e50';
                ctx.fillRect(segment.x, segment.y, this.gridSize, this.gridSize);
                
                // 绘制眼睛
                ctx.fillStyle = '#fff';
                const eyeSize = 3;
                const eyeOffset = 5;
                
                if (this.direction.x === 1) { // 向右
                    ctx.fillRect(segment.x + this.gridSize - eyeOffset - eyeSize, segment.y + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(segment.x + this.gridSize - eyeOffset - eyeSize, segment.y + this.gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                } else if (this.direction.x === -1) { // 向左
                    ctx.fillRect(segment.x + eyeOffset, segment.y + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(segment.x + eyeOffset, segment.y + this.gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                } else if (this.direction.y === -1) { // 向上
                    ctx.fillRect(segment.x + eyeOffset, segment.y + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(segment.x + this.gridSize - eyeOffset - eyeSize, segment.y + eyeOffset, eyeSize, eyeSize);
                } else { // 向下
                    ctx.fillRect(segment.x + eyeOffset, segment.y + this.gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                    ctx.fillRect(segment.x + this.gridSize - eyeOffset - eyeSize, segment.y + this.gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                }
            } else {
                // 绘制蛇身
                ctx.fillStyle = '#34495e';
                ctx.fillRect(
                    segment.x + 1,
                    segment.y + 1,
                    this.gridSize - 2,
                    this.gridSize - 2
                );
            }
        });
    }

    // 重置蛇
    reset() {
        this.body = [
            { x: this.gridSize * 5, y: this.gridSize * 5 },
            { x: this.gridSize * 4, y: this.gridSize * 5 },
            { x: this.gridSize * 3, y: this.gridSize * 5 }
        ];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.growing = false;
    }

    // 获取蛇身
    getBody() {
        return this.body;
    }

    // 获取长度
    getLength() {
        return this.body.length;
    }
}
