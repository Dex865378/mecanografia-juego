# 🗄️ GUÍA COMPLETA: CONFIGURAR BASE DE DATOS MYSQL

## 📋 PASO A PASO PARA GUARDAR PROGRESO DE JUGADORES

---

## PARTE 1: CREAR LA BASE DE DATOS 🏗️

### 1.1 Acceder a tu Panel de Hosting

1. **Inicia sesión** en tu panel de hosting (cPanel, Plesk, etc.)
2. **Busca el ícono** "MySQL Databases" o "Bases de Datos MySQL"
3. **Haz clic** para abrir el administrador

### 1.2 Crear la Base de Datos

1. **En la sección "Create New Database":**
   ```
   Nombre de la base de datos: velocity_db
   ```
   
2. **Haz clic en** "Create Database"

3. **Anota el nombre completo** que te muestra (puede ser algo como `tuusuario_velocity_db`)

### 1.3 Crear el Usuario

1. **En la sección "MySQL Users":**
   ```
   Username: velocity_user
   Password: [Genera una contraseña segura]
   ```

2. **Haz clic en** "Create User"

3. **IMPORTANTE:** Anota la contraseña en un lugar seguro

### 1.4 Asignar Usuario a la Base de Datos

1. **En la sección "Add User to Database":**
   - Selecciona el usuario: `velocity_user`
   - Selecciona la base de datos: `velocity_db`

2. **Haz clic en** "Add"

3. **En la siguiente pantalla:**
   - Marca la casilla "ALL PRIVILEGES" (todos los privilegios)
   - Haz clic en "Make Changes"

✅ **Base de datos creada correctamente!**

---

## PARTE 2: IMPORTAR LAS TABLAS 📊

### 2.1 Acceder a phpMyAdmin

1. **Vuelve al cPanel**
2. **Busca** "phpMyAdmin"
3. **Haz clic** para abrirlo

### 2.2 Seleccionar la Base de Datos

1. **En el panel izquierdo**, busca tu base de datos: `velocity_db` (o `tuusuario_velocity_db`)
2. **Haz clic** sobre ella

### 2.3 Importar el Script SQL

1. **Haz clic en la pestaña** "Importar" o "Import" (arriba)

2. **Haz clic en** "Seleccionar archivo" o "Choose File"

3. **Navega a tu carpeta** donde extrajiste el ZIP

4. **Selecciona el archivo:** `database_setup.sql`

5. **Haz clic en** "Continuar" o "Go" (abajo)

6. **Espera** a que termine (verás un mensaje de éxito en verde)

### 2.4 Verificar las Tablas

Deberías ver **3 tablas nuevas** en el panel izquierdo:
- ✅ `scores` - Para puntuaciones
- ✅ `player_progress` - Para nivel y XP
- ✅ `player_settings` - Para configuraciones

---

## PARTE 3: CONFIGURAR LA CONEXIÓN 🔌

### 3.1 Editar db_config.php

1. **En tu administrador de archivos**, busca el archivo: `db_config.php`

2. **Haz clic derecho** → "Edit" o "Editar"

3. **Reemplaza el contenido** con esto:

```php
<?php
// ============================================
// CONFIGURACIÓN DE BASE DE DATOS - VELOCITY
// ============================================

// IMPORTANTE: Cambia estos valores por los tuyos
$host = 'localhost';  // Normalmente es 'localhost'
$dbname = 'TU_NOMBRE_BD_AQUI';  // Ejemplo: tuusuario_velocity_db
$username = 'TU_USUARIO_AQUI';  // Ejemplo: tuusuario_velocity_user
$password = 'TU_CONTRASEÑA_AQUI';  // La contraseña que generaste

// No cambies nada de aquí para abajo
try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4", 
        $username, 
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
    
    // Conexión exitosa
    // echo "✅ Conexión exitosa a la base de datos";
    
} catch(PDOException $e) {
    // Error de conexión
    die("❌ Error de conexión: " . $e->getMessage());
}
?>
```

4. **Cambia estos valores:**
   - `TU_NOMBRE_BD_AQUI` → El nombre completo de tu base de datos
   - `TU_USUARIO_AQUI` → El usuario que creaste
   - `TU_CONTRASEÑA_AQUI` → La contraseña del usuario

5. **Guarda el archivo** (Ctrl+S o botón "Save")

### 3.2 Ejemplo Real

Si tu hosting es `midominio.com` y tu usuario de cPanel es `midominio`:

```php
$host = 'localhost';
$dbname = 'midominio_velocity_db';  // ← Nota el prefijo
$username = 'midominio_velocity_user';  // ← Nota el prefijo
$password = 'MiContraseñaSegura123!';
```

---

## PARTE 4: PROBAR LA CONEXIÓN 🧪

### 4.1 Crear Archivo de Prueba

1. **Crea un nuevo archivo** llamado `test_db.php` en tu servidor

2. **Pega este código:**

```php
<?php
require_once 'db_config.php';

echo "<h1>🧪 Test de Conexión a Base de Datos</h1>";

try {
    // Probar conexión
    $stmt = $pdo->query("SELECT DATABASE()");
    $dbname = $stmt->fetchColumn();
    
    echo "<p style='color: green;'>✅ Conexión exitosa!</p>";
    echo "<p>Base de datos conectada: <strong>$dbname</strong></p>";
    
    // Verificar tablas
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h2>Tablas encontradas:</h2><ul>";
    foreach($tables as $table) {
        echo "<li>✅ $table</li>";
    }
    echo "</ul>";
    
    // Contar registros
    $stmt = $pdo->query("SELECT COUNT(*) FROM scores");
    $count = $stmt->fetchColumn();
    echo "<p>Puntuaciones en la base de datos: <strong>$count</strong></p>";
    
    echo "<h2 style='color: green;'>🎉 ¡Todo funciona correctamente!</h2>";
    
} catch(PDOException $e) {
    echo "<p style='color: red;'>❌ Error: " . $e->getMessage() . "</p>";
}
?>
```

3. **Guarda el archivo**

### 4.2 Ejecutar la Prueba

1. **Abre tu navegador**
2. **Ve a:** `https://tudominio.com/test_db.php`
3. **Deberías ver:**
   - ✅ Conexión exitosa
   - ✅ Lista de 3 tablas
   - ✅ Mensaje de éxito

### 4.3 Si Hay Errores

**Error: "Access denied"**
- Verifica usuario y contraseña en `db_config.php`

**Error: "Unknown database"**
- Verifica el nombre de la base de datos

**Error: "Table doesn't exist"**
- Vuelve a importar `database_setup.sql` en phpMyAdmin

---

## PARTE 5: VERIFICAR QUE EL JUEGO GUARDA 🎮

### 5.1 Jugar una Partida

1. **Abre el juego** en tu dominio
2. **Ve a Modo Ciego** (blind-mode.html)
3. **Juega una partida** y gana algo de XP
4. **Abre la consola** del navegador (F12)
5. **Deberías ver:** `✅ Progress saved!`

### 5.2 Verificar en la Base de Datos

1. **Ve a phpMyAdmin**
2. **Selecciona tu base de datos**
3. **Haz clic en la tabla** `player_progress`
4. **Haz clic en** "Browse" o "Examinar"
5. **Deberías ver tu registro** con:
   - Tu nombre de jugador
   - Nivel actual
   - XP total
   - Logros

### 5.3 Verificar en el Perfil

1. **Ve a** `profile.html` en tu dominio
2. **Deberías ver:**
   - Tu nivel correcto
   - Tu XP total
   - Tus logros

---

## 🎯 CHECKLIST FINAL

Marca cada paso cuando lo completes:

- [ ] Base de datos creada (`velocity_db`)
- [ ] Usuario creado y asignado
- [ ] Tablas importadas desde `database_setup.sql`
- [ ] Archivo `db_config.php` editado con tus datos
- [ ] Prueba de conexión exitosa (`test_db.php`)
- [ ] Juego probado y XP guardado
- [ ] Perfil muestra datos correctos

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Problema: No se guarda el XP

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que `db_config.php` tenga los datos correctos
4. Prueba `test_db.php` para verificar la conexión

### Problema: "Error de conexión"

**Solución:**
1. Verifica que el host sea `localhost`
2. Verifica el nombre completo de la base de datos (con prefijo)
3. Verifica usuario y contraseña
4. Contacta a tu hosting si el problema persiste

### Problema: Tablas no aparecen

**Solución:**
1. Vuelve a phpMyAdmin
2. Selecciona la base de datos correcta
3. Importa nuevamente `database_setup.sql`

---

## 📞 DATOS IMPORTANTES A GUARDAR

Anota estos datos en un lugar seguro:

```
HOST: localhost
BASE DE DATOS: ___________________________
USUARIO: ___________________________
CONTRASEÑA: ___________________________
```

---

## ✅ ¡LISTO!

Una vez completados todos los pasos, tu juego:
- ✅ Guardará el progreso de todos los jugadores
- ✅ Funcionará en cualquier dispositivo
- ✅ Tendrá tabla de líderes global
- ✅ No perderá datos aunque borren cookies

**¡Disfruta tu juego con base de datos funcionando!** 🎮🚀
