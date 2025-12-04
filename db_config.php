<?php
// Database Configuration
// Configuración basada en tu panel de InfinityFree

define('DB_HOST', 'sql303.infinityfree.com'); // Host de tu base de datos
define('DB_USER', 'if0_40561253'); // Tu usuario de base de datos
define('DB_PASS', 'YcT02xYksc0'); // Tu contraseña de MySQL
define('DB_NAME', 'if0_40561253_mecan'); // Nombre de tu base de datos

// Crear conexión
function getDBConnection()
{
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    // Verificar conexión
    if ($conn->connect_error) {
        die(json_encode([
            'success' => false,
            'error' => 'Connection failed: ' . $conn->connect_error
        ]));
    }

    // Establecer charset UTF-8
    $conn->set_charset("utf8mb4");

    return $conn;
}
?>