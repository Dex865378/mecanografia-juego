// VELOCITY Progression System
// Handles XP, Levels, Coins, and Achievements

const Progression = {
    data: {
        xp: 0,
        level: 1,
        coins: 0,
        achievements: [],
        stats: {
            totalWords: 0,
            totalGames: 0,
            highestWPM: 0
        }
    },

    achievementsList: [
        { id: 'first_win', title: 'Novato', desc: 'Completa tu primera partida', xp: 100 },
        { id: 'speed_demon', title: 'Velocista', desc: 'Alcanza 60 WPM', xp: 500 },
        { id: 'rich', title: 'Ahorrador', desc: 'Consigue 1000 monedas', xp: 300 },
        { id: 'veteran', title: 'Veterano', desc: 'Alcanza el nivel 10', xp: 1000 },
        { id: 'polyglot', title: 'Políglota', desc: 'Juega una partida en Modo Idiomas', xp: 200 },
        { id: 'singer', title: 'Cantante', desc: 'Completa una canción en Karaoke', xp: 200 }
    ],

    init() {
        this.load();
        this.updateUI();
    },

    load() {
        const saved = localStorage.getItem('velocity_progress');
        if (saved) {
            this.data = JSON.parse(saved);
        }
    },

    save() {
        localStorage.setItem('velocity_progress', JSON.stringify(this.data));
        this.updateUI();
    },

    addXP(amount) {
        this.data.xp += amount;
        this.checkLevelUp();
        this.save();
        this.showNotification(`+${amount} XP`);
    },

    addCoins(amount) {
        this.data.coins += amount;
        this.save();
        this.showNotification(`+${amount} Monedas`);
    },

    checkLevelUp() {
        const newLevel = Math.floor(Math.sqrt(this.data.xp / 100)) + 1;
        if (newLevel > this.data.level) {
            this.data.level = newLevel;
            this.showNotification(`¡NIVEL ${newLevel} ALCANZADO! 🎉`);
            // Bonus coins for leveling up
            this.addCoins(newLevel * 100);
        }
    },

    unlockAchievement(id) {
        if (!this.data.achievements.includes(id)) {
            const achievement = this.achievementsList.find(a => a.id === id);
            if (achievement) {
                this.data.achievements.push(id);
                this.addXP(achievement.xp);
                this.showNotification(`🏆 LOGRO: ${achievement.title}`);
                this.save();
            }
        }
    },

    updateUI() {
        // Update elements if they exist on the page
        const levelEl = document.getElementById('user-level');
        const xpEl = document.getElementById('user-xp');
        const coinsEl = document.getElementById('user-coins');

        if (levelEl) levelEl.textContent = this.data.level;
        if (xpEl) xpEl.textContent = `${this.data.xp} XP`;
        if (coinsEl) coinsEl.textContent = this.data.coins;
    },

    showNotification(text) {
        const notif = document.createElement('div');
        notif.style.position = 'fixed';
        notif.style.bottom = '20px';
        notif.style.right = '20px';
        notif.style.background = 'linear-gradient(45deg, #b026ff, #00ff88)';
        notif.style.color = 'black';
        notif.style.padding = '15px 25px';
        notif.style.borderRadius = '10px';
        notif.style.fontWeight = 'bold';
        notif.style.fontFamily = "'Orbitron', sans-serif";
        notif.style.boxShadow = '0 5px 15px rgba(0,0,0,0.5)';
        notif.style.zIndex = '1000';
        notif.style.animation = 'slideInRight 0.5s forwards';
        notif.textContent = text;

        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => notif.remove(), 500);
        }, 3000);
    }
};

// Add CSS animation for notifications
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    Progression.init();
});
