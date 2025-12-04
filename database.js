// Database API Module for VELOCITY Typing Game
// Este módulo maneja todas las interacciones con la base de datos

class DatabaseAPI {
    constructor(apiUrl = 'api.php') {
        this.apiUrl = apiUrl;
        this.playerName = this.getPlayerName();
    }

    // Obtener o crear nombre del jugador
    getPlayerName() {
        let name = localStorage.getItem('velocity_player_name');
        if (!name) {
            name = prompt('¡Bienvenido! Ingresa tu nombre de jugador:') || 'Anonymous';
            localStorage.setItem('velocity_player_name', name);
        }
        return name;
    }

    // Cambiar nombre del jugador
    setPlayerName(newName) {
        this.playerName = newName;
        localStorage.setItem('velocity_player_name', newName);
    }

    // Guardar puntuación
    async saveScore(mode, score, wpm, accuracy, level) {
        try {
            const formData = new FormData();
            formData.append('action', 'save_score');
            formData.append('player_name', this.playerName);
            formData.append('mode', mode);
            formData.append('score', score);
            formData.append('wpm', wpm);
            formData.append('accuracy', accuracy);
            formData.append('level', level);

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                console.log('✅ Score saved successfully!', data);
                this.showNotification('¡Puntuación guardada!', 'success');
            } else {
                console.error('❌ Error saving score:', data.error);
                this.showNotification('Error al guardar puntuación', 'error');
            }

            return data;
        } catch (error) {
            console.error('❌ Network error:', error);
            this.showNotification('Error de conexión', 'error');
            return { success: false, error: error.message };
        }
    }

    // Obtener tabla de líderes
    async getLeaderboard(mode = 'all', limit = 10) {
        try {
            const response = await fetch(`${this.apiUrl}?action=get_leaderboard&mode=${mode}&limit=${limit}`);
            const data = await response.json();

            if (data.success) {
                console.log('✅ Leaderboard loaded:', data.data);
                return data.data;
            } else {
                console.error('❌ Error loading leaderboard:', data.error);
                return [];
            }
        } catch (error) {
            console.error('❌ Network error:', error);
            return [];
        }
    }

    // Obtener estadísticas del jugador
    async getPlayerStats(playerName = null) {
        try {
            const name = playerName || this.playerName;
            const response = await fetch(`${this.apiUrl}?action=get_player_stats&player_name=${encodeURIComponent(name)}`);
            const data = await response.json();

            if (data.success) {
                console.log('✅ Player stats loaded:', data.data);
                return data.data;
            } else {
                console.error('❌ Error loading stats:', data.error);
                return null;
            }
        } catch (error) {
            console.error('❌ Network error:', error);
            return null;
        }
    }

    // Guardar progreso del jugador
    async saveProgress(currentLevel, totalXP, achievements = []) {
        try {
            const formData = new FormData();
            formData.append('action', 'save_progress');
            formData.append('player_name', this.playerName);
            formData.append('current_level', currentLevel);
            formData.append('total_xp', totalXP);
            formData.append('achievements', JSON.stringify(achievements));

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                console.log('✅ Progress saved!');
            } else {
                console.error('❌ Error saving progress:', data.error);
            }

            return data;
        } catch (error) {
            console.error('❌ Network error:', error);
            return { success: false, error: error.message };
        }
    }

    // Mostrar notificación en pantalla
    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `db-notification db-notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff006e' : '#29ADFF'};
            color: #000;
            font-family: 'Press Start 2P', monospace;
            font-size: 0.8rem;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Mostrar tabla de líderes en el DOM
    async displayLeaderboard(containerId, mode = 'all', limit = 10) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        const leaderboard = await this.getLeaderboard(mode, limit);

        if (leaderboard.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#666;">No hay puntuaciones aún</p>';
            return;
        }

        let html = '<table class="leaderboard-table" style="width:100%; border-collapse: collapse;">';
        html += '<thead><tr><th>#</th><th>Jugador</th><th>Modo</th><th>Puntos</th><th>WPM</th><th>Precisión</th><th>Nivel</th></tr></thead>';
        html += '<tbody>';

        leaderboard.forEach((entry, index) => {
            const isCurrentPlayer = entry.player_name === this.playerName;
            const rowClass = isCurrentPlayer ? 'current-player' : '';

            html += `<tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${entry.player_name}</td>
                <td>${entry.mode}</td>
                <td>${entry.score}</td>
                <td>${entry.wpm}</td>
                <td>${entry.accuracy}%</td>
                <td>${entry.level}</td>
            </tr>`;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    }
}

// Crear instancia global
const dbAPI = new DatabaseAPI();

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    .leaderboard-table {
        font-family: 'Rajdhani', sans-serif;
        color: #fff;
    }
    .leaderboard-table th {
        background: #1a1a2e;
        padding: 10px;
        text-align: left;
        border-bottom: 2px solid #00ff88;
    }
    .leaderboard-table td {
        padding: 8px;
        border-bottom: 1px solid #333;
    }
    .leaderboard-table tr.current-player {
        background: rgba(0, 255, 136, 0.1);
        font-weight: bold;
    }
    .leaderboard-table tr:hover {
        background: rgba(255, 255, 255, 0.05);
    }
`;
document.head.appendChild(style);

console.log('✅ Database API Module loaded successfully!');
