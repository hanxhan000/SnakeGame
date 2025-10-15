// 游戏主控制类
class Game {
    constructor() {
        // 游戏配置
        this.gridSize = 20;
        this.canvasWidth = 600;
        this.canvasHeight = 600;
        this.gameSpeed = 150; // 毫秒
        
        // 游戏状态
        this.score = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.gameLoop = null;
        
        // 获取Canvas元素
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 初始化游戏对象
        this.snake = new Snake(this.gridSize, this.canvasWidth, this.canvasHeight);
        this.food = new Food(this.gridSize, this.canvasWidth, this.canvasHeight);
        this.audioManager = new AudioManager();
        this.leaderboard = new Leaderboard();
        
        // 获取UI元素
        this.startScreen = document.getElementById('start-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.pauseScreen = document.getElementById('pause-screen');
        this.currentScoreElement = document.getElementById('current-score');
        this.highScoreElement = document.getElementById('high-score');
        this.finalScoreElement = document.getElementById('final-score');
        
        // 初始化
        this.init();
    }

    // 初始化游戏
    init() {
        // 绑定事件
        this.bindEvents();
        
        // 显示排行榜
        this.updateLeaderboard();
        
        // 更新最高分显示
        this.updateHighScore();
        
        // 绘制初始画面
        this.drawGrid();
        this.snake.draw(this.ctx);
        this.food.draw(this.ctx);
    }

    // 绑定事件
    bindEvents() {
        // 开始按钮
        document.getElementById('start-btn').addEventListener('click', () => {
            this.start();
        });

        // 重新开始按钮
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });

        // 新游戏按钮
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.restart();
        });

        // 暂停按钮
        document.getElementById('pause-btn').addEventListener('click', () => {
            this.togglePause();
        });

        // 保存分数按钮
        document.getElementById('save-score-btn').addEventListener('click', () => {
            this.saveScore();
        });

        // 清空排行榜按钮
        document.getElementById('clear-leaderboard-btn').addEventListener('click', () => {
            if (confirm('确定要清空排行榜吗？')) {
                this.leaderboard.clear();
                this.updateLeaderboard();
                this.updateHighScore();
            }
        });

        // 音效开关按钮
        const soundBtn = document.getElementById('toggle-sound-btn');
        soundBtn.addEventListener('click', () => {
            const enabled = this.audioManager.toggle();
            soundBtn.textContent = enabled ? '🔊 音效开' : '🔇 音效关';
        });

        // 键盘控制
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // 玩家名称输入框回车事件
        document.getElementById('player-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveScore();
            }
        });

        // 移动端触控支持
        this.addTouchControls();
    }

    // 添加移动端触控控制
    addTouchControls() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        const minSwipeDistance = 30; // 最小滑动距离

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const touch = e.changedTouches[0];
            touchEndX = touch.clientX;
            touchEndY = touch.clientY;

            this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY, minSwipeDistance);
        }, { passive: false });
    }

    // 处理滑动手势
    handleSwipe(startX, startY, endX, endY, minDistance) {
        if (!this.isRunning || this.isPaused) return;

        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // 判断滑动方向
        if (Math.max(absDeltaX, absDeltaY) < minDistance) {
            return; // 滑动距离太短，忽略
        }

        if (absDeltaX > absDeltaY) {
            // 水平滑动
            if (deltaX > 0) {
                this.snake.changeDirection({ x: 1, y: 0 }); // 右
            } else {
                this.snake.changeDirection({ x: -1, y: 0 }); // 左
            }
        } else {
            // 垂直滑动
            if (deltaY > 0) {
                this.snake.changeDirection({ x: 0, y: 1 }); // 下
            } else {
                this.snake.changeDirection({ x: 0, y: -1 }); // 上
            }
        }
    }

    // 处理键盘按键
    handleKeyPress(e) {
        if (!this.isRunning) {
            if (e.key === 'Enter') {
                if (this.startScreen.classList.contains('hidden')) {
                    this.restart();
                } else {
                    this.start();
                }
            }
            return;
        }

        // 暂停/继续
        if (e.key === ' ') {
            e.preventDefault();
            this.togglePause();
            return;
        }

        if (this.isPaused) return;

        // 方向控制
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                e.preventDefault();
                this.snake.changeDirection({ x: 0, y: -1 });
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                e.preventDefault();
                this.snake.changeDirection({ x: 0, y: 1 });
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                e.preventDefault();
                this.snake.changeDirection({ x: -1, y: 0 });
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                e.preventDefault();
                this.snake.changeDirection({ x: 1, y: 0 });
                break;
        }
    }

    // 开始游戏
    start() {
        this.startScreen.classList.add('hidden');
        this.isRunning = true;
        this.isPaused = false;
        document.getElementById('pause-btn').disabled = false;
        this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
    }

    // 暂停/继续游戏
    togglePause() {
        if (!this.isRunning) return;

        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            this.pauseScreen.classList.remove('hidden');
            clearInterval(this.gameLoop);
        } else {
            this.pauseScreen.classList.add('hidden');
            this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
        }
    }

    // 更新游戏状态
    update() {
        // 移动蛇
        this.snake.move();

        // 检查碰撞
        if (this.snake.checkWallCollision()) {
            this.audioManager.playWall();
            this.gameOver();
            return;
        }

        if (this.snake.checkSelfCollision()) {
            this.audioManager.playWall();
            this.gameOver();
            return;
        }

        // 检查是否吃到食物
        if (this.snake.checkFoodCollision(this.food)) {
            this.audioManager.playEat();
            this.snake.grow();
            this.score += 10;
            this.updateScore();
            this.food.randomPosition(this.snake.getBody());
        }

        // 渲染画面
        this.render();
    }

    // 渲染游戏画面
    render() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        // 绘制网格
        this.drawGrid();
        
        // 绘制食物
        this.food.draw(this.ctx);
        
        // 绘制蛇
        this.snake.draw(this.ctx);
    }

    // 绘制网格
    drawGrid() {
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 1;

        // 绘制垂直线
        for (let x = 0; x <= this.canvasWidth; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvasHeight);
            this.ctx.stroke();
        }

        // 绘制水平线
        for (let y = 0; y <= this.canvasHeight; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvasWidth, y);
            this.ctx.stroke();
        }
    }

    // 更新分数显示
    updateScore() {
        this.currentScoreElement.textContent = this.score;
    }

    // 更新最高分显示
    updateHighScore() {
        this.highScoreElement.textContent = this.leaderboard.getHighScore();
    }

    // 游戏结束
    gameOver() {
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.gameLoop);
        document.getElementById('pause-btn').disabled = true;
        
        // 播放游戏结束音效
        this.audioManager.playGameOver();
        
        // 显示最终分数
        this.finalScoreElement.textContent = this.score;
        
        // 显示游戏结束画面
        this.gameOverScreen.classList.remove('hidden');
        
        // 自动填充上次的用户名
        const nameInput = document.getElementById('player-name');
        const lastName = this.leaderboard.getLastPlayerName();
        if (lastName) {
            nameInput.value = lastName;
        }
        
        // 如果是新纪录，自动聚焦输入框
        if (this.leaderboard.isTopScore(this.score) || this.score > 0) {
            nameInput.focus();
            nameInput.select(); // 选中文本方便修改
        }
    }

    // 保存分数
    async saveScore() {
        const nameInput = document.getElementById('player-name');
        const name = nameInput.value.trim() || '匿名玩家';
        
        const saveBtn = document.getElementById('save-score-btn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '保存中...';
        saveBtn.disabled = true;
        
        await this.leaderboard.addScore(name, this.score);
        this.updateLeaderboard();
        this.updateHighScore();
        
        // 提示保存成功
        saveBtn.textContent = '✓ 已保存';
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        }, 2000);
    }

    // 更新排行榜显示
    updateLeaderboard() {
        this.leaderboard.display('leaderboard-list');
    }

    // 重新开始游戏
    restart() {
        // 重置游戏状态
        this.score = 0;
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.gameLoop);
        
        // 重置游戏对象
        this.snake.reset();
        this.food.randomPosition(this.snake.getBody());
        
        // 更新UI
        this.updateScore();
        this.startScreen.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
        this.pauseScreen.classList.add('hidden');
        
        // 渲染初始画面
        this.render();
        
        // 开始游戏
        this.start();
    }
}

// 当页面加载完成后，初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});
