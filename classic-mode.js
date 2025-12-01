// VELOCITY - Classic Mode Logic
// Updated to use WordBank and Mobile Optimizations

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

// Audio
const bgMusic = document.getElementById('bg-music');
const typeSound = document.getElementById('type-sound');
const errorSound = document.getElementById('error-sound');
const powerupSound = document.getElementById('powerup-sound');
const levelUpSound = document.getElementById('level-up-sound');

// Init
wordInput.addEventListener('input', checkInput);
wordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isPlaying && gameOverScreen.style.display !== 'flex') {
        startGame();
    }
});

// Auto-focus input on click anywhere
document.addEventListener('click', () => {
    if (isPlaying) wordInput.focus();
});

function initGame() {
    showScreen(gameScreen);
    wordInput.value = '';
    wordInput.focus();
    wordDisplay.innerHTML = 'PRESIONA ENTER<br>PARA EMPEZAR';
    score = 0;
    time = 5.00;
    updateHUD();
}

function startGame() {
    isPlaying = true;
    score = 0;
    time = 5.00;
    wordsTyped = 0;
    charsTyped = 0;
    errors = 0;
    combo = 0;
    lives = 3;
    gameStartTime = Date.now();

    bgMusic.volume = 0.3;
    bgMusic.play().catch(e => console.log("Audio play failed", e));

    nextWord();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 10);
    wordInput.value = '';
    wordInput.focus();

    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
}

function nextWord() {
    // Use WordBank if available, otherwise fallback
    if (typeof WordBank !== 'undefined') {
        currentWord = WordBank.getRandomWord();
    } else {
        const fallbackWords = ["error", "carga", "palabra", "fallback"];
        currentWord = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    }

    wordDisplay.textContent = currentWord;
    wordInput.value = '';
    time = 5.00; // Reset time per word
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

    // Play type sound
    typeSound.currentTime = 0;
    typeSound.play().catch(() => { });

    if (input === currentWord) {
        handleSuccess();
    } else if (!currentWord.startsWith(input)) {
        // Visual feedback for wrong char
        wordInput.style.color = 'red';
    } else {
        wordInput.style.color = 'white';
    }
}

function handleSuccess() {
    score += 10 + (combo * 2);
    wordsTyped++;
    charsTyped += currentWord.length;
    combo++;
    if (combo > maxCombo) maxCombo = combo;

    // Progression XP
    if (typeof Progression !== 'undefined') {
        Progression.addXP(5);
        Progression.addCoins(1);
    }

    nextWord();
}

function handleMiss() {
    lives--;
    combo = 0;
    errors++;
    errorSound.play().catch(() => { });

    // Shake effect
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);

    if (lives <= 0) {
        endGame();
    } else {
        nextWord();
    }
}

function updateHUD() {
    scoreDisplay.textContent = score;
    timeDisplay.textContent = Math.max(0, time).toFixed(2);
    comboDisplay.textContent = `Combo: ${combo}x`;

    // WPM Calculation
    const elapsedMin = (Date.now() - gameStartTime) / 60000;
    const wpm = Math.round((charsTyped / 5) / elapsedMin) || 0;
    wpmDisplay.textContent = wpm;

    // Progress bar (time)
    const progress = (time / 5.00) * 100;
    progressFill.style.width = `${progress}%`;

    if (time < 2) {
        progressFill.style.background = 'red';
    } else {
        progressFill.style.background = 'linear-gradient(90deg, #b026ff, #00ff88)';
    }
}

function endGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    bgMusic.pause();

    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'flex';

    // Final Stats
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-words').textContent = wordsTyped;

    const elapsedMin = (Date.now() - gameStartTime) / 60000;
    const wpm = Math.round((charsTyped / 5) / elapsedMin) || 0;
    document.getElementById('final-wpm').textContent = wpm;

    const accuracy = Math.round(((charsTyped - errors) / charsTyped) * 100) || 0;
    document.getElementById('final-accuracy').textContent = `${accuracy}%`;

    // Save to Progression
    if (typeof Progression !== 'undefined') {
        Progression.addXP(score);
        if (score > 1000) Progression.unlockAchievement('first_win');
        if (wpm > 60) Progression.unlockAchievement('speed_demon');
    }
}

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Shake animation style
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
    .shake {
        animation: shake 0.5s;
    }
`;
document.head.appendChild(style);

// Start immediately if requested
initGame();
