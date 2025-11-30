// ===== VELOCITY V2.0 - Enhanced Typing Game =====
// Con Power-Ups, Categorías, Logros, Temas y Música Dinámica

// Game State
let gameState = {
    isPlaying: false,
    difficulty: 'medium',
    category: 'general',
    score: 0,
    combo: 1,
    level: 1,
    lives: 3,
    currentWord: '',
    timeLeft: 5,
    timerInterval: null,
    wordsTyped: 0,
    correctWords: 0,
    totalChars: 0,
    correctChars: 0,
    startTime: null,
    streak: 0,
    bestStreak: 0,
    powerups: [],
    activePowerup: null,
    currentMusicTrack: 1,
    achievements: []
};

// Word Lists por Categoría
const wordLists = {
    general: {
        easy: ['casa', 'gato', 'sol', 'mar', 'luz', 'pan', 'rio', 'flor', 'luna', 'nube', 'pez', 'ave', 'mesa', 'silla', 'puerta'],
        medium: ['velocidad', 'teclado', 'pantalla', 'programar', 'desarrollo', 'tecnologia', 'computadora', 'internet', 'aplicacion', 'sistema'],
        hard: ['extraordinario', 'magnifico', 'espectacular', 'impresionante', 'revolucionario', 'incomparable', 'excepcional', 'fenomenal'],
        expert: ['asynchronous', 'polymorphism', 'encapsulation', 'inheritance', 'abstraction', 'recursion', 'algorithm', 'optimization']
    },
    programming: {
        easy: ['code', 'bug', 'loop', 'array', 'class', 'function', 'variable', 'string', 'boolean', 'integer'],
        medium: ['javascript', 'python', 'database', 'framework', 'algorithm', 'debugging', 'compiler', 'syntax', 'library'],
        hard: ['asynchronous', 'polymorphism', 'encapsulation', 'inheritance', 'abstraction', 'recursion', 'optimization', 'refactoring'],
        expert: ['microservices', 'containerization', 'orchestration', 'serialization', 'deserialization', 'middleware', 'dependency']
    },
    gaming: {
        easy: ['play', 'game', 'win', 'lose', 'jump', 'run', 'shoot', 'score', 'level', 'boss'],
        medium: ['multiplayer', 'checkpoint', 'achievement', 'leaderboard', 'controller', 'graphics', 'gameplay', 'strategy'],
        hard: ['speedrun', 'platformer', 'roguelike', 'metroidvania', 'battleroyal', 'esports', 'streaming'],
        expert: ['procedural generation', 'hitbox', 'framerate', 'antialiasing', 'raytracing', 'tessellation']
    },
    countries: {
        easy: ['peru', 'chile', 'mexico', 'españa', 'italia', 'japon', 'china', 'india', 'brasil', 'canada'],
        medium: ['argentina', 'colombia', 'venezuela', 'alemania', 'francia', 'portugal', 'australia', 'egipto'],
        hard: ['madagascar', 'filipinas', 'indonesia', 'tailandia', 'sudafrica', 'marruecos', 'finlandia'],
        expert: ['uzbekistan', 'azerbaiyan', 'kazajistan', 'turkmenistan', 'kirguistan', 'tayikistan']
    },
    food: {
        easy: ['pizza', 'pasta', 'arroz', 'pollo', 'carne', 'pescado', 'pan', 'queso', 'leche', 'huevo'],
        medium: ['hamburguesa', 'ensalada', 'spaghetti', 'lasagna', 'burrito', 'tacos', 'sushi', 'ramen'],
        hard: ['cappuccino', 'croissant', 'mozzarella', 'bruschetta', 'tiramisu', 'carbonara', 'bolognesa'],
        expert: ['bouillabaisse', 'ratatouille', 'coqauvin', 'cassoulet', 'chateaubriand', 'escargot']
    }
};

// Power-Ups
const powerupTypes = [
    { id: 'time', icon: '⏰', name: '+2 Segundos', effect: 'time' },
    { id: 'shield', icon: '🛡️', name: 'Escudo', effect: 'shield' },
    { id: 'fire', icon: '🔥', name: 'Doble Puntos', effect: 'double' },
    { id: 'slow', icon: '⚡', name: 'Slow-Mo', effect: 'slowmo' }
];

// Achievements
const achievements = [
    { id: 'first_win', name: 'Primera Victoria', desc: 'Completa 10 palabras', icon: '🥉', requirement: 10, type: 'words' },
    { id: 'speedster', name: 'Velocista', desc: 'Alcanza 50 WPM', icon: '🥈', requirement: 50, type: 'wpm' },
    { id: 'master', name: 'Maestro', desc: 'Alcanza 100 WPM', icon: '🥇', requirement: 100, type: 'wpm' },
    { id: 'perfect', name: 'Perfeccionista', desc: '100% precisión en 20 palabras', icon: '💎', requirement: 20, type: 'perfect' },
    { id: 'streak', name: 'Racha Imparable', desc: '30 palabras seguidas', icon: '🔥', requirement: 30, type: 'streak' }
];

// Stats (localStorage)
let stats = {
    totalGames: 0,
    highScore: 0,
    totalWords: 0,
    bestWPM: 0,
    avgAccuracy: 0,
    longestStreak: 0,
    unlockedAchievements: []
};

// Music Tracks
const musicTracks = [
    document.getElementById('bgMusic1'),
    document.getElementById('bgMusic2'),
    document.getElementById('bgMusic3'),
    document.getElementById('bgMusic4')
];

let currentMusic = null;

// DOM Elements (same as before, plus new ones)
const elements = {
    // Existing elements...
    startBtn: document.getElementById('startBtn'),
    statsBtn: document.getElementById('statsBtn'),
    diffBtns: document.querySelectorAll('.diff-btn'),
    score: document.getElementById('score'),
    combo: document.getElementById('combo'),
    level: document.getElementById('level'),
    lives: document.getElementById('lives'),
    timerBar: document.getElementById('timerBar'),
    timerText: document.getElementById('timerText'),
    targetWord: document.getElementById('targetWord'),
    wordInput: document.getElementById('wordInput'),
    feedback: document.getElementById('feedback'),
    wpm: document.getElementById('wpm'),
    accuracy: document.getElementById('accuracy'),
    streak: document.getElementById('streak'),
    powerups: document.getElementById('powerups'),

    // Sounds
    correctSound: document.getElementById('correctSound'),
    wrongSound: document.getElementById('wrongSound'),
    gameOverSound: document.getElementById('gameOverSound'),
    tickSound: document.getElementById('tickSound'),
    powerupSound: document.getElementById('powerupSound'),
    levelupSound: document.getElementById('levelupSound'),

    musicToggle: document.getElementById('musicToggle'),
    themeToggle: document.getElementById('themeToggle')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    setupEventListeners();
    startMusic();
});

function startMusic() {
    currentMusic = musicTracks[0];
    currentMusic.volume = 0.3;
    currentMusic.play().catch(() => { });
}

function switchMusicTrack() {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }

    gameState.currentMusicTrack = (gameState.currentMusicTrack % 4) + 1;
    currentMusic = musicTracks[gameState.currentMusicTrack - 1];
    currentMusic.volume = 0.3;
    currentMusic.play().catch(() => { });
}

function adjustMusicIntensity() {
    if (!currentMusic) return;

    // Aumentar volumen según progreso
    const progress = gameState.correctWords / 50; // Cada 50 palabras
    const newVolume = Math.min(0.3 + (progress * 0.3), 0.6);
    currentMusic.volume = newVolume;

    // Cambiar música cada 10 niveles
    if (gameState.level % 10 === 0 && gameState.level > 0) {
        switchMusicTrack();
    }
}

// Power-Up System
function spawnPowerup() {
    if (gameState.correctWords % 5 === 0 && gameState.correctWords > 0) {
        const randomPowerup = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
        showPowerupNotification(randomPowerup);
        gameState.activePowerup = randomPowerup;
        playSound('powerup');
    }
}

function showPowerupNotification(powerup) {
    const notification = document.createElement('div');
    notification.className = 'powerup';
    notification.innerHTML = `${powerup.icon} ${powerup.name}`;
    elements.powerups.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

function applyPowerup() {
    if (!gameState.activePowerup) return;

    const powerup = gameState.activePowerup;

    switch (powerup.effect) {
        case 'time':
            gameState.timeLeft += 2;
            break;
        case 'shield':
            // Next error won't count
            gameState.hasShield = true;
            break;
        case 'double':
            gameState.doublePoints = true;
            setTimeout(() => gameState.doublePoints = false, 10000);
            break;
        case 'slowmo':
            // Timer goes slower
            gameState.slowMo = true;
            setTimeout(() => gameState.slowMo = false, 10000);
            break;
    }

    gameState.activePowerup = null;
}

// Achievement System
function checkAchievements() {
    achievements.forEach(achievement => {
        if (stats.unlockedAchievements.includes(achievement.id)) return;

        let unlocked = false;

        switch (achievement.type) {
            case 'words':
                unlocked = gameState.correctWords >= achievement.requirement;
                break;
            case 'wpm':
                const wpm = calculateWPM();
                unlocked = wpm >= achievement.requirement;
                break;
            case 'perfect':
                const accuracy = (gameState.correctChars / gameState.totalChars) * 100;
                unlocked = accuracy === 100 && gameState.correctWords >= achievement.requirement;
                break;
            case 'streak':
                unlocked = gameState.streak >= achievement.requirement;
                break;
        }

        if (unlocked) {
            unlockAchievement(achievement);
        }
    });
}

function unlockAchievement(achievement) {
    stats.unlockedAchievements.push(achievement.id);
    saveStats();

    showFeedback(`${achievement.icon} ${achievement.name} Desbloqueado!`, 'correct');
    playSound('levelup');
}

// Enhanced Game Functions
function startGame() {
    gameState = {
        ...gameState,
        isPlaying: true,
        score: 0,
        combo: 1,
        level: 1,
        lives: 3,
        timeLeft: 5,
        wordsTyped: 0,
        correctWords: 0,
        totalChars: 0,
        correctChars: 0,
        startTime: Date.now(),
        streak: 0,
        bestStreak: 0,
        activePowerup: null,
        hasShield: false,
        doublePoints: false,
        slowMo: false
    };

    showScreen('game');
    nextWord();
    startTimer();
    updateUI();
    elements.wordInput.focus();

    // Start with fresh music
    if (currentMusic) {
        currentMusic.currentTime = 0;
        currentMusic.volume = 0.3;
    }
}

function nextWord() {
    const words = wordLists[gameState.category][gameState.difficulty];
    gameState.currentWord = words[Math.floor(Math.random() * words.length)];
    elements.targetWord.textContent = gameState.currentWord;
    elements.wordInput.value = '';
    elements.feedback.textContent = '';
    elements.feedback.className = 'feedback';

    gameState.timeLeft = 5;
    updateTimer();

    // Spawn power-up check
    spawnPowerup();
}

function startTimer() {
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);

    gameState.timerInterval = setInterval(() => {
        const decrement = gameState.slowMo ? 0.05 : 0.1;
        gameState.timeLeft -= decrement;

        if (gameState.timeLeft <= 0) {
            loseLife();
        } else {
            updateTimer();

            if (gameState.timeLeft <= 2) {
                elements.timerBar.classList.add('warning');
                document.body.classList.add('danger');

                if (gameState.timeLeft % 1 < 0.1) {
                    playSound('tick');
                }
            } else {
                elements.timerBar.classList.remove('warning');
                document.body.classList.remove('danger');
            }
        }
    }, 100);
}

function correctWord() {
    playSound('correct');

    gameState.wordsTyped++;
    gameState.correctWords++;
    gameState.totalChars += gameState.currentWord.length;
    gameState.correctChars += gameState.currentWord.length;
    gameState.streak++;

    if (gameState.streak > gameState.bestStreak) {
        gameState.bestStreak = gameState.streak;
    }

    // Apply power-up if active
    applyPowerup();

    const timeBonus = Math.floor(gameState.timeLeft * 10);
    const comboBonus = gameState.combo;
    let points = (100 + timeBonus) * comboBonus;

    if (gameState.doublePoints) {
        points *= 2;
        showFeedback(`🔥 x2 PUNTOS! +${points}`, 'correct');
    }

    gameState.score += points;

    if (gameState.timeLeft > 3) {
        gameState.combo = Math.min(gameState.combo + 1, 10);
    }

    // Level up
    if (gameState.correctWords % 10 === 0) {
        gameState.level++;
        playSound('levelup');
        showFeedback(`¡NIVEL ${gameState.level}!`, 'correct');
        adjustMusicIntensity();
    } else {
        showFeedback(`+${points} pts`, 'correct');
    }

    elements.wordInput.classList.add('correct');
    setTimeout(() => elements.wordInput.classList.remove('correct'), 300);

    checkAchievements();
    updateUI();
    nextWord();
}

function loseLife() {
    if (gameState.hasShield) {
        gameState.hasShield = false;
        showFeedback('🛡️ ESCUDO ACTIVADO!', 'correct');
        nextWord();
        return;
    }

    playSound('wrong');

    gameState.lives--;
    gameState.combo = 1;
    gameState.streak = 0;

    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);

    elements.wordInput.classList.add('wrong');
    setTimeout(() => elements.wordInput.classList.remove('wrong'), 300);

    showFeedback('TIEMPO AGOTADO!', 'wrong');

    if (gameState.lives <= 0) {
        gameOver();
    } else {
        updateUI();
        nextWord();
    }
}

function calculateWPM() {
    const minutes = (Date.now() - gameState.startTime) / 60000;
    return Math.floor(gameState.correctWords / minutes) || 0;
}

function updateUI() {
    elements.score.textContent = gameState.score;
    elements.combo.textContent = `x${gameState.combo}`;
    elements.level.textContent = gameState.level;
    elements.lives.textContent = '❤️'.repeat(gameState.lives);

    const wpm = calculateWPM();
    elements.wpm.textContent = wpm;

    const accuracy = gameState.totalChars > 0
        ? Math.floor((gameState.correctChars / gameState.totalChars) * 100)
        : 100;
    elements.accuracy.textContent = `${accuracy}%`;

    elements.streak.textContent = gameState.streak;
}

function updateTimer() {
    const percentage = (gameState.timeLeft / 5) * 100;
    elements.timerBar.style.width = `${percentage}%`;
    elements.timerText.textContent = `${gameState.timeLeft.toFixed(1)}s`;
}

function checkWord() {
    const input = elements.wordInput.value.toLowerCase();
    const target = gameState.currentWord.toLowerCase();

    if (input === target) {
        correctWord();
    }
}

function showFeedback(text, type) {
    elements.feedback.textContent = text;
    elements.feedback.className = `feedback ${type}`;
}

function gameOver() {
    gameState.isPlaying = false;
    clearInterval(gameState.timerInterval);
    document.body.classList.remove('danger');

    playSound('gameOver');

    const finalWPM = calculateWPM();
    const finalAccuracy = gameState.totalChars > 0
        ? Math.floor((gameState.correctChars / gameState.totalChars) * 100)
        : 0;

    // Update stats
    stats.totalGames++;
    stats.highScore = Math.max(stats.highScore, gameState.score);
    stats.totalWords += gameState.correctWords;
    stats.bestWPM = Math.max(stats.bestWPM, finalWPM);
    stats.longestStreak = Math.max(stats.longestStreak, gameState.bestStreak);
    stats.avgAccuracy = Math.floor(
        ((stats.avgAccuracy * (stats.totalGames - 1)) + finalAccuracy) / stats.totalGames
    );

    saveStats();
    showScreen('gameOver');
}

// Helper Functions
function playSound(type) {
    const sound = elements[`${type}Sound`];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => { });
    }
}

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(`${screen}Screen`).style.display = 'block';
}

function loadStats() {
    const saved = localStorage.getItem('velocityStats');
    if (saved) {
        stats = JSON.parse(saved);
    }
}

function saveStats() {
    localStorage.setItem('velocityStats', JSON.stringify(stats));
}

// Event Listeners
function setupEventListeners() {
    elements.startBtn.addEventListener('click', startGame);
    elements.wordInput.addEventListener('input', checkWord);
    elements.musicToggle.addEventListener('click', () => {
        if (currentMusic.paused) {
            currentMusic.play();
            elements.musicToggle.textContent = '🔊';
        } else {
            currentMusic.pause();
            elements.musicToggle.textContent = '🔇';
        }
    });
}
