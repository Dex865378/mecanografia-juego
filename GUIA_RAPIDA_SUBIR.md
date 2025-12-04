# 📦 GUÍA RÁPIDA - Subir Base de Datos a InfinityFree

## ✅ Archivo Creado: `velocity-database-integration.zip`

Este ZIP contiene TODO lo que necesitas subir al servidor.

---

## 🚀 PASOS SIMPLES (Solo 3 pasos)

### PASO 1: Ejecutar el SQL (5 minutos)

1. Ve a tu panel de InfinityFree
2. Haz clic en **"phpMyAdmin"** (el botón morado que viste en la imagen)
3. Selecciona la base de datos: `if0_40561253_mecan`
4. Haz clic en la pestaña **"SQL"** (arriba)
5. Copia y pega este código:

```sql
-- Copia desde aquí ↓

CREATE TABLE IF NOT EXISTS `scores` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `player_name` VARCHAR(100) NOT NULL,
  `mode` VARCHAR(50) NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  `wpm` INT NOT NULL DEFAULT 0,
  `accuracy` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `level` INT NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL,
  INDEX `idx_player` (`player_name`),
  INDEX `idx_mode` (`mode`),
  INDEX `idx_score` (`score` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `player_progress` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `player_name` VARCHAR(100) NOT NULL UNIQUE,
  `current_level` INT NOT NULL DEFAULT 1,
  `total_xp` INT NOT NULL DEFAULT 0,
  `achievements` TEXT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  INDEX `idx_player_name` (`player_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `player_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `player_name` VARCHAR(100) NOT NULL UNIQUE,
  `theme` VARCHAR(50) DEFAULT 'dark',
  `sound_enabled` BOOLEAN DEFAULT TRUE,
  `difficulty` VARCHAR(20) DEFAULT 'medium',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  INDEX `idx_player_settings` (`player_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `scores` (`player_name`, `mode`, `score`, `wpm`, `accuracy`, `level`, `created_at`) VALUES
('Player1', 'classic', 1500, 85, 95.50, 5, NOW()),
('Player2', 'versus-ai', 2000, 92, 98.20, 7, NOW()),
('Player3', 'survival', 1200, 78, 93.10, 4, NOW());

-- Hasta aquí ↑
```

6. Haz clic en **"Ejecutar"** o **"Go"**
7. Deberías ver: ✅ "3 tablas creadas exitosamente"

---

### PASO 2: Subir el ZIP al Servidor (10 minutos)

#### Opción A: File Manager (Más Fácil)

1. En tu panel de InfinityFree, busca **"File Manager"**
2. Haz clic para abrirlo
3. Navega a la carpeta **`htdocs`** (o `public_html`)
4. Haz clic en **"Upload"** (arriba a la derecha)
5. Selecciona el archivo: `velocity-database-integration.zip`
6. Espera a que se suba
7. Haz clic derecho en el archivo ZIP → **"Extract"** (Extraer)
8. ¡Listo! Los archivos estarán en tu servidor

#### Opción B: FTP (Si prefieres)

1. Descarga FileZilla (si no lo tienes)
2. Conecta con estos datos:
   - Host: `ftpupload.net`
   - Usuario: `if0_40561253`
   - Contraseña: (la misma de tu panel)
3. Navega a `/htdocs/`
4. Arrastra el ZIP y extráelo

---

### PASO 3: Probar que Funcione (2 minutos)

1. Abre tu navegador
2. Ve a: `https://tu-sitio.infinityfreeapp.com/test_database.html`
   
   (Reemplaza `tu-sitio` por el nombre de tu dominio)

3. Haz clic en cada botón:
   - ✅ **Test de Conexión** → Debe decir "Módulo cargado"
   - ✅ **Guardar Puntuación** → Debe decir "Puntuación guardada"
   - ✅ **Ver Líderes** → Debe mostrar 3 jugadores de ejemplo
   - ✅ **Estadísticas** → Debe mostrar tus stats
   - ✅ **Tabla Visual** → Debe mostrar tabla HTML

4. Si todo sale ✅ → ¡FUNCIONA!

---

## 📂 Archivos Incluidos en el ZIP

```
velocity-database-integration.zip
├── db_config.php              ← Configuración (YA tiene tu contraseña)
├── api.php                    ← API para operaciones
├── database.js                ← Módulo JavaScript
├── test_database.html         ← Página de pruebas
├── classic-easy.html          ← Ejemplo integrado
└── INSTRUCCIONES_FINALES.md   ← Guía completa
```

---

## ⚠️ IMPORTANTE

### ✅ Archivos que SÍ debes subir:
- `db_config.php` (ya tiene tu contraseña configurada)
- `api.php`
- `database.js`
- `test_database.html`
- `classic-easy.html`

### ❌ Archivos que NO debes subir:
- `database_setup.sql` (solo para ejecutar en phpMyAdmin)
- `INSTRUCCIONES_FINALES.md` (solo para leer)

---

## 🎮 ¿Qué Hace Cada Archivo?

| Archivo | Función |
|---------|---------|
| `db_config.php` | Se conecta a tu base de datos MySQL |
| `api.php` | Maneja guardar/leer puntuaciones |
| `database.js` | Permite usar la base de datos desde JavaScript |
| `test_database.html` | Prueba que todo funcione |
| `classic-easy.html` | Ejemplo de juego con base de datos |

---

## 🆘 Si Algo Sale Mal

### Error: "Connection failed"
**Solución**: Verifica que ejecutaste el SQL en el PASO 1

### Error: "Table doesn't exist"
**Solución**: Ve a phpMyAdmin y verifica que las 3 tablas existan:
- `scores`
- `player_progress`
- `player_settings`

### Error: "404 Not Found"
**Solución**: Verifica que los archivos estén en la carpeta `htdocs`

### No pasa nada al hacer clic
**Solución**: Abre la consola del navegador (F12) y mira si hay errores

---

## ✨ Después de que Funcione

Una vez que `test_database.html` funcione correctamente, puedes:

1. **Integrar en otros modos**: Copia el código de `classic-easy.html`
2. **Personalizar la tabla**: Edita los estilos en `database.js`
3. **Ver las puntuaciones**: Ve a phpMyAdmin → tabla `scores`

---

## 📞 Resumen Ultra Rápido

1. ✅ Ejecuta el SQL en phpMyAdmin
2. ✅ Sube el ZIP a `htdocs` y extráelo
3. ✅ Abre `test_database.html` en tu navegador
4. ✅ ¡Disfruta tu sistema de puntuaciones!

---

**Ubicación del ZIP**: 
```
C:\Users\diabl\.gemini\antigravity\scratch\velocity-typing-game\velocity-database-integration.zip
```

¡Buena suerte! 🚀
