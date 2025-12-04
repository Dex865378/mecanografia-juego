# 📦 INSTRUCCIONES PARA SUBIR A TU DOMINIO

## Archivo Creado
✅ **velocity-game-production.zip** - Listo para subir a tu servidor

---

## 🚀 Pasos para Subir al Dominio

### 1. Acceder a tu Panel de Control (cPanel/Hosting)
- Inicia sesión en tu panel de hosting
- Ve a "Administrador de Archivos" o "File Manager"

### 2. Navegar a la Carpeta del Juego
- Ve a `public_html` o la carpeta donde esté tu dominio
- Si tienes el juego en una subcarpeta (ej: `/mecanografia`), ve ahí

### 3. Eliminar Archivos Antiguos
**⚠️ IMPORTANTE: Haz un backup antes de borrar**

Borra SOLO estos archivos del juego anterior:
- Todos los archivos `.html` del juego
- Todos los archivos `.js` del juego
- Todos los archivos `.css` del juego
- Archivos `.php` relacionados (api.php, db_config.php)

**NO BORRES:**
- Carpeta `.git` (si existe)
- Archivos de configuración del servidor
- Otros proyectos o carpetas

### 4. Subir el Nuevo ZIP
1. Haz clic en "Subir" o "Upload"
2. Selecciona `velocity-game-production.zip`
3. Espera a que termine la carga

### 5. Extraer el ZIP
1. Haz clic derecho sobre `velocity-game-production.zip`
2. Selecciona "Extract" o "Extraer"
3. Confirma la extracción
4. Borra el archivo ZIP después de extraer

### 6. Configurar la Base de Datos (Si usas MySQL)
Si quieres que el sistema de XP se guarde en la base de datos:

1. **Crear la Base de Datos:**
   - Ve a "MySQL Databases" en cPanel
   - Crea una nueva base de datos (ej: `velocity_db`)
   - Crea un usuario y asígnalo a la base de datos

2. **Importar las Tablas:**
   - Ve a phpMyAdmin
   - Selecciona tu base de datos
   - Haz clic en "Importar"
   - Sube el archivo `database_setup.sql`

3. **Configurar Conexión:**
   - Edita el archivo `db_config.php`
   - Cambia estos valores:
   ```php
   $host = 'localhost';
   $dbname = 'tu_base_de_datos';
   $username = 'tu_usuario';
   $password = 'tu_contraseña';
   ```

### 7. Verificar que Funciona
1. Abre tu dominio en el navegador
2. Ve a la página del juego
3. Juega una partida en Modo Ciego
4. Verifica que ganes XP al acertar palabras
5. Ve a tu perfil y confirma que el XP se guardó

---

## 📋 Checklist de Verificación

- [ ] Backup de archivos antiguos hecho
- [ ] Archivos antiguos eliminados
- [ ] ZIP subido y extraído
- [ ] Base de datos configurada (opcional)
- [ ] Juego funciona correctamente
- [ ] Sistema de XP funciona
- [ ] Perfil muestra estadísticas

---

## 🐛 Si Algo No Funciona

### El juego no carga:
- Verifica que los archivos estén en la carpeta correcta
- Revisa la consola del navegador (F12) para ver errores

### El XP no se guarda:
- Si usas base de datos, verifica `db_config.php`
- Si no, el XP se guarda en localStorage del navegador

### Los archivos no se extraen:
- Intenta extraer manualmente en tu PC
- Sube los archivos uno por uno vía FTP

---

## 📁 Contenido del ZIP

El archivo incluye:
- ✅ Todos los modos de juego (.html)
- ✅ Sistema de progresión (progression.js)
- ✅ Sistema de base de datos (database.js)
- ✅ API PHP (api.php)
- ✅ Configuración de BD (db_config.php)
- ✅ Scripts SQL (database_setup.sql)
- ✅ Documentación (.md)
- ✅ Estilos (styles.css)
- ✅ Banco de palabras (words.js)

---

## 🎮 Cambios Incluidos en Esta Versión

### Bugs Corregidos:
1. ✅ Modo Ciego ahora otorga XP solo al acertar palabras
2. ✅ XP se guarda automáticamente en el perfil
3. ✅ Sistema de niveles funciona correctamente
4. ✅ Perfil muestra estadísticas actualizadas

### Mejoras:
- Sistema de XP mejorado (2 XP por letra)
- Guardado automático en localStorage
- Integración con base de datos MySQL
- Notificaciones visuales al subir de nivel
- Documentación completa incluida

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa el archivo `BUGS_CORREGIDOS.md`
2. Lee `DATABASE_SETUP_GUIDE.md` para la base de datos
3. Verifica la consola del navegador (F12)

---

**¡Listo para producción! 🚀**
