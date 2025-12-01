// VELOCITY - Classic Mode Logic with Difficulty & Checkpoints
// Game State
let score = 0;
let time = 5.00;
let isPlaying = false;
let currentWord = '';
let timerInterval;
let gameStartTime;
let wordsTyped = 0;
let charsTyped = 0;
let errors = 0;
let combo = 0;
let maxCombo = 0;
let lives = 3;
let level = 1;
let wordsUntilNextLevel = 10;
let powerups = [];
let currentDifficulty = 'medium';
let baseTime = 5.00;

// DOM Elements
const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');
const wpmDisplay = document.getElementById('wpm');
const comboDisplay = document.getElementById('combo-display');
const progressFill = document.getElementById('progress-fill');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const difficultyScreen = document.getElementById('difficulty-screen');
const gameHud = document.getElementById('game-hud');
const checkpointModal = document.getElementById('checkpoint-modal');

// Audio
const bgMusic = document.getElementById('bg-music');
const typeSound = document.getElementById('type-sound');
const errorSound = document.getElementById('error-sound');
const powerupSound = document.getElementById('powerup-sound');
const levelUpSound = document.getElementById('level-up-sound');

// Init
wordInput.addEventListener('input', checkInput);
// Removed Enter key listener to prevent accidental starts

// Auto-focus input on click anywhere
document.addEventListener('click', () => {
    if (isPlaying && !checkpointModal.style.display === 'flex') wordInput.focus();
});

function selectDifficulty(diff) {
    currentDifficulty = diff;
    document.body.className = `bg-${diff}`;

    switch (diff) {
        case 'easy':
            baseTime = 7.00;
            lives = 5;
            break;
        case 'medium':
            baseTime = 5.00;
            lives = 3;
            break;
        case 'hard':
            baseTime = 3.50;
            lives = 2;
            break;
        case 'hardcore':
            baseTime = 2.50;
            lives = 1;
            break;
    }

    difficultyScreen.style.display = 'none';
    gameHud.style.display = 'flex';
    startGame();
}

function startGame() {
    isPlaying = true;
    score = 0;
    time = baseTime;
    wordsTyped = 0;
    charsTyped = 0;
    errors = 0;
    combo = 0;
    level = 1;
    wordsUntilNextLevel = 10;
    powerups = [];
    gameStartTime = Date.now();

    // Load music volume from settings
    const musicVol = localStorage.getItem('velocity_music_volume');
    bgMusic.volume = musicVol ? parseFloat(musicVol) : 0.3;
    bgMusic.play().catch(e => console.log("Audio play failed", e));

    nextWord();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 10);
    wordInput.value = '';
    wordInput.focus();

    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    updateHUD();
}

function nextWord() {
    // Use WordBank if available
    if (typeof WordBank !== 'undefined') {
        currentWord = WordBank.getRandomWord();
    } else {
        const fallbackWords = ["velocidad", "teclado", "juego", "codigo", "datos"];
        currentWord = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    }

    wordDisplay.textContent = currentWord;
    wordInput.value = '';
    time = baseTime - (level * 0.1); // Slight speed up per level
    if (time < 1.5) time = 1.5; // Cap minimum time

    updateHUD();
}

function updateTimer() {
    if (!isPlaying) return;

    time -= 0.01;
    if (time <= 0) {
        handleMiss();
    }
    updateHUD();
}

function checkInput() {
    if (!isPlaying) return;

    const input = wordInput.value.trim().toLowerCase();

    // Load SFX volume from settings
    const sfxVol = localStorage.getItem('velocity_sfx_volume');
    const volume = sfxVol ? parseFloat(sfxVol) : 0.5;

    // Play type sound
    typeSound.volume = volume;
    typeSound.currentTime = 0;
    typeSound.play().catch(() => { });

    if (input === currentWord) {
        handleSuccess();
    } else if (!currentWord.startsWith(input)) {
        wordInput.style.color = 'red';
    } else {
        wordInput.style.color = 'white';
    }
}

function handleSuccess() {
    const timeBonus = Math.floor(time * 10);
    const comboBonus = combo * 5;
    score += 10 + timeBonus + comboBonus;
    wordsTyped++;
    charsTyped += currentWord.length;
    combo++;
    if (combo > maxCombo) maxCombo = combo;

    // Check for level up
    wordsUntilNextLevel--;
    if (wordsUntilNextLevel <= 0) {
        levelUp();
    }

    // Checkpoint every 100 words
    if (wordsTyped % 100 === 0) {
        showCheckpoint();
        return;
    }

    // Random power-up spawn (10% chance)
    if (Math.random() < 0.1) {
        spawnPowerup();
    }

    nextWord();
}

function showCheckpoint() {
    isPlaying = false;
    clearInterval(timerInterval);
    bgMusic.pause();
    checkpointModal.style.display = 'flex';
}

function continueGame() {
    checkpointModal.style.display = 'none';
    isPlaying = true;

    const musicVol = localStorage.getItem('velocity_music_volume');
    bgMusic.volume = musicVol ? parseFloat(musicVol) : 0.3;
    bgMusic.play();

    timerInterval = setInterval(updateTimer, 10);
    wordInput.focus();
    nextWord();
}

function handleMiss() {
    lives--;
    combo = 0;
    errors++;

    const sfxVol = localStorage.getItem('velocity_sfx_volume');
    const volume = sfxVol ? parseFloat(sfxVol) : 0.5;
    errorSound.volume = volume;
    errorSound.play().catch(() => { });

    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);

    if (lives <= 0) {
        endGame();
    } else {
        nextWord();
    }
}

function levelUp() {
    level++;
    wordsUntilNextLevel = 10 + (level * 2);

    const sfxVol = localStorage.getItem('velocity_sfx_volume');
    const volume = sfxVol ? parseFloat(sfxVol) : 0.5;
    levelUpSound.volume = volume;
    levelUpSound.play().catch(() => { });

    showNotification(`🎉 ¡NIVEL ${level}!`, '#00ff88');
    score += level * 50;
}

function spawnPowerup() {
    const types = ['⏰', '💎', '🔥', '⚡'];
    const type = types[Math.floor(Math.random() * types.length)];

    powerups.push({
        type: type,
        duration: 5000,
        startTime: Date.now()
    });

    const sfxVol = localStorage.getItem('velocity_sfx_volume');
    const volume = sfxVol ? parseFloat(sfxVol) : 0.5;
    powerupSound.volume = volume;
    powerupSound.play().catch(() => { });

    applyPowerup(type);
    updatePowerupsDisplay();
}

function applyPowerup(type) {
    switch (type) {
        case '⏰': time += 2; showNotification('⏰ +2s', '#ffd700'); break;
        case '💎': showNotification('💎 x2 Pts', '#00ffff'); break;
        case '🔥': combo += 5; showNotification('🔥 +5 Combo', '#ff6600'); break;
        case '⚡': lives++; showNotification('⚡ +1 Vida', '#ff00ff'); break;
    }
}

function updatePowerupsDisplay() {
    const container = document.getElementById('powerups');
    if (!container) return;
    powerups = powerups.filter(p => (Date.now() - p.startTime) < p.duration);
    container.innerHTML = powerups.map(p => `<div class="powerup-icon" style="animation: bounce 0.5s;">${p.type}</div>`).join('');
}

function showNotification(text, color) {
    const notif = document.createElement('div');
    notif.textContent = text;
    notif.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: ${color}; color: black; padding: 20px 40px; border-radius: 10px; font-size: 2rem; font-weight: bold; z-index: 1000; animation: fadeInOut 2s;`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

function updateHUD() {
    scoreDisplay.textContent = score;
    timeDisplay.textContent = Math.max(0, time).toFixed(2);
    comboDisplay.textContent = `Combo: ${combo}x`;

    const levelDisplay = document.getElementById('level-display');
    const livesDisplay = document.getElementById('lives-display');
    if (levelDisplay) levelDisplay.textContent = level;
    if (livesDisplay) livesDisplay.textContent = lives;

    const elapsedMin = (Date.now() - gameStartTime) / 60000;
    const wpm = Math.round((charsTyped / 5) / elapsedMin) || 0;
    wpmDisplay.textContent = wpm;

    const progress = (time / baseTime) * 100;
    progressFill.style.width = `${progress}%`;
    progressFill.style.background = time < 2 ? 'red' : 'linear-gradient(90deg, #b026ff, #00ff88)';

    updatePowerupsDisplay();
}

function endGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    bgMusic.pause();

    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('game-hud').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'flex';

    document.getElementById('final-score').textContent = score;
    document.getElementById('final-words').textContent = wordsTyped;

    const elapsedMin = (Date.now() - gameStartTime) / 60000;
    const wpm = Math.round((charsTyped / 5) / elapsedMin) || 0;
    document.getElementById('final-wpm').textContent = wpm;

    const accuracy = Math.round(((charsTyped - errors) / charsTyped) * 100) || 0;
    document.getElementById('final-accuracy').textContent = `${accuracy}%`;

    if (typeof Progression !== 'undefined') {
        Progression.addXP(score);
    }
}

// CSS Animations
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); } 20%, 40%, 60%, 80% { transform: translateX(10px); } }
    .shake { animation: shake 0.5s; }
    @keyframes fadeInOut { 0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .powerup-icon { font-size: 2rem; display: inline-block; margin: 5px; }
`;
document.head.appendChild(style);
