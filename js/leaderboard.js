// 排行榜类（在线版本）
class Leaderboard {
    constructor() {
        this.scores = [];
        this.maxScores = 10; // 最多保存10条记录
        this.apiUrl = 'https://api.jsonbin.io/v3/b/6734a1e5ad19ca34f8c4f2a1'; // JSONBin API
        this.apiKey = '$2a$10$VqHKj0LhX8wV6jY5oB9zLOxK9kZ.hP5qF9P.xL3nL9mY6zP8zF9nK'; // API Key
        this.load();
    }

    // 从在线数据库加载数据（优先云端）
    async load() {
        try {
            console.log('正在从云端加载排行榜数据...');
            // 优先从云端加载最新数据
            const response = await fetch(this.apiUrl + '/latest', {
                headers: {
                    'X-Master-Key': this.apiKey
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.record && data.record.scores) {
                    this.scores = data.record.scores;
                    // 更新本地缓存（仅作备份）
                    localStorage.setItem('snakeGameLeaderboard', JSON.stringify(this.scores));
                    console.log('✓ 云端数据加载成功，共' + this.scores.length + '条记录');
                    return;
                }
            }
            
            // 如果云端加载失败，才使用本地缓存
            throw new Error('云端数据加载失败');
        } catch (e) {
            console.warn('云端加载失败，尝试使用本地缓存:', e.message);
            const cachedData = localStorage.getItem('snakeGameLeaderboard');
            if (cachedData) {
                this.scores = JSON.parse(cachedData);
                console.log('使用本地缓存数据，共' + this.scores.length + '条记录');
            } else {
                this.scores = [];
                console.log('无可用数据，初始化空排行榜');
            }
        }
    }

    // 保存到在线数据库（优先云端同步）
    async save() {
        try {
            console.log('正在保存到云端...');
            // 先保存到云端
            const response = await fetch(this.apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.apiKey
                },
                body: JSON.stringify({
                    scores: this.scores
                })
            });
            
            if (response.ok) {
                console.log('✓ 云端保存成功！');
                // 云端保存成功后，更新本地缓存
                localStorage.setItem('snakeGameLeaderboard', JSON.stringify(this.scores));
                return true;
            } else {
                throw new Error('云端保存失败: ' + response.status);
            }
        } catch (e) {
            console.error('云端保存失败:', e);
            // 云端保存失败，仍然保存到本地缓存
            localStorage.setItem('snakeGameLeaderboard', JSON.stringify(this.scores));
            console.log('已保存到本地缓存（离线模式）');
            return false;
        }
    }

    // 获取上次保存的用户名
    getLastPlayerName() {
        const lastName = localStorage.getItem('snakeGameLastPlayer');
        return lastName || '';
    }

    // 保存用户名
    savePlayerName(name) {
        localStorage.setItem('snakeGameLastPlayer', name);
    }

    // 添加分数（先加载最新云端数据再添加）
    async addScore(name, score) {
        if (!name || name.trim() === '') {
            name = '匿名玩家';
        }

        // 添加前先从云端刷新最新数据，确保不会覆盖其他设备的数据
        await this.load();

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
        
        // 保存用户名
        this.savePlayerName(name.trim());
        
        // 保存到云端和本地
        const success = await this.save();
        
        if (success) {
            console.log('✓ 成绩已同步到云端，所有设备可见');
        } else {
            console.warn('⚠ 成绩已保存到本地，请检查网络连接');
        }
        
        return success;
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

    // 显示排行榜（先刷新云端数据）
    async display(containerId) {
        // 每次显示前刷新云端数据
        await this.load();
        
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
