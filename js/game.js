// js/game.js
import { eventBus } from './events.js';
import { dictionary } from './dictionary.js';

const GRID_SIZE = 20; 
const CELL_SIZE = 24; 

const MULTIPLIER_TYPES = {
    x2L: { color: '#34d399', bg: 'rgba(52, 211, 153, 0.25)', textEs: 'x2 L', textEn: 'x2 L', textFr: 'x2 L' },
    x3L: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.3)', textEs: 'x3 L', textEn: 'x3 L', textFr: 'x3 L' },
    x2P: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.25)', textEs: 'x2 P', textEn: 'x2 W', textFr: 'x2 M' },
    x3P: { color: '#ea580c', bg: 'rgba(234, 88, 12, 0.3)', textEs: 'x3 P', textEn: 'x3 W', textFr: 'x3 M' }
};

export class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        this.snake = [];
        this.collectedLetters = []; 
        this.tiles = [];
        this.multipliers = [];
        this.direction = { x: 0, y: 0 };
        this.inputQueue = [];
        this.score = 0;
        this.isGameOver = false;
        this.isGameRunning = false;
        this.lastTime = 0;
        this.tickRate = 250; 
        this.accumulator = 0;
        this.animations = [];
        this.wordsFoundCount = 0;

        // Binding methods
        this.gameLoop = this.gameLoop.bind(this);
        
        this.setupInput();
        
        eventBus.on('START_GAME', () => this.start());
        eventBus.on('SUBMIT_WORD', () => this.attemptSubmitWord());
        eventBus.on('THEME_TOGGLED', () => { if(!this.isGameRunning) this.drawGame(); });
    }

    setupInput() {
        window.addEventListener('keydown', e => {
            if(!this.isGameRunning) return;
            let newDir = null;
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') newDir = { x: 0, y: -1 };
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') newDir = { x: 0, y: 1 };
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') newDir = { x: -1, y: 0 };
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') newDir = { x: 1, y: 0 };
            
            if (newDir) {
                e.preventDefault();
                this.inputQueue.push(newDir);
            } else if (e.code === 'Space') {
                e.preventDefault();
                this.attemptSubmitWord();
            }
        });

        // Touch Controls
        let touchStartX = 0;
        let touchStartY = 0;
        this.canvas.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, {passive: false});

        this.canvas.addEventListener('touchmove', e => { e.preventDefault(); }, {passive: false});

        this.canvas.addEventListener('touchend', e => {
            if(!this.isGameRunning) return;
            let dx = e.changedTouches[0].screenX - touchStartX;
            let dy = e.changedTouches[0].screenY - touchStartY;
            if (Math.abs(dx) > Math.abs(dy)) {
                if (Math.abs(dx) > 30) this.inputQueue.push({ x: dx > 0 ? 1 : -1, y: 0 });
            } else {
                if (Math.abs(dy) > 30) this.inputQueue.push({ x: 0, y: dy > 0 ? 1 : -1 });
            }
        });
    }

    generateMultipliers() {
        this.multipliers = [];
        const addM = (coords, type) => {
            coords.forEach(([x,y]) => this.multipliers.push({x, y, type, active: true}));
        };
        
        addM([[0,0], [0,19], [19,0], [19,19], [9,9], [10,10], [9,10], [10,9]], 'x3P');
        addM([[2,2], [3,3], [16,16], [17,17], [2,17], [3,16], [17,2], [16,3], [9,2], [10,2], [9,17], [10,17], [2,9], [2,10], [17,9], [17,10]], 'x2P');
        addM([[5,5], [5,14], [14,5], [14,14], [0,7], [0,12], [19,7], [19,12], [7,0], [12,0], [7,19], [12,19]], 'x3L');
        addM([[4,9], [4,10], [15,9], [15,10], [9,4], [10,4], [9,15], [10,15], [6,6], [6,13], [13,6], [13,13]], 'x2L');
    }

    start() {
        this.snake = [{ x: 10, y: 10 }];
        this.collectedLetters = [];
        this.tiles = [];
        this.direction = { x: 0, y: 0 }; 
        this.inputQueue = [];
        this.score = 0;
        this.tickRate = 250; 
        this.wordsFoundCount = 0;
        this.isGameOver = false;
        this.isGameRunning = true;
        this.accumulator = 0;
        this.lastTime = performance.now();
        
        this.generateMultipliers();
        while(this.tiles.length < 7) this.spawnTile();
        
        this.gameStartTime = new Date().getTime();

        eventBus.emit('SCORE_UPDATED', this.score);
        eventBus.emit('LETTERS_UPDATED', this.collectedLetters);
        eventBus.emit('PLAY_SOUND', 'start');
        
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop(time) {
        if (!this.isGameRunning) return;
        requestAnimationFrame(this.gameLoop);
        
        let deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.accumulator += deltaTime;

        this.animations.forEach(a => {
            a.y -= (20 * (deltaTime/1000)); 
            a.life -= deltaTime;
        });
        this.animations = this.animations.filter(a => a.life > 0);

        if (this.accumulator >= this.tickRate) {
            this.accumulator -= this.tickRate;
            this.updateGame();
        }
        this.drawGame();
    }

    updateGame() {
        if (this.isGameOver) return;

        if (this.inputQueue.length > 0) {
            let nextDir = this.inputQueue.shift();
            if ((this.direction.x === 0 && this.direction.y === 0) || 
                (nextDir.x !== -this.direction.x || nextDir.y !== -this.direction.y)) {
                this.direction = nextDir;
            }
        }

        if (this.direction.x === 0 && this.direction.y === 0) return;

        let newHead = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };

        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
            this.endGame();
            return;
        }

        for (let i = 0; i < this.snake.length; i++) {
            if (this.snake[i].x === newHead.x && this.snake[i].y === newHead.y) {
                this.endGame();
                return;
            }
        }

        let ateIndex = this.tiles.findIndex(t => t.x === newHead.x && t.y === newHead.y);
        let prevTail = { x: this.snake[this.snake.length - 1].x, y: this.snake[this.snake.length - 1].y };

        for (let i = this.snake.length - 1; i > 0; i--) {
            this.snake[i].x = this.snake[i - 1].x;
            this.snake[i].y = this.snake[i - 1].y;
        }
        this.snake[0].x = newHead.x;
        this.snake[0].y = newHead.y;

        if (ateIndex !== -1) {
            let eatenTile = this.tiles[ateIndex];
            this.tiles.splice(ateIndex, 1);
            
            this.score += 1; 
            this.tickRate = Math.max(70, this.tickRate - 3); 
            this.createFloatingText("+1", newHead.x, newHead.y, "#fde68a");

            this.collectedLetters.push(eatenTile.char);
            this.snake.push({ x: prevTail.x, y: prevTail.y, char: '' });
            
            eventBus.emit('PLAY_SOUND', 'eat');
            eventBus.emit('SCORE_UPDATED', this.score);
        }

        for (let i = 1; i < this.snake.length; i++) {
            this.snake[i].char = this.collectedLetters[i - 1];
        }
        
        if (ateIndex !== -1) {
            eventBus.emit('LETTERS_UPDATED', this.collectedLetters);
        } else {
            eventBus.emit('PLAY_SOUND', 'move');
        }

        while (this.tiles.length < 7) this.spawnTile();
    }

    attemptSubmitWord() {
        if (!this.isGameRunning) return;
        
        if (this.collectedLetters.length < 3) {
            this.createFloatingText("Min 3", this.snake[0].x, this.snake[0].y - 1, "#ef4444");
            eventBus.emit('PLAY_SOUND', 'invalid');
            eventBus.emit('WORD_INVALID', 'min3');
            return;
        }

        const wordStr = this.collectedLetters.join('');
        let wordFound = false;

        for (let len = wordStr.length; len >= 3; len--) {
            let word = wordStr.substr(wordStr.length - len, len);
            
            if (dictionary.hasWord(word)) {
                let wordSegments = this.snake.slice(this.snake.length - len);
                let wordBaseScore = 0;
                let wordMultipliersCount = [];
                let usedMultipliers = [];
                let values = dictionary.getValues();

                for (let i = 0; i < len; i++) {
                    let char = word[i];
                    let segment = wordSegments[i];
                    let letterScore = values[char] || 1;
                    
                    let mIndex = this.multipliers.findIndex(m => m.active && m.x === segment.x && m.y === segment.y);
                    if (mIndex !== -1) {
                        let m = this.multipliers[mIndex];
                        if (m.type === 'x2L') letterScore *= 2;
                        else if (m.type === 'x3L') letterScore *= 3;
                        else if (m.type === 'x2P' || m.type === 'x3P') wordMultipliersCount.push(m.type);
                        usedMultipliers.push(m);
                    }
                    wordBaseScore += letterScore;
                }

                let totalPoints = wordBaseScore;
                
                wordMultipliersCount.forEach(type => {
                    if (type === 'x2P') totalPoints *= 2;
                    if (type === 'x3P') totalPoints *= 3;
                });

                let multiplier = Math.max(1, len - 2); 
                totalPoints *= multiplier;
                
                this.score += totalPoints;
                this.wordsFoundCount++;
                
                // Extraer los tipos para la UI
                let multTypes = usedMultipliers.map(m => m.type);
                eventBus.emit('WORD_VALIDATED', { word, points: totalPoints, multTypes });
                
                this.createFloatingText("+" + totalPoints + " " + word, this.snake[0].x, this.snake[0].y - 1, "#4ade80");

                usedMultipliers.forEach(m => m.active = false);

                this.collectedLetters.splice(-len);
                this.snake.splice(-len);

                for (let i = 1; i < this.snake.length; i++) {
                    this.snake[i].char = this.collectedLetters[i - 1];
                }

                eventBus.emit('PLAY_SOUND', 'valid');
                eventBus.emit('SCORE_UPDATED', this.score);
                eventBus.emit('LETTERS_UPDATED', this.collectedLetters);
                
                wordFound = true;
                return; 
            }
        }

        if (!wordFound) {
            this.createFloatingText("Bloqueada", this.snake[0].x, this.snake[0].y - 1, "#ef4444");
            eventBus.emit('PLAY_SOUND', 'invalid');
            eventBus.emit('WORD_INVALID', 'blocked');
        }
    }

    spawnTile() {
        let emptySpots = [];
        for(let x=0; x<GRID_SIZE; x++){
            for(let y=0; y<GRID_SIZE; y++){
                if(!this.snake.some(s => s.x === x && s.y === y) && !this.tiles.some(t => t.x === x && t.y === y)) {
                    emptySpots.push({x, y});
                }
            }
        }
        if(emptySpots.length > 0) {
            let spot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
            let bag = dictionary.getBag();
            let randomChar = bag[Math.floor(Math.random() * bag.length)];
            this.tiles.push({ x: spot.x, y: spot.y, char: randomChar });
        }
    }

    createFloatingText(text, x, y, color) {
        this.animations.push({ text: text, x: x * CELL_SIZE, y: y * CELL_SIZE, color: color, life: 1000 });
    }

    endGame() {
        this.isGameOver = true;
        this.isGameRunning = false;
        
        const endTime = new Date().getTime();
        const durationSeconds = Math.floor((endTime - this.gameStartTime) / 1000);

        eventBus.emit('PLAY_SOUND', 'gameover');
        eventBus.emit('GAME_OVER', { score: this.score, wordsCount: this.wordsFoundCount, duration: durationSeconds });
    }

    drawGame() {
        const isDark = document.documentElement.classList.contains('dark');
        
        this.ctx.fillStyle = isDark ? '#1e293b' : '#f8fafc';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = isDark ? '#334155' : '#e2e8f0';
        this.ctx.lineWidth = 1;
        for(let i = 0; i <= this.canvas.width; i += CELL_SIZE) {
            this.ctx.beginPath(); this.ctx.moveTo(i, 0); this.ctx.lineTo(i, this.canvas.height); this.ctx.stroke();
            this.ctx.beginPath(); this.ctx.moveTo(0, i); this.ctx.lineTo(this.canvas.width, i); this.ctx.stroke();
        }

        this.multipliers.forEach(m => {
            let px = m.x * CELL_SIZE;
            let py = m.y * CELL_SIZE;
            
            if (m.active) {
                this.ctx.fillStyle = MULTIPLIER_TYPES[m.type].bg;
                this.ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                
                this.ctx.fillStyle = MULTIPLIER_TYPES[m.type].color;
                this.ctx.font = "bold 10px Inter";
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                let tKey = dictionary.currentLang === 'es' ? 'textEs' : (dictionary.currentLang === 'en' ? 'textEn' : 'textFr');
                this.ctx.fillText(MULTIPLIER_TYPES[m.type][tKey], px + CELL_SIZE/2, py + CELL_SIZE/2);
            } else {
                this.ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
                this.ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
            }
        });

        this.tiles.forEach(tile => {
            let px = tile.x * CELL_SIZE;
            let py = tile.y * CELL_SIZE;
            
            let grd = this.ctx.createLinearGradient(px, py, px+CELL_SIZE, py+CELL_SIZE);
            grd.addColorStop(0, "#818cf8"); 
            grd.addColorStop(1, "#4f46e5"); 
            this.ctx.fillStyle = grd;
            this.ctx.beginPath(); this.ctx.roundRect(px+1, py+1, CELL_SIZE-2, CELL_SIZE-2, 4); this.ctx.fill();
            
            this.ctx.strokeStyle = "#3730a3"; 
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            this.ctx.fillStyle = "#ffffff";
            this.ctx.font = "bold 15px Inter";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(tile.char, px + CELL_SIZE/2, py + CELL_SIZE/2);

            this.ctx.font = "6px Inter";
            this.ctx.fillStyle = "#e0e7ff"; 
            this.ctx.fillText(dictionary.getValues()[tile.char] || 1, px + CELL_SIZE - 5, py + CELL_SIZE - 5);
        });

        for (let i = this.snake.length - 1; i >= 0; i--) {
            let segment = this.snake[i];
            let px = segment.x * CELL_SIZE;
            let py = segment.y * CELL_SIZE;

            if (i === 0) {
                this.ctx.fillStyle = '#059669'; 
                this.ctx.beginPath(); this.ctx.roundRect(px+1, py+1, CELL_SIZE-2, CELL_SIZE-2, 6); this.ctx.fill();
                
                this.ctx.fillStyle = 'white';
                if(this.direction.x === 1) { 
                    this.ctx.fillRect(px+16, py+6, 4, 4); this.ctx.fillRect(px+16, py+14, 4, 4);
                } else if(this.direction.x === -1) { 
                    this.ctx.fillRect(px+4, py+6, 4, 4); this.ctx.fillRect(px+4, py+14, 4, 4);
                } else if(this.direction.y === 1) { 
                    this.ctx.fillRect(px+6, py+16, 4, 4); this.ctx.fillRect(px+14, py+16, 4, 4);
                } else { 
                    this.ctx.fillRect(px+6, py+4, 4, 4); this.ctx.fillRect(px+14, py+4, 4, 4);
                }
            } else {
                this.ctx.fillStyle = '#10b981'; 
                this.ctx.beginPath(); this.ctx.roundRect(px+2, py+2, CELL_SIZE-4, CELL_SIZE-4, 4); this.ctx.fill();
                
                if (segment.char) {
                    this.ctx.fillStyle = '#ecfdf5';
                    this.ctx.font = "bold 14px Inter";
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "middle";
                    this.ctx.fillText(segment.char, px + CELL_SIZE/2, py + CELL_SIZE/2 + 1);
                }
            }
        }

        this.animations.forEach(a => {
            this.ctx.globalAlpha = Math.max(0, a.life / 1000);
            this.ctx.fillStyle = a.color;
            this.ctx.font = "bold 18px Inter";
            this.ctx.textAlign = "center";
            this.ctx.fillText(a.text, a.x + CELL_SIZE/2, a.y);
        });
        this.ctx.globalAlpha = 1.0;
    }
}
