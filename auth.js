// VELOCITY - Sistema de Autenticación Social
// Maneja el inicio de sesión con Google y la sincronización de datos

const Auth = {
    user: null,

    init() {
        // Verificar si hay sesión guardada
        const savedUser = localStorage.getItem('velocity_auth_user');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            this.updateUI(true);
        }
    },

    // Manejar respuesta de Google
    async handleGoogleLogin(response) {
        console.log("Google response received", response);

        // Decodificar JWT (sin librería externa para mantenerlo ligero)
        const responsePayload = this.decodeJwt(response.credential);

        console.log("ID: " + responsePayload.sub);
        console.log('Full Name: ' + responsePayload.name);
        console.log('Given Name: ' + responsePayload.given_name);
        console.log('Family Name: ' + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);

        this.user = {
            id: responsePayload.sub,
            name: responsePayload.name,
            email: responsePayload.email,
            picture: responsePayload.picture,
            provider: 'google'
        };

        // Guardar sesión local
        localStorage.setItem('velocity_auth_user', JSON.stringify(this.user));

        // Actualizar nombre y avatar en el juego
        localStorage.setItem('velocity_username', this.user.name);
        // localStorage.setItem('velocity_avatar', this.user.picture); // Opcional: usar foto de Google

        // Enviar al backend para sincronizar
        await this.syncWithBackend(this.user);

        this.updateUI(true);
        location.reload(); // Recargar para actualizar datos
    },

    // Sincronizar con el backend PHP
    async syncWithBackend(user) {
        if (typeof dbAPI === 'undefined') return;

        try {
            const formData = new FormData();
            formData.append('action', 'social_login');
            formData.append('provider', user.provider);
            formData.append('provider_id', user.id);
            formData.append('email', user.email);
            formData.append('name', user.name);
            formData.append('avatar', user.picture);

            const response = await fetch('api.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                console.log('✅ Sincronización exitosa:', data);
                // Si el servidor devuelve datos de progreso, actualizarlos localmente
                if (data.progress) {
                    // Actualizar progressionSystem si existe
                    if (typeof progressionSystem !== 'undefined') {
                        progressionSystem.playerData.level = parseInt(data.progress.current_level);
                        progressionSystem.playerData.totalXP = parseInt(data.progress.total_xp);
                        // progressionSystem.playerData.achievements = JSON.parse(data.progress.achievements || '[]');
                        progressionSystem.saveProgress();
                    }
                }
            } else {
                console.error('❌ Error de sincronización:', data.error);
            }
        } catch (error) {
            console.error('❌ Error de red:', error);
        }
    },

    // Cerrar sesión
    logout() {
        this.user = null;
        localStorage.removeItem('velocity_auth_user');

        // Opcional: Limpiar datos de progreso local si quieres que sea "seguro"
        // localStorage.removeItem('velocity_progress');

        this.updateUI(false);
        location.reload();
    },

    // Actualizar interfaz
    updateUI(isLoggedIn) {
        const loginBtns = document.getElementById('login-buttons');
        const userInfo = document.getElementById('user-info');
        const userEmail = document.getElementById('user-email');
        const userAvatar = document.getElementById('user-avatar-small');

        if (isLoggedIn && this.user) {
            if (loginBtns) loginBtns.style.display = 'none';
            if (userInfo) userInfo.style.display = 'block';
            if (userEmail) userEmail.textContent = this.user.email;
            if (userAvatar && this.user.picture) {
                userAvatar.src = this.user.picture;
                userAvatar.style.display = 'block';
            }
        } else {
            if (loginBtns) loginBtns.style.display = 'block';
            if (userInfo) userInfo.style.display = 'none';
        }
    },

    checkStatus() {
        this.init();
    },

    // Utilidad para decodificar JWT
    decodeJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});
