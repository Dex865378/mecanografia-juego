# 🗄️ Guía de Configuración de Base de Datos - VELOCITY Typing Game

## 📋 Pasos para Configurar

### 1️⃣ Crear las Tablas en phpMyAdmin

1. Ve a: https://php-myadmin.net/db_sql.php?db=if0_40561253_mecan
2. Inicia sesión con tus credenciales de InfinityFree
3. Selecciona la base de datos `if0_40561253_mecan`
4. Ve a la pestaña **SQL**
5. Copia y pega el contenido del archivo `database_setup.sql`
6. Haz clic en **"Ejecutar"** o **"Go"**

✅ Esto creará 3 tablas:
- `scores` - Para almacenar puntuaciones
- `player_progress` - Para el progreso del jugador
- `player_settings` - Para configuraciones personalizadas

---

### 2️⃣ Configurar la Conexión

1. Abre el archivo `db_config.php`
2. Busca la línea:
   ```php
   define('DB_PASS', 'TU_CONTRASEÑA_AQUI');
   ```
3. Reemplaza `TU_CONTRASEÑA_AQUI` con tu contraseña real de MySQL
4. Verifica que los otros datos sean correctos:
   - **DB_HOST**: `sql110.infinityfree.com` (puede variar, verifica en tu panel)
   - **DB_USER**: `if0_40561253`
   - **DB_NAME**: `if0_40561253_mecan`

---

### 3️⃣ Subir Archivos al Servidor

Sube estos archivos a tu hosting de InfinityFree:

```
📁 Tu sitio web/
├── 📄 db_config.php      ← Configuración de DB
├── 📄 api.php            ← API para operaciones
├── 📄 database.js        ← Módulo JavaScript
└── 📄 (resto de archivos HTML)
```

**⚠️ IMPORTANTE**: 
- **NO** subas `database_setup.sql` (solo es para ejecutar en phpMyAdmin)
- Asegúrate de que `db_config.php` tenga la contraseña correcta

---

### 4️⃣ Integrar en tus Archivos HTML

Agrega esta línea en el `<head>` de cada archivo HTML donde quieras usar la base de datos:

```html
<script src="database.js"></script>
```

**Ejemplo de uso en tu código JavaScript:**

```javascript
// Al finalizar una partida
async function gameOver() {
    const score = 1500;
    const wpm = 85;
    const accuracy = 95.5;
    const level = 5;
    const mode = 'classic';
    
    // Guardar puntuación
    await dbAPI.saveScore(mode, score, wpm, accuracy, level);
    
    // Mostrar tabla de líderes
    await dbAPI.displayLeaderboard('leaderboard-container', mode, 10);
}

// Ver estadísticas del jugador
async function showStats() {
    const stats = await dbAPI.getPlayerStats();
    console.log('Mis estadísticas:', stats);
}
```

---

### 5️⃣ Ejemplo de Integración Completa

Aquí tienes un ejemplo de cómo modificar `classic-easy.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>VELOCITY - Classic Easy</title>
    <link rel="stylesheet" href="styles.css">
    <!-- ✅ Agregar módulo de base de datos -->
    <script src="database.js"></script>
</head>
<body>
    <div id="game-container">
        <!-- Tu juego aquí -->
    </div>
    
    <!-- ✅ Contenedor para la tabla de líderes -->
    <div id="leaderboard-container"></div>
    
    <script>
        // Tu código del juego...
        
        // ✅ Al terminar el juego
        function endGame() {
            const finalScore = calculateScore();
            const finalWPM = calculateWPM();
            const finalAccuracy = calculateAccuracy();
            
            // Guardar en la base de datos
            dbAPI.saveScore('classic-easy', finalScore, finalWPM, finalAccuracy, currentLevel);
            
            // Mostrar tabla de líderes
            dbAPI.displayLeaderboard('leaderboard-container', 'classic-easy', 10);
        }
    </script>
</body>
</html>
```

---

## 🔧 Funciones Disponibles

### `dbAPI.saveScore(mode, score, wpm, accuracy, level)`
Guarda una puntuación en la base de datos.

**Parámetros:**
- `mode` (string): Modo de juego (ej: 'classic-easy', 'versus-ai')
- `score` (number): Puntuación total
- `wpm` (number): Palabras por minuto
- `accuracy` (number): Precisión (0-100)
- `level` (number): Nivel alcanzado

---

### `dbAPI.getLeaderboard(mode, limit)`
Obtiene la tabla de líderes.

**Parámetros:**
- `mode` (string): Modo de juego o 'all' para todos
- `limit` (number): Cantidad de resultados (default: 10)

**Retorna:** Array de objetos con las puntuaciones

---

### `dbAPI.getPlayerStats(playerName)`
Obtiene las estadísticas de un jugador.

**Retorna:** Objeto con:
- `total_games`: Total de partidas jugadas
- `best`: Mejores puntuaciones
- `average`: Promedios

---

### `dbAPI.displayLeaderboard(containerId, mode, limit)`
Muestra la tabla de líderes en un contenedor HTML.

**Parámetros:**
- `containerId` (string): ID del elemento donde mostrar la tabla
- `mode` (string): Modo de juego
- `limit` (number): Cantidad de resultados

---

## 🧪 Probar la Conexión

Crea un archivo `test_db.php` en tu servidor con este contenido:

```php
<?php
require_once 'db_config.php';

$conn = getDBConnection();

if ($conn) {
    echo "✅ ¡Conexión exitosa a la base de datos!<br>";
    
    // Probar consulta
    $result = $conn->query("SELECT COUNT(*) as total FROM scores");
    $row = $result->fetch_assoc();
    echo "📊 Total de puntuaciones: " . $row['total'];
    
    $conn->close();
} else {
    echo "❌ Error de conexión";
}
?>
```

Luego visita: `https://tu-sitio.infinityfreeapp.com/test_db.php`

---

## ❓ Solución de Problemas

### Error: "Connection failed"
- Verifica que la contraseña en `db_config.php` sea correcta
- Confirma el host de MySQL en tu panel de InfinityFree
- Asegúrate de que la base de datos exista

### Error: "Table doesn't exist"
- Ejecuta el script SQL en phpMyAdmin
- Verifica que el nombre de la base de datos sea correcto

### No se guardan las puntuaciones
- Abre la consola del navegador (F12) para ver errores
- Verifica que `database.js` esté cargado
- Comprueba que `api.php` esté en el servidor

---

## 🎯 Próximos Pasos

1. ✅ Crear las tablas en phpMyAdmin
2. ✅ Configurar `db_config.php` con tu contraseña
3. ✅ Subir archivos al servidor
4. ✅ Agregar `<script src="database.js"></script>` a tus HTML
5. ✅ Integrar las llamadas a `dbAPI` en tu código
6. ✅ ¡Probar y disfrutar!

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para ver mensajes de error detallados.
