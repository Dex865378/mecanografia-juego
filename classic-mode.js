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
const checkpointModal = document.getElementById('checkpoint-modal');

// Audio
const bgMusic = document.getElementById('bg-music');
const typeSound = document.getElementById('type-sound');
const errorSound = document.getElementById('error-sound');
const powerupSound = document.getElementById('powerup-sound');
const levelUpSound = document.getElementById('level-up-sound');

// Init
wordInput.addEventListener('input', checkInput);

// Auto-focus input on click anywhere
document.addEventListener('click', () => {
    if (isPlaying && checkpointModal.style.display !== 'flex') wordInput.focus();
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

    // Hide difficulty screen and show game screen
    difficultyScreen.classList.remove('active');
    gameScreen.classList.add('active');

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

    gameOverScreen.classList.remove('active');
    gameScreen.classList.add('active');
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
    const wordScore = 10 + timeBonus + comboBonus;
    score += wordScore;
    wordsTyped++;
    charsTyped += currentWord.length;
    combo++;
    if (combo > maxCombo) maxCombo = combo;

    // --- INTEGRACIÓN DE PROGRESIÓN ---
    if (typeof progressionSystem !== 'undefined') {
        // XP por palabra: longitud * 2 + bonus de combo
        const xpGained = Math.floor(currentWord.length * 2 + (combo > 5 ? 5 : 0));
        progressionSystem.addXP(xpGained);

        // Monedas: 1 base + 1 si es difícil + 1 si es hardcore
        let coinsGained = 1;
        if (currentDifficulty === 'hard') coinsGained += 1;
        if (currentDifficulty === 'hardcore') coinsGained += 2;

        // Bonus de monedas por combo cada 10 palabras
        if (combo % 10 === 0) coinsGained += 5;

        progressionSystem.addCoins(coinsGained);
    }
    // -------------------------------

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

// ... (showCheckpoint, continueGame, handleMiss, levelUp, spawnPowerup, applyPowerup, updatePowerupsDisplay, showNotification, updateHUD se mantienen igual)

function endGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    bgMusic.pause();

    gameScreen.classList.remove('active');
    gameOverScreen.classList.add('active');

    document.getElementById('final-score').textContent = score;
    document.getElementById('final-words').textContent = wordsTyped;

    const elapsedMin = (Date.now() - gameStartTime) / 60000;
    const wpm = Math.round((charsTyped / 5) / elapsedMin) || 0;
    document.getElementById('final-wpm').textContent = wpm;

    const accuracy = Math.round(((charsTyped - errors) / charsTyped) * 100) || 0;
    document.getElementById('final-accuracy').textContent = `${accuracy}%`;

    // --- GUARDAR PUNTUACIÓN Y PROGRESO FINAL ---
    if (typeof progressionSystem !== 'undefined') {
        // Bono de XP por finalizar
        const finalXP = Math.floor(score / 10);
        progressionSystem.addXP(finalXP);
        console.log(`🏁 Juego terminado. XP Final: ${finalXP}`);
    }

    if (typeof dbAPI !== 'undefined') {
        dbAPI.saveScore('classic', score, wpm, accuracy, level).then(() => {
            console.log('✅ Puntuación guardada en base de datos');
        });
    }
    // ------------------------------------------
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
