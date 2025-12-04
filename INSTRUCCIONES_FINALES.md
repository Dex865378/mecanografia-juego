# 🎯 Instrucciones Finales para Implementar la Base de Datos

## ✅ Archivos Creados para Ti

He creado **7 archivos nuevos** para integrar la base de datos en tu juego VELOCITY:

### 📄 Archivos Backend (PHP)
1. **`db_config.php`** - Configuración de conexión a MySQL
2. **`api.php`** - API REST para manejar operaciones

### 📄 Archivos Frontend (JavaScript)
3. **`database.js`** - Módulo JavaScript para interactuar con la API

### 📄 Archivos SQL
4. **`database_setup.sql`** - Script para crear las tablas

### 📄 Archivos de Documentación
5. **`DATABASE_SETUP_GUIDE.md`** - Guía completa paso a paso
6. **`INTEGRATION_SUMMARY.md`** - Resumen de la integración

### 📄 Archivos de Prueba
7. **`test_database.html`** - Página para probar la conexión

### 📄 Archivos Modificados
8. **`classic-easy.html`** - Ejemplo con integración completa

---

## 🚀 PASOS RÁPIDOS PARA IMPLEMENTAR

### Paso 1: Ejecutar el Script SQL (5 minutos)

1. Ve a tu phpMyAdmin: https://php-myadmin.net/db_sql.php?db=if0_40561253_mecan
2. Inicia sesión con tus credenciales
3. Selecciona la base de datos `if0_40561253_mecan`
4. Haz clic en la pestaña **"SQL"**
5. Abre el archivo `database_setup.sql` que creé
6. Copia TODO el contenido
7. Pégalo en el editor SQL
8. Haz clic en **"Ejecutar"** o **"Go"**

✅ **Resultado esperado**: Deberías ver un mensaje de éxito y 3 nuevas tablas creadas:
   - `scores`
   - `player_progress`
   - `player_settings`

---

### Paso 2: Configurar la Contraseña (2 minutos)

1. Abre el archivo `db_config.php`
2. Busca esta línea (línea 7):
   ```php
   define('DB_PASS', 'TU_CONTRASEÑA_AQUI');
   ```
3. Reemplaza `TU_CONTRASEÑA_AQUI` con tu contraseña real de MySQL
   
   **⚠️ IMPORTANTE**: 
   - La contraseña es la que usas para entrar a phpMyAdmin
   - NO uses comillas adicionales, solo reemplaza el texto
   - Ejemplo: `define('DB_PASS', 'miPassword123');`

4. Verifica también que estos datos sean correctos:
   ```php
   define('DB_HOST', 'sql110.infinityfree.com');  // Puede variar
   define('DB_USER', 'if0_40561253');
   define('DB_NAME', 'if0_40561253_mecan');
   ```

5. Guarda el archivo

---

### Paso 3: Subir Archivos al Servidor (10 minutos)

Sube estos archivos a tu hosting de InfinityFree usando FTP o el File Manager:

**Archivos OBLIGATORIOS:**
```
📁 htdocs/ (o public_html/)
├── db_config.php       ← ⚠️ CON LA CONTRASEÑA CORRECTA
├── api.php
├── database.js
└── (tus archivos HTML existentes)
```

**Archivos OPCIONALES (para pruebas):**
```
├── test_database.html  ← Para probar la conexión
├── database_setup.sql  ← NO subir (solo para phpMyAdmin)
```

**⚠️ NO SUBIR:**
- `database_setup.sql` (ya lo ejecutaste en phpMyAdmin)
- `DATABASE_SETUP_GUIDE.md` (solo documentación)
- `INTEGRATION_SUMMARY.md` (solo documentación)

---

### Paso 4: Probar la Conexión (5 minutos)

1. Sube `test_database.html` a tu servidor
2. Visita: `https://tu-sitio.infinityfreeapp.com/test_database.html`
3. Haz clic en cada botón de prueba:
   - ✅ **Test de Conexión** - Debe mostrar "Módulo cargado"
   - ✅ **Guardar Puntuación** - Debe mostrar "Puntuación guardada"
   - ✅ **Ver Líderes** - Debe mostrar la tabla
   - ✅ **Estadísticas** - Debe mostrar tus stats
   - ✅ **Tabla Visual** - Debe mostrar tabla HTML

**Si todo funciona:** ¡Perfecto! Pasa al Paso 5

**Si hay errores:** Revisa:
- ¿La contraseña en `db_config.php` es correcta?
- ¿Los archivos `api.php` y `database.js` están en el servidor?
- ¿Las tablas se crearon correctamente en phpMyAdmin?

---

### Paso 5: Integrar en Tus Modos de Juego (15 minutos)

Ya modifiqué `classic-easy.html` como ejemplo. Ahora puedes hacer lo mismo con los demás:

**Para cada archivo HTML de juego:**

1. Agrega esta línea antes del cierre de `</body>`:
   ```html
   <script src="database.js"></script>
   ```

2. Modifica la función `endGame()` para guardar la puntuación:
   ```javascript
   async function endGame() {
       isPlaying = false;
       clearInterval(timerInterval);
       
       // Tus cálculos existentes...
       const finalScore = score;
       const finalWPM = calculateWPM();
       const finalAccuracy = 95; // Calcula esto según tus errores
       
       // ✅ AGREGAR ESTO:
       if (typeof dbAPI !== 'undefined') {
           await dbAPI.saveScore(
               'nombre-del-modo',  // ej: 'classic-medium', 'versus-ai'
               finalScore,
               finalWPM,
               finalAccuracy,
               1  // nivel
           );
       }
   }
   ```

3. (Opcional) Agrega un contenedor para mostrar la tabla de líderes:
   ```html
   <div id="leaderboard-container"></div>
   ```

4. (Opcional) Muestra la tabla al finalizar:
   ```javascript
   await dbAPI.displayLeaderboard('leaderboard-container', 'nombre-del-modo', 10);
   ```

---

## 📊 Modos que Puedes Integrar

Estos son los archivos HTML donde puedes agregar la integración:

- ✅ `classic-easy.html` (Ya integrado como ejemplo)
- ⬜ `classic-medium.html`
- ⬜ `classic-hard.html`
- ⬜ `classic-hardcore.html`
- ⬜ `versus-ai.html`
- ⬜ `survival-mode.html`
- ⬜ `blind-mode.html`
- ⬜ `code-mode.html`
- ⬜ `hardcore-mode.html`
- ⬜ `zen-mode.html`
- ⬜ (y todos los demás modos)

---

## 🎮 Funciones Disponibles

### Guardar Puntuación
```javascript
await dbAPI.saveScore(mode, score, wpm, accuracy, level);
```

### Ver Tabla de Líderes (JSON)
```javascript
const leaderboard = await dbAPI.getLeaderboard('classic-easy', 10);
console.log(leaderboard);
```

### Mostrar Tabla de Líderes (HTML)
```javascript
await dbAPI.displayLeaderboard('container-id', 'classic-easy', 10);
```

### Ver Estadísticas del Jugador
```javascript
const stats = await dbAPI.getPlayerStats();
console.log(stats);
```

### Cambiar Nombre del Jugador
```javascript
dbAPI.setPlayerName('NuevoNombre');
```

---

## ❓ Preguntas Frecuentes

### ¿Dónde encuentro mi contraseña de MySQL?
En tu panel de InfinityFree, ve a:
1. MySQL Databases
2. Busca tu base de datos `if0_40561253_mecan`
3. Ahí verás el host, usuario y contraseña

### ¿Puedo probar esto localmente?
No directamente, porque necesitas un servidor PHP. Pero puedes:
1. Instalar XAMPP o WAMP
2. Crear una base de datos local
3. Modificar `db_config.php` con datos locales

### ¿Cómo veo las puntuaciones guardadas?
1. Ve a phpMyAdmin
2. Selecciona tu base de datos
3. Haz clic en la tabla `scores`
4. Verás todas las puntuaciones

### ¿Puedo personalizar la tabla de líderes?
¡Sí! Edita el CSS en `database.js` (líneas 230-250) o agrega tus propios estilos.

---

## 🆘 Solución de Problemas

### Error: "Connection failed"
**Causa**: Contraseña incorrecta o datos de conexión erróneos
**Solución**: 
1. Verifica la contraseña en `db_config.php`
2. Confirma el host en tu panel de InfinityFree
3. Asegúrate de que la base de datos exista

### Error: "Table doesn't exist"
**Causa**: No ejecutaste el script SQL
**Solución**: Ve al Paso 1 y ejecuta `database_setup.sql` en phpMyAdmin

### Error: "dbAPI is not defined"
**Causa**: `database.js` no está cargado
**Solución**: Agrega `<script src="database.js"></script>` antes de tu script

### No se guardan las puntuaciones
**Causa**: Problema con `api.php` o permisos
**Solución**:
1. Verifica que `api.php` esté en el servidor
2. Abre la consola del navegador (F12) para ver errores
3. Prueba visitando directamente: `tu-sitio.com/api.php?action=get_leaderboard`

---

## 📞 Contacto y Ayuda

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Consulta `DATABASE_SETUP_GUIDE.md` para más detalles
3. Verifica que todos los archivos estén en el servidor
4. Prueba con `test_database.html`

---

## ✨ ¡Listo!

Una vez que completes estos pasos, tu juego VELOCITY tendrá:
- ✅ Sistema de puntuaciones persistente
- ✅ Tabla de líderes global
- ✅ Estadísticas de jugadores
- ✅ Seguimiento de progreso

¡Buena suerte! 🚀
