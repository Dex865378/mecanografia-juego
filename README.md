# 🎮 VELOCITY - Juego de Mecanografía Avanzado

![VELOCITY Banner](https://img.shields.io/badge/VELOCITY-Typing%20Game-blueviolet?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**VELOCITY** es un juego de mecanografía de última generación diseñado para mejorar tu velocidad y precisión al escribir mientras te diviertes. Con **15 modos de juego únicos**, sistema de progresión, power-ups, y un reproductor de música integrado, VELOCITY transforma el aprendizaje de mecanografía en una experiencia inmersiva y adictiva.

---

## 🌟 Características Principales

### 🎯 15 Modos de Juego Únicos

1. **⚡ Modo Clásico**
   - 4 niveles de dificultad: Fácil, Medio, Difícil, Hardcore
   - Sistema de vidas y niveles progresivos
   - Power-ups: Tiempo extra, Puntos dobles, Combo boost, Vida extra
   - Fondos dinámicos según dificultad
   - Checkpoint cada 100 palabras

2. **🚀 Batalla Espacial**
   - Estilo Z-Type: Dispara láseres escribiendo palabras
   - Targeting libre (cambia de objetivo a mitad de palabra)
   - Texto personalizado: Pega tu propio contenido para practicar
   - Niveles infinitos con dificultad creciente
   - Efectos visuales y sonoros espaciales

3. **🧘 Modo Zen**
   - Sin presión de tiempo
   - Enfoque en precisión
   - Ideal para principiantes

4. **💀 Modo Hardcore**
   - Una sola vida
   - Sin errores permitidos
   - Solo para expertos

5. **🎧 Modo Dictado**
   - Escucha y escribe
   - Mejora ortografía y comprensión auditiva
   - Síntesis de voz integrada

6. **💻 Modo Código**
   - Practica con snippets de código real
   - Ideal para programadores
   - Sintaxis de múltiples lenguajes

7. **📚 Modo Educativo**
   - Lecciones paso a paso
   - Sistema de progresión estructurado
   - Perfecto para aprender desde cero

8. **🏆 Desafío Diario**
   - Reto nuevo cada día
   - Compite con jugadores globales
   - Tabla de clasificación

9. **⚔️ Modo Survival**
   - Palabras infinitas cada vez más rápidas
   - ¿Cuánto tiempo puedes resistir?
   - Dificultad extrema

10. **😂 Modo Meme**
    - Palabras y frases graciosas
    - Contenido de memes populares
    - Diversión garantizada

11. **👁️ Modo Ciego**
    - La palabra desaparece después de 0.5 segundos
    - Solo palabras largas (8+ letras)
    - Entrena tu memoria fotográfica

12. **🎤 Modo Karaoke**
    - Escribe letras de canciones al ritmo
    - Sincronización musical
    - Siente el beat

13. **🌍 Modo Idiomas**
    - Aprende inglés, francés, alemán y más
    - Vocabulario contextual
    - Pronunciación incluida

14. **🧠 Entrenador IA**
    - Analiza tus errores
    - Genera ejercicios personalizados
    - Adaptación inteligente

15. **🤖 Versus IA**
    - Compite contra un bot
    - 5 niveles de dificultad
    - Simulación realista

---

## 🎵 Reproductor de Música Integrado

### Características del Reproductor

- **📁 Archivos Locales**: Sube tu propia música (MP3, WAV, OGG)
- **🎬 YouTube Embebido**: Pega URLs de YouTube y reproduce sin salir del juego
- **🎧 Spotify Embebido**: Integración completa con Spotify (tracks, álbumes, playlists)
- **🔊 Control de Volumen Independiente**:
  - Volumen de música
  - Volumen de efectos de sonido
  - Configuración persistente con `localStorage`

---

## 🎨 Diseño y Experiencia de Usuario

### Estética Premium
- **Gradientes Vibrantes**: Fondos dinámicos con transiciones suaves
- **Tipografía Moderna**: Google Fonts (Orbitron, Rajdhani)
- **Animaciones Fluidas**: Micro-animaciones CSS para feedback visual
- **Efectos de Partículas**: Explosiones, láseres, y efectos visuales
- **Glassmorphism**: Elementos con efecto de vidrio esmerilado
- **Modo Oscuro**: Diseño optimizado para reducir fatiga visual

### Responsive Design
- Adaptado para desktop, tablet y móvil
- Teclado virtual para dispositivos táctiles
- Controles táctiles optimizados

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
```
Frontend:
├── HTML5 (Estructura semántica)
├── CSS3 (Animaciones, Grid, Flexbox)
└── JavaScript Vanilla (Lógica del juego)

APIs Utilizadas:
├── Web Audio API (Síntesis de sonido)
├── localStorage API (Persistencia de datos)
├── Speech Synthesis API (Dictado)
├── Canvas API (Modo Nave)
└── YouTube/Spotify Embed API
```

### Estructura de Archivos
```
velocity-typing-game/
│
├── index.html              # Página principal
├── game-modes.html         # Selector de modos
├── music-player.html       # Reproductor de música
│
├── classic-mode.html       # Modo Clásico
├── classic-mode.js         # Lógica del Modo Clásico
├── ship-mode.html          # Batalla Espacial
├── blind-mode.html         # Modo Ciego
├── [otros modos...]
│
├── words.js                # Banco de palabras (WordBank)
├── progression.js          # Sistema de progresión y logros
│
└── README.md               # Este archivo
```

---

## 🚀 Instalación y Uso

### Opción 1: Uso Local

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/TU_USUARIO/velocity-mecanografia-juego.git
   cd velocity-mecanografia-juego
   ```

2. **Abre en el navegador**:
   - Simplemente abre `index.html` en tu navegador favorito
   - No requiere servidor (100% frontend)

### Opción 2: Despliegue en InfinityFree

1. Descarga `velocity-game-final.zip`
2. Sube a tu cuenta de InfinityFree
3. Extrae en la carpeta `htdocs`
4. ¡Listo! Accede desde tu dominio

### Opción 3: GitHub Pages

1. Ve a Settings → Pages
2. Selecciona la rama `main`
3. Guarda y espera el despliegue
4. Accede desde `https://TU_USUARIO.github.io/velocity-mecanografia-juego`

---

## 🎮 Cómo Jugar

### Controles Básicos
- **Teclado**: Escribe las palabras que aparecen en pantalla
- **Enter**: Iniciar juego (en algunos modos)
- **ESC**: Pausar (donde esté disponible)
- **❌ SALIR**: Botón en pantalla para regresar al menú

### Sistema de Puntuación
- **Palabra correcta**: +10 puntos base
- **Bonus de tiempo**: Más puntos si escribes rápido
- **Combo**: Multiplicador por palabras consecutivas
- **Power-ups**: Bonificaciones especiales

### Progresión
- **XP**: Gana experiencia con cada palabra
- **Niveles**: Sube de nivel para desbloquear contenido
- **Logros**: Completa desafíos especiales
- **Estadísticas**: WPM, precisión, palabras totales

---

## 🔧 Configuración

### Volumen
1. Abre el **Reproductor de Música** desde el menú principal
2. Ajusta los sliders:
   - **Volumen Música**: Controla la música de fondo
   - **Volumen Efectos**: Controla sonidos del juego
3. Los cambios se guardan automáticamente

### Personalización
- **Modo Nave**: Pega tu propio texto en el campo de texto personalizado
- **Dificultad**: Selecciona entre Fácil, Medio, Difícil, Hardcore en Modo Clásico

---

## 📊 Características Técnicas Destacadas

### Sistema de Power-ups (Modo Clásico)
```javascript
⏰ Tiempo Extra: +2 segundos
💎 Puntos Dobles: x2 multiplicador temporal
🔥 Combo Boost: +5 al combo actual
⚡ Vida Extra: +1 vida
```

### Algoritmo de Dificultad Adaptativa
- El tiempo por palabra disminuye gradualmente con cada nivel
- Mínimo de 1.5 segundos para mantener jugabilidad
- Spawn rate de enemigos aumenta en Modo Nave

### Optimizaciones de Rendimiento
- Uso de `requestAnimationFrame` para animaciones fluidas (60 FPS)
- Lazy loading de recursos
- Caché de audio para reducir latencia
- Filtrado eficiente de palabras en Modo Ciego

---

## 🎯 Roadmap Futuro

- [ ] Modo Multijugador Real (WebSockets)
- [ ] Integración con API de OpenAI para generación dinámica de texto
- [ ] Sistema de cuentas y rankings globales
- [ ] Modo AR (Realidad Aumentada) con WebXR
- [ ] Soporte para más idiomas
- [ ] Temas personalizables
- [ ] Exportación de estadísticas a CSV/PDF

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar VELOCITY:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Desarrollado con ❤️ por [Tu Nombre]**

- GitHub: [@TU_USUARIO](https://github.com/TU_USUARIO)
- Proyecto: [VELOCITY](https://github.com/TU_USUARIO/velocity-mecanografia-juego)

---

## 🙏 Agradecimientos

- **OpenGameArt.org**: Por los recursos de audio
- **Google Fonts**: Por las tipografías Orbitron y Rajdhani
- **Comunidad de desarrolladores**: Por el feedback y sugerencias

---

## 📸 Screenshots

### Menú Principal
![Menu Principal](screenshots/menu.png)

### Modo Clásico
![Modo Clasico](screenshots/classic.png)

### Batalla Espacial
![Modo Nave](screenshots/ship.png)

### Reproductor de Música
![Music Player](screenshots/music.png)

---

## 🔗 Enlaces Útiles

- [Demo en Vivo](https://tu-dominio.infinityfreeapp.com)
- [Documentación Completa](https://github.com/TU_USUARIO/velocity-mecanografia-juego/wiki)
- [Reportar Bug](https://github.com/TU_USUARIO/velocity-mecanografia-juego/issues)
- [Solicitar Feature](https://github.com/TU_USUARIO/velocity-mecanografia-juego/issues/new)

---

<div align="center">

**¿Te gusta VELOCITY? ¡Dale una ⭐ al repositorio!**

[⬆ Volver arriba](#-velocity---juego-de-mecanografía-avanzado)

</div>
