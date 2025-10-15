// 排行榜类
class Leaderboard {
    constructor() {
        this.scores = [];
        this.maxScores = 10; // 最多保存10条记录
        this.load();
    }

    // 从LocalStorage加载数据
    load() {
        try {
            const data = localStorage.getItem('snakeGameLeaderboard');
            if (data) {
                this.scores = JSON.parse(data);
            }
        } catch (e) {
            console.error('加载排行榜失败:', e);
            this.scores = [];
        }
    }

    // 保存到LocalStorage
    save() {
        try {
            localStorage.setItem('snakeGameLeaderboard', JSON.stringify(this.scores));
        } catch (e) {
            console.error('保存排行榜失败:', e);
        }
    }

    // 添加分数
    addScore(name, score) {
        if (!name || name.trim() === '') {
            name = '匿名玩家';
        }

        const newScore = {
            name: name.trim(),
            score: score,
            date: new Date().toLocaleDateString('zh-CN')
        };

        this.scores.push(newScore);
        
        // 按分数降序排序
        this.scores.sort((a, b) => b.score - a.score);
        
        // 只保留前10名
        this.scores = this.scores.slice(0, this.maxScores);
        
        this.save();
    }

    // 获取所有分数
    getScores() {
        return this.scores;
    }

    // 获取最高分
    getHighScore() {
        if (this.scores.length === 0) {
            return 0;
        }
        return this.scores[0].score;
    }

    // 检查是否进入排行榜
    isTopScore(score) {
        if (this.scores.length < this.maxScores) {
            return true;
        }
        return score > this.scores[this.scores.length - 1].score;
    }

    // 清空排行榜
    clear() {
        this.scores = [];
        this.save();
    }

    // 显示排行榜
    display(containerId) {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error('排行榜容器不存在');
            return;
        }

        if (this.scores.length === 0) {
            container.innerHTML = '<div class="empty-leaderboard">暂无记录</div>';
            return;
        }

        let html = '';
        this.scores.forEach((item, index) => {
            const rank = index + 1;
            let rankClass = '';
            
            if (rank === 1) rankClass = 'rank-1';
            else if (rank === 2) rankClass = 'rank-2';
            else if (rank === 3) rankClass = 'rank-3';
            
            html += `
                <div class="leaderboard-item ${rankClass}">
                    <span class="rank">#${rank}</span>
                    <span class="name">${this.escapeHtml(item.name)}</span>
                    <span class="score">${item.score}</span>
                    <span class="date">${item.date}</span>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // HTML转义，防止XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
