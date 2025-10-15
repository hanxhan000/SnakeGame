// 音效管理类
class AudioManager {
    constructor() {
        this.enabled = true;
        this.audioContext = null;
        this.sounds = {};
        
        // 初始化音效上下文
        this.initAudioContext();
        
        // 创建音效
        this.createSounds();
    }

    // 初始化音频上下文
    initAudioContext() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (e) {
            console.warn('Web Audio API 不支持', e);
        }
    }

    // 创建音效（使用音频合成）
    createSounds() {
        // 由于我们使用Web Audio API生成音效，不需要外部文件
        this.sounds = {
            eat: this.createEatSound.bind(this),
            wall: this.createWallSound.bind(this),
            gameOver: this.createGameOverSound.bind(this)
        };
    }

    // 创建吃食物音效
    createEatSound() {
        if (!this.audioContext || !this.enabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // 创建碰壁音效
    createWallSound() {
        if (!this.audioContext || !this.enabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    // 创建游戏结束音效
    createGameOverSound() {
        if (!this.audioContext || !this.enabled) return;
        
        const playNote = (frequency, startTime, duration) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(frequency, startTime);
            
            gainNode.gain.setValueAtTime(0.2, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        };
        
        // 播放一系列下降音符
        const baseTime = this.audioContext.currentTime;
        playNote(400, baseTime, 0.15);
        playNote(350, baseTime + 0.15, 0.15);
        playNote(300, baseTime + 0.3, 0.15);
        playNote(200, baseTime + 0.45, 0.3);
    }

    // 播放吃食物音效
    playEat() {
        this.sounds.eat();
    }

    // 播放碰壁音效
    playWall() {
        this.sounds.wall();
    }

    // 播放游戏结束音效
    playGameOver() {
        this.sounds.gameOver();
    }

    // 切换音效开关
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // 设置音效状态
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    // 获取音效状态
    isEnabled() {
        return this.enabled;
    }
}
