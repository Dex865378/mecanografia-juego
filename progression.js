// VELOCITY - Sistema de Progresión y Niveles (Integrado con Base de Datos)

class ProgressionSystem {
    constructor() {
        this.maxLevel = 80;
        this.playerData = {
            level: 1,
            currentXP: 0,
            totalXP: 0,
            achievements: []
        };
        this.loadProgress();
    }

    // Cargar progreso desde la base de datos
    async loadProgress() {
        if (typeof dbAPI === 'undefined') {
            console.warn('⚠️ Database API not loaded. Using local storage.');
            this.loadFromLocalStorage();
            return;
        }

        try {
            const stats = await dbAPI.getPlayerStats();
            if (stats && stats.data) {
                // Si existe progreso en la base de datos, cargarlo
                const progressData = await this.getPlayerProgress();
                if (progressData) {
                    this.playerData.level = progressData.current_level;
                    this.playerData.totalXP = progressData.total_xp;
                    this.playerData.currentXP = this.getXPForCurrentLevel();
                    this.playerData.achievements = JSON.parse(progressData.achievements || '[]');
                }
            }
        } catch (error) {
            console.error('Error loading progress:', error);
            this.loadFromLocalStorage();
        }

        this.updateDisplay();
    }

    // Obtener progreso del jugador desde la API
    async getPlayerProgress() {
        if (typeof dbAPI === 'undefined') return null;

        try {
            const response = await fetch(`api.php?action=get_player_progress&player_name=${encodeURIComponent(dbAPI.playerName)}`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Error fetching player progress:', error);
            return null;
        }
    }

    // Cargar desde localStorage como respaldo
    loadFromLocalStorage() {
        const saved = localStorage.getItem('velocity_progress');
        if (saved) {
            this.playerData = JSON.parse(saved);
        }
    }

    // Guardar progreso
    async saveProgress() {
        // Guardar en localStorage como respaldo
        localStorage.setItem('velocity_progress', JSON.stringify(this.playerData));

        // Guardar en base de datos
        if (typeof dbAPI !== 'undefined') {
            try {
                await dbAPI.saveProgress(
                    this.playerData.level,
                    this.playerData.totalXP,
                    this.playerData.achievements
                );
            } catch (error) {
                console.error('Error saving progress to database:', error);
            }
        }
    }

    // Calcular XP necesario para un nivel específico
    getXPForLevel(level) {
        if (level <= 1) return 0;
        if (level > this.maxLevel) return this.getXPForLevel(this.maxLevel);

        // Fórmula progresiva: cada nivel requiere más XP
        // Nivel 1-10: 100 XP por nivel
        // Nivel 11-30: 150 XP por nivel
        // Nivel 31-50: 200 XP por nivel
        // Nivel 51-70: 300 XP por nivel
        // Nivel 71-80: 500 XP por nivel

        let totalXP = 0;
        for (let i = 1; i < level; i++) {
            if (i <= 10) totalXP += 100;
            else if (i <= 30) totalXP += 150;
            else if (i <= 50) totalXP += 200;
            else if (i <= 70) totalXP += 300;
            else totalXP += 500;
        }
        return totalXP;
    }

    // Obtener XP actual en el nivel actual
    getXPForCurrentLevel() {
        const currentLevelXP = this.getXPForLevel(this.playerData.level);
        return this.playerData.totalXP - currentLevelXP;
    }

    // Obtener XP necesario para el siguiente nivel
    getXPForNextLevel() {
        if (this.playerData.level >= this.maxLevel) return 0;

        const currentLevelXP = this.getXPForLevel(this.playerData.level);
        const nextLevelXP = this.getXPForLevel(this.playerData.level + 1);
        return nextLevelXP - currentLevelXP;
    }

    // Calcular nivel basado en XP total
    calculateLevel(totalXP) {
        for (let level = 1; level <= this.maxLevel; level++) {
            if (totalXP < this.getXPForLevel(level + 1)) {
                return level;
            }
        }
        return this.maxLevel;
    }

    // Añadir XP y verificar subida de nivel
    async addXP(amount) {
        if (this.playerData.level >= this.maxLevel) {
            console.log('🏆 ¡Nivel máximo alcanzado!');
            return;
        }

        const oldLevel = this.playerData.level;
        this.playerData.totalXP += amount;
        this.playerData.level = this.calculateLevel(this.playerData.totalXP);
        this.playerData.currentXP = this.getXPForCurrentLevel();

        // Verificar si subió de nivel
        if (this.playerData.level > oldLevel) {
            this.onLevelUp(oldLevel, this.playerData.level);
        }

        await this.saveProgress();
        this.updateDisplay();

        return {
            xpGained: amount,
            leveledUp: this.playerData.level > oldLevel,
            newLevel: this.playerData.level
        };
    }

    // Evento al subir de nivel
    onLevelUp(oldLevel, newLevel) {
        console.log(`🎉 ¡Subiste de nivel! ${oldLevel} → ${newLevel}`);

        // Mostrar notificación visual
        this.showLevelUpNotification(newLevel);

        // Reproducir sonido (si existe)
        if (typeof playSound === 'function') {
            playSound('levelup', 800);
        }

        // Verificar logros
        this.checkAchievements();
    }

    // Mostrar notificación de subida de nivel
    showLevelUpNotification(level) {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <h2>🎉 ¡NIVEL ${level}!</h2>
                <p>¡Felicidades! Has subido de nivel</p>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            z-index: 10000;
            animation: levelUpAnim 2s ease-out forwards;
            text-align: center;
            font-family: 'Orbitron', sans-serif;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'levelUpOut 0.5s ease-out forwards';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }

    // Verificar y otorgar logros
    checkAchievements() {
        const achievements = [
            { id: 'level_10', name: 'Novato', condition: () => this.playerData.level >= 10 },
            { id: 'level_25', name: 'Competente', condition: () => this.playerData.level >= 25 },
            { id: 'level_50', name: 'Experto', condition: () => this.playerData.level >= 50 },
            { id: 'level_75', name: 'Maestro', condition: () => this.playerData.level >= 75 },
            { id: 'level_80', name: 'Leyenda', condition: () => this.playerData.level >= 80 }
        ];

        achievements.forEach(achievement => {
            if (achievement.condition() && !this.playerData.achievements.includes(achievement.id)) {
                this.unlockAchievement(achievement);
            }
        });
    }

    // Desbloquear logro
    unlockAchievement(achievement) {
        this.playerData.achievements.push(achievement.id);
        console.log(`🏆 Logro desbloqueado: ${achievement.name}`);

        if (typeof dbAPI !== 'undefined') {
            dbAPI.showNotification(`🏆 Logro: ${achievement.name}`, 'success');
        }

        this.saveProgress();
    }

    // Actualizar visualización en el DOM
    updateDisplay() {
        // Actualizar nivel
        const levelDisplay = document.getElementById('player-level');
        if (levelDisplay) {
            levelDisplay.textContent = this.playerData.level;
        }

        // Actualizar XP
        const xpDisplay = document.getElementById('player-xp');
        if (xpDisplay) {
            const currentXP = this.getXPForCurrentLevel();
            const neededXP = this.getXPForNextLevel();
            xpDisplay.textContent = `${currentXP} / ${neededXP} XP`;
        }

        // Actualizar barra de progreso
        const xpBar = document.getElementById('xp-bar');
        if (xpBar) {
            const currentXP = this.getXPForCurrentLevel();
            const neededXP = this.getXPForNextLevel();
            const percentage = neededXP > 0 ? (currentXP / neededXP) * 100 : 100;
            xpBar.style.width = `${percentage}%`;
        }

        // Actualizar logros
        const achievementsDisplay = document.getElementById('achievements-count');
        if (achievementsDisplay) {
            achievementsDisplay.textContent = this.playerData.achievements.length;
        }
    }

    // Calcular XP ganado basado en rendimiento
    calculateXPFromGame(score, wpm, accuracy, mode) {
        let baseXP = Math.floor(score / 10);

        // Bonificación por WPM
        if (wpm >= 100) baseXP *= 1.5;
        else if (wpm >= 80) baseXP *= 1.3;
        else if (wpm >= 60) baseXP *= 1.2;

        // Bonificación por precisión
        if (accuracy >= 98) baseXP *= 1.3;
        else if (accuracy >= 95) baseXP *= 1.2;
        else if (accuracy >= 90) baseXP *= 1.1;

        // Bonificación por modo difícil
        if (mode.includes('hardcore')) baseXP *= 2;
        else if (mode.includes('hard')) baseXP *= 1.5;

        return Math.floor(baseXP);
    }

    // Obtener información del jugador
    getPlayerInfo() {
        return {
            level: this.playerData.level,
            currentXP: this.getXPForCurrentLevel(),
            totalXP: this.playerData.totalXP,
            nextLevelXP: this.getXPForNextLevel(),
            achievements: this.playerData.achievements,
            progress: this.getXPForNextLevel() > 0
                ? (this.getXPForCurrentLevel() / this.getXPForNextLevel()) * 100
                : 100
        };
    }
}

// Crear instancia global
const progressionSystem = new ProgressionSystem();

// Agregar estilos CSS para animaciones
const progressionStyles = document.createElement('style');
progressionStyles.textContent = `
    @keyframes levelUpAnim {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    @keyframes levelUpOut {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
    }
    
    .level-up-content h2 {
        font-size: 3rem;
        margin-bottom: 10px;
        text-shadow: 0 0 20px rgba(255,255,255,0.5);
    }
    
    .level-up-content p {
        font-size: 1.2rem;
        opacity: 0.9;
    }
`;
document.head.appendChild(progressionStyles);

console.log('✅ Progression System loaded successfully!');
console.log('📊 Current Level:', progressionSystem.playerData.level);
console.log('⭐ Total XP:', progressionSystem.playerData.totalXP);
