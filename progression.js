// VELOCITY - Sistema de Progresión y Niveles (Integrado con Base de Datos)

class ProgressionSystem {
    constructor() {
        this.maxLevel = 80;
        this.playerData = {
            level: 1,
            currentXP: 0,
            totalXP: 0,
            coins: 0,
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
                    this.playerData.level = parseInt(progressData.current_level);
                    this.playerData.totalXP = parseInt(progressData.total_xp);
                    this.playerData.coins = parseInt(progressData.coins || 0);
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

    // ... (getPlayerProgress y loadFromLocalStorage se mantienen igual)

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
                    this.playerData.achievements,
                    this.playerData.coins
                );
            } catch (error) {
                console.error('Error saving progress to database:', error);
            }
        }
    }

    // ... (getXPForLevel, getXPForCurrentLevel, getXPForNextLevel, calculateLevel se mantienen igual)

    // Añadir Monedas
    async addCoins(amount) {
        this.playerData.coins += amount;
        console.log(`💰 +${amount} Monedas! Total: ${this.playerData.coins}`);

        // Mostrar notificación flotante de monedas
        this.showFloatingText(`+${amount} 💰`, '#ffd700');

        await this.saveProgress();
        this.updateDisplay();
    }

    // Mostrar texto flotante (para XP y Monedas)
    showFloatingText(text, color) {
        const float = document.createElement('div');
        float.textContent = text;
        float.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: ${color};
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            font-weight: bold;
            pointer-events: none;
            z-index: 9999;
            text-shadow: 0 0 10px rgba(0,0,0,0.5);
            animation: floatUp 1s ease-out forwards;
        `;
        document.body.appendChild(float);
        setTimeout(() => float.remove(), 1000);
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

    // ... (onLevelUp, showLevelUpNotification, checkAchievements, unlockAchievement se mantienen igual)

    // Actualizar visualización en el DOM
    updateDisplay() {
        // Actualizar nivel
        const levelDisplay = document.getElementById('player-level');
        if (levelDisplay) levelDisplay.textContent = this.playerData.level;

        // Actualizar XP
        const xpDisplay = document.getElementById('player-xp');
        if (xpDisplay) {
            const currentXP = this.getXPForCurrentLevel();
            const neededXP = this.getXPForNextLevel();
            xpDisplay.textContent = `${currentXP} / ${neededXP} XP`;
        }

        // Actualizar Monedas (Nuevo)
        const coinsDisplay = document.getElementById('player-coins') || document.getElementById('user-coins') || document.getElementById('coins');
        if (coinsDisplay) {
            coinsDisplay.textContent = this.playerData.coins;
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
        const achievementsDisplay = document.getElementById('achievements-count') || document.getElementById('achievements');
        if (achievementsDisplay) {
            achievementsDisplay.textContent = this.playerData.achievements.length;
        }
    }

    // ... (calculateXPFromGame se mantiene igual)

    // Obtener información del jugador
    getPlayerInfo() {
        return {
            level: this.playerData.level,
            currentXP: this.getXPForCurrentLevel(),
            totalXP: this.playerData.totalXP,
            coins: this.playerData.coins,
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
