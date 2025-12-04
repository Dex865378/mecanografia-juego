# 📊 Resumen de Integración de Base de Datos - VELOCITY

## ✅ Archivos Creados

### 1. `db_config.php` - Configuración de Base de Datos
- Contiene las credenciales de conexión a MySQL
- **⚠️ IMPORTANTE**: Debes cambiar la contraseña antes de subir al servidor

### 2. `api.php` - API REST
Endpoints disponibles:
- `save_score` - Guardar puntuaciones
- `get_leaderboard` - Obtener tabla de líderes
- `get_player_stats` - Estadísticas del jugador
- `save_progress` - Guardar progreso

### 3. `database.js` - Módulo JavaScript
Funciones principales:
```javascript
// Guardar puntuación
await dbAPI.saveScore(mode, score, wpm, accuracy, level);

// Ver tabla de líderes
await dbAPI.getLeaderboard(mode, limit);

// Estadísticas del jugador
await dbAPI.getPlayerStats();

// Mostrar tabla en HTML
await dbAPI.displayLeaderboard(containerId, mode, limit);
```

### 4. `database_setup.sql` - Script SQL
Crea 3 tablas:
- `scores` - Puntuaciones
- `player_progress` - Progreso del jugador
- `player_settings` - Configuraciones

### 5. `DATABASE_SETUP_GUIDE.md` - Guía Completa
Instrucciones paso a paso para configurar todo

### 6. `classic-easy.html` - Ejemplo de Integración
Archivo modificado con:
- Importación de `database.js`
- Guardado automático de puntuaciones
- Tabla de líderes al finalizar

---

## 🚀 Pasos para Implementar

### Paso 1: Crear Tablas en phpMyAdmin
1. Ve a: https://php-myadmin.net/db_sql.php?db=if0_40561253_mecan
2. Copia y pega el contenido de `database_setup.sql`
3. Ejecuta el script

### Paso 2: Configurar Contraseña
1. Abre `db_config.php`
2. Cambia `'TU_CONTRASEÑA_AQUI'` por tu contraseña real de MySQL

### Paso 3: Subir Archivos
Sube estos archivos a tu hosting:
```
📁 Tu sitio/
├── db_config.php
├── api.php
├── database.js
└── (archivos HTML)
```

### Paso 4: Integrar en Otros Modos
Agrega en cada archivo HTML:
```html
<!-- Antes del cierre de </body> -->
<script src="database.js"></script>

<script>
async function endGame() {
    // Tu código existente...
    
    // ✅ Agregar esto:
    await dbAPI.saveScore('nombre-del-modo', score, wpm, accuracy, level);
    await dbAPI.displayLeaderboard('leaderboard-container', 'nombre-del-modo', 10);
}
</script>
```

---

## 📋 Checklist de Implementación

- [ ] Ejecutar `database_setup.sql` en phpMyAdmin
- [ ] Configurar contraseña en `db_config.php`
- [ ] Subir archivos al servidor
- [ ] Probar conexión con `test_db.php`
- [ ] Integrar en `classic-easy.html` (✅ Ya hecho)
- [ ] Integrar en `classic-medium.html`
- [ ] Integrar en `classic-hard.html`
- [ ] Integrar en `classic-hardcore.html`
- [ ] Integrar en `versus-ai.html`
- [ ] Integrar en otros modos...

---

## 🎯 Ejemplo de Uso Completo

```javascript
// Al finalizar el juego
async function endGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    
    // Calcular estadísticas finales
    const finalScore = score;
    const finalWPM = calculateWPM();
    const finalAccuracy = calculateAccuracy();
    const currentLevel = 1;
    
    // Guardar en base de datos
    await dbAPI.saveScore('classic-easy', finalScore, finalWPM, finalAccuracy, currentLevel);
    
    // Mostrar tabla de líderes
    showLeaderboard();
}

function showLeaderboard() {
    document.getElementById('leaderboard-section').style.display = 'block';
    dbAPI.displayLeaderboard('leaderboard-container', 'classic-easy', 10);
}
```

---

## 🔧 Solución de Problemas

### "dbAPI is not defined"
- Verifica que `database.js` esté cargado antes de tu script
- Revisa la consola del navegador (F12)

### "Connection failed"
- Verifica la contraseña en `db_config.php`
- Confirma que el host de MySQL sea correcto
- Asegúrate de que la base de datos exista

### No se muestran puntuaciones
- Verifica que las tablas estén creadas
- Revisa la consola para ver errores de JavaScript
- Comprueba que `api.php` esté en el servidor

---

## 📊 Estructura de la Base de Datos

### Tabla `scores`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT | ID único |
| player_name | VARCHAR(100) | Nombre del jugador |
| mode | VARCHAR(50) | Modo de juego |
| score | INT | Puntuación |
| wpm | INT | Palabras por minuto |
| accuracy | DECIMAL(5,2) | Precisión (%) |
| level | INT | Nivel alcanzado |
| created_at | DATETIME | Fecha y hora |

### Tabla `player_progress`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT | ID único |
| player_name | VARCHAR(100) | Nombre del jugador |
| current_level | INT | Nivel actual |
| total_xp | INT | Experiencia total |
| achievements | TEXT | Logros (JSON) |
| created_at | DATETIME | Fecha de creación |
| updated_at | DATETIME | Última actualización |

---

## 🎮 Próximos Pasos

1. **Probar la integración** en `classic-easy.html`
2. **Replicar** en los demás modos de juego
3. **Personalizar** la tabla de líderes con tu estilo
4. **Agregar** más estadísticas (racha, mejor tiempo, etc.)
5. **Implementar** sistema de logros

---

**¿Necesitas ayuda?** Consulta `DATABASE_SETUP_GUIDE.md` para más detalles.
