// ===== VELOCITY - Classic Mode =====
let gameState = {
    isPlaying: false,
    difficulty: 'medium',
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
    bestStreak: 0
};

const wordLists = {
    easy: [
        'casa', 'gato', 'sol', 'mar', 'luz', 'pan', 'rio', 'flor', 'luna', 'nube',
        'mesa', 'silla', 'agua', 'fuego', 'aire', 'tierra', 'arbol', 'hoja', 'rojo', 'azul',
        'verde', 'gris', 'pelo', 'ojo', 'boca', 'mano', 'pie', 'dedo', 'uña', 'piel',
        'perro', 'pez', 'ave', 'oso', 'lobo', 'leon', 'tigre', 'mono', 'pato', 'pollo',
        'vaca', 'toro', 'cerdo', 'oveja', 'cabra', 'mula', 'raton', 'queso', 'leche', 'huevo',
        'sal', 'miel', 'uva', 'pera', 'piña', 'coco', 'lima', 'nuez', 'boda', 'cine',
        'foto', 'libro', 'lapiz', 'papel', 'carta', 'sobre', 'sello', 'caja', 'bolsa', 'saco',
        'ropa', 'tela', 'hilo', 'lana', 'seda', 'cuero', 'bota', 'zapato', 'gorra', 'gafas',
        'reloj', 'anillo', 'joya', 'oro', 'plata', 'cobre', 'hierro', 'acero', 'zinc', 'gas',
        'ola', 'rio', 'lago', 'pozo', 'lluvia', 'nieve', 'hielo', 'frio', 'calor', 'viento'
    ],
    medium: [
        'velocidad', 'teclado', 'pantalla', 'programar', 'desarrollo', 'tecnologia',
        'computadora', 'internet', 'servidor', 'navegador', 'aplicacion', 'sistema',
        'memoria', 'procesador', 'graficos', 'sonido', 'video', 'imagen', 'archivo',
        'carpeta', 'documento', 'escritorio', 'ventana', 'menu', 'boton', 'enlace',
        'pagina', 'sitio', 'dominio', 'hosting', 'nube', 'datos', 'informacion',
        'usuario', 'contraseña', 'seguridad', 'privacidad', 'redes', 'sociales',
        'mensaje', 'correo', 'chat', 'llamada', 'camara', 'microfono', 'altavoz',
        'auricular', 'bateria', 'cargador', 'cable', 'puerto', 'conexion', 'wifi',
        'bluetooth', 'movil', 'tablet', 'laptop', 'consola', 'juego', 'jugador',
        'nivel', 'puntos', 'vidas', 'tiempo', 'record', 'victoria', 'derrota',
        'amigo', 'equipo', 'grupo', 'comunidad', 'foro', 'blog', 'articulo',
        'noticia', 'evento', 'calendario', 'agenda', 'tarea', 'proyecto', 'trabajo',
        'oficina', 'escuela', 'clase', 'curso', 'examen', 'nota', 'titulo',
        'grado', 'master', 'doctorado', 'carrera', 'profesion', 'empleo', 'sueldo'
    ],
    hard: [
        'extraordinario', 'magnifico', 'espectacular', 'impresionante', 'revolucionario',
        'arquitectura', 'infraestructura', 'telecomunicaciones', 'bioingenieria', 'nanotecnologia',
        'inteligencia', 'artificial', 'aprendizaje', 'automatico', 'algoritmo', 'criptografia',
        'ciberseguridad', 'vulnerabilidad', 'autenticacion', 'autorizacion', 'administracion',
        'configuracion', 'personalizacion', 'optimizacion', 'rendimiento', 'escalabilidad',
        'disponibilidad', 'confiabilidad', 'mantenibilidad', 'interoperabilidad', 'compatibilidad',
        'accesibilidad', 'usabilidad', 'experiencia', 'interfaz', 'visualizacion', 'representacion',
        'interpretacion', 'compilacion', 'ejecucion', 'depuracion', 'implementacion', 'integracion',
        'despliegue', 'distribucion', 'versionamiento', 'repositorio', 'colaboracion', 'contribucion',
        'documentacion', 'especificacion', 'requerimiento', 'analisis', 'diseño', 'evaluacion',
        'investigacion', 'experimentacion', 'descubrimiento', 'innovacion', 'creatividad',
        'imaginacion', 'inspiracion', 'motivacion', 'dedicacion', 'perseverancia', 'resiliencia',
        'adaptabilidad', 'flexibilidad', 'agilidad', 'eficiencia', 'efectividad', 'productividad',
        'competitividad', 'estrategia', 'planificacion', 'organizacion', 'coordinacion', 'direccion'
    ],
    expert: [
        'asynchronous', 'polymorphism', 'encapsulation', 'inheritance', 'abstraction',
        'multithreading', 'concurrency', 'parallelism', 'synchronization', 'deadlock',
        'racecondition', 'memoryleak', 'garbagecollection', 'segmentationfault', 'stackoverflow',
        'bufferoverflow', 'sqlinjection', 'crosssitescripting', 'maninthemiddle', 'denialofservice',
        'distributed', 'decentralized', 'blockchain', 'cryptocurrency', 'smartcontract',
        'microservices', 'containerization', 'orchestration', 'virtualization', 'serverless',
        'functionasaservice', 'infrastructureascode', 'continuousintegration', 'continuousdelivery',
        'devops', 'agilemethodology', 'scrumframework', 'kanbanboard', 'testdrivendevelopment',
        'behaviordrivendevelopment', 'domaindrivendesign', 'objectorientedprogramming',
        'functionalprogramming', 'reactiveprogramming', 'imperativeprogramming', 'declarativeprogramming',
        'metaprogramming', 'reflection', 'introspection', 'dependencyinjection', 'inversionofcontrol',
        'designpatterns', 'singleton', 'factory', 'observer', 'strategy', 'decorator', 'adapter',
        'facade', 'proxy', 'command', 'iterator', 'composite', 'state', 'template', 'visitor'
    ]
};

// Control de palabras usadas para evitar repeticiones inmediatas
let usedWords = {
    easy: new Set(),
    medium: new Set(),
    hard: new Set(),
    expert: new Set()
};

function getUniqueWord(difficulty) {
    const list = wordLists[difficulty];
    const used = usedWords[difficulty];

    // Si ya usamos todas las palabras, reiniciamos el historial
    if (used.size >= list.length) {
        used.clear();
    }

    let word;
    let attempts = 0;
    do {
        word = list[Math.floor(Math.random() * list.length)];
        attempts++;
    } while (used.has(word) && attempts < 50); // Evitar bucle infinito

    used.add(word);
    return word;
}

let stats = { totalGames: 0, highScore: 0, totalWords: 0, bestWPM: 0, avgAccuracy: 0, longestStreak: 0 };

const musicTracks = [
    document.getElementById('bgMusic1'),
    document.getElementById('bgMusic2'),
    document.getElementById('bgMusic3'),
    document.getElementById('bgMusic4')
];
let currentMusic = null;

const elements = {
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
    correctSound: document.getElementById('correctSound'),
    wrongSound: document.getElementById('wrongSound'),
    gameOverSound: document.getElementById('gameOverSound'),
    tickSound: document.getElementById('tickSound'),
    levelupSound: document.getElementById('levelupSound'),
    musicToggle: document.getElementById('musicToggle'),
    themeToggle: document.getElementById('themeToggle')
};

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

function setupEventListeners() {
    elements.startBtn.addEventListener('click', startGame);
    elements.wordInput.addEventListener('input', checkWord);

    elements.diffBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.diffBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameState.difficulty = btn.dataset.level;
        });
    });

    document.getElementById('retryBtn').addEventListener('click', startGame);
    document.getElementById('menuBtn').addEventListener('click', () => showScreen('mainMenu'));
    elements.statsBtn.addEventListener('click', showStats);
    document.getElementById('closeStatsBtn').addEventListener('click', () => showScreen('mainMenu'));

    elements.musicToggle.addEventListener('click', () => {
        if (currentMusic.paused) {
            currentMusic.play();
            elements.musicToggle.textContent = '🔊';
        } else {
            currentMusic.pause();
            elements.musicToggle.textContent = '🔇';
        }
    });

    elements.themeToggle.addEventListener('click', () => {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        elements.themeToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
    });
}

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
        bestStreak: 0
    };

    showScreen('game');
    nextWord();
    startTimer();
    updateUI();
    elements.wordInput.focus();

    if (currentMusic) {
        currentMusic.currentTime = 0;
        currentMusic.volume = 0.3;
    }
}

function nextWord() {
    gameState.currentWord = getUniqueWord(gameState.difficulty);
    elements.targetWord.textContent = gameState.currentWord;
    elements.wordInput.value = '';
    elements.feedback.textContent = '';
    elements.feedback.className = 'feedback';
    gameState.timeLeft = 5;
    updateTimer();
}

function startTimer() {
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);

    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft -= 0.1;

        if (gameState.timeLeft <= 0) {
            loseLife();
        } else {
            updateTimer();

            if (gameState.timeLeft <= 2) {
                elements.timerBar.classList.add('warning');
                document.body.classList.add('danger');
                if (gameState.timeLeft % 1 < 0.1) playSound('tick');
            } else {
                elements.timerBar.classList.remove('warning');
                document.body.classList.remove('danger');
            }
        }
    }, 100);
}

function checkWord() {
    const input = elements.wordInput.value.toLowerCase();
    const target = gameState.currentWord.toLowerCase();

    if (input === target) {
        correctWord();
    }
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

    const timeBonus = Math.floor(gameState.timeLeft * 10);
    const comboBonus = gameState.combo;
    const points = (100 + timeBonus) * comboBonus;

    gameState.score += points;

    if (gameState.timeLeft > 3) {
        gameState.combo = Math.min(gameState.combo + 1, 10);
    }

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

    updateUI();
    nextWord();
}

function loseLife() {
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

function updateUI() {
    elements.score.textContent = gameState.score;
    elements.combo.textContent = `x${gameState.combo}`;
    elements.level.textContent = gameState.level;
    elements.lives.textContent = '❤️'.repeat(gameState.lives);

    const minutes = (Date.now() - gameState.startTime) / 60000;
    const wpm = Math.floor(gameState.correctWords / minutes) || 0;
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

function showFeedback(text, type) {
    elements.feedback.textContent = text;
    elements.feedback.className = `feedback ${type}`;
}

function gameOver() {
    gameState.isPlaying = false;
    clearInterval(gameState.timerInterval);
    document.body.classList.remove('danger');

    playSound('gameOver');

    const minutes = (Date.now() - gameState.startTime) / 60000;
    const finalWPM = Math.floor(gameState.correctWords / minutes) || 0;
    const finalAccuracy = gameState.totalChars > 0
        ? Math.floor((gameState.correctChars / gameState.totalChars) * 100)
        : 0;

    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalWords').textContent = gameState.correctWords;
    document.getElementById('finalWPM').textContent = finalWPM;
    document.getElementById('finalAccuracy').textContent = `${finalAccuracy}%`;
    document.getElementById('finalStreak').textContent = gameState.bestStreak;

    const isNewRecord = gameState.score > stats.highScore;
    document.getElementById('newRecord').style.display = isNewRecord ? 'block' : 'none';

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

function showScreen(screenName) {
    const screens = {
        mainMenu: document.getElementById('mainMenu'),
        game: document.getElementById('gameScreen'),
        gameOver: document.getElementById('gameOverScreen'),
        stats: document.getElementById('statsScreen')
    };

    Object.values(screens).forEach(s => s.style.display = 'none');
    screens[screenName].style.display = 'block';
}

function showStats() {
    document.getElementById('totalGames').textContent = stats.totalGames;
    document.getElementById('highScore').textContent = stats.highScore;
    document.getElementById('totalWords').textContent = stats.totalWords;
    document.getElementById('bestWPM').textContent = stats.bestWPM;
    document.getElementById('avgAccuracy').textContent = `${stats.avgAccuracy}%`;
    document.getElementById('longestStreak').textContent = stats.longestStreak;

    showScreen('stats');
}

function adjustMusicIntensity() {
    if (!currentMusic) return;
    const progress = gameState.correctWords / 50;
    const newVolume = Math.min(0.3 + (progress * 0.3), 0.6);
    currentMusic.volume = newVolume;

    if (gameState.level % 10 === 0 && gameState.level > 0) {
        switchMusicTrack();
    }
}

function switchMusicTrack() {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }

    const trackIndex = Math.floor(gameState.level / 10) % 4;
    currentMusic = musicTracks[trackIndex];
    currentMusic.volume = 0.3;
    currentMusic.play().catch(() => { });
}

function playSound(type) {
    const sound = elements[`${type}Sound`];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => { });
    }
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
