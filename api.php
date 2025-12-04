<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'db_config.php';

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = getDBConnection();
$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'save_score':
        saveScore($conn);
        break;

    case 'get_leaderboard':
        getLeaderboard($conn);
        break;

    case 'get_player_stats':
        getPlayerStats($conn);
        break;

    case 'save_progress':
        saveProgress($conn);
        break;

    case 'get_player_progress':
        getPlayerProgress($conn);
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Invalid action']);
        break;
}

$conn->close();

// Guardar puntuación
function saveScore($conn)
{
    $player_name = $conn->real_escape_string($_POST['player_name'] ?? 'Anonymous');
    $mode = $conn->real_escape_string($_POST['mode'] ?? 'classic');
    $score = intval($_POST['score'] ?? 0);
    $wpm = intval($_POST['wpm'] ?? 0);
    $accuracy = floatval($_POST['accuracy'] ?? 0);
    $level = intval($_POST['level'] ?? 1);

    $sql = "INSERT INTO scores (player_name, mode, score, wpm, accuracy, level, created_at) 
            VALUES ('$player_name', '$mode', $score, $wpm, $accuracy, $level, NOW())";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            'success' => true,
            'message' => 'Score saved successfully',
            'id' => $conn->insert_id
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => $conn->error
        ]);
    }
}

// Obtener tabla de líderes
function getLeaderboard($conn)
{
    $mode = $conn->real_escape_string($_GET['mode'] ?? 'all');
    $limit = intval($_GET['limit'] ?? 10);

    $where = $mode !== 'all' ? "WHERE mode = '$mode'" : '';

    $sql = "SELECT player_name, mode, score, wpm, accuracy, level, created_at 
            FROM scores 
            $where
            ORDER BY score DESC, wpm DESC 
            LIMIT $limit";

    $result = $conn->query($sql);
    $leaderboard = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $leaderboard[] = $row;
        }
    }

    echo json_encode([
        'success' => true,
        'data' => $leaderboard
    ]);
}

// Obtener estadísticas del jugador
function getPlayerStats($conn)
{
    $player_name = $conn->real_escape_string($_GET['player_name'] ?? '');

    if (empty($player_name)) {
        echo json_encode(['success' => false, 'error' => 'Player name required']);
        return;
    }

    // Mejor puntuación
    $sql_best = "SELECT MAX(score) as best_score, MAX(wpm) as best_wpm, 
                 MAX(accuracy) as best_accuracy, MAX(level) as max_level
                 FROM scores WHERE player_name = '$player_name'";

    $result_best = $conn->query($sql_best);
    $best_stats = $result_best->fetch_assoc();

    // Total de partidas
    $sql_count = "SELECT COUNT(*) as total_games FROM scores WHERE player_name = '$player_name'";
    $result_count = $conn->query($sql_count);
    $count_data = $result_count->fetch_assoc();

    // Promedio
    $sql_avg = "SELECT AVG(score) as avg_score, AVG(wpm) as avg_wpm, 
                AVG(accuracy) as avg_accuracy 
                FROM scores WHERE player_name = '$player_name'";
    $result_avg = $conn->query($sql_avg);
    $avg_stats = $result_avg->fetch_assoc();

    echo json_encode([
        'success' => true,
        'data' => [
            'player_name' => $player_name,
            'total_games' => $count_data['total_games'],
            'best' => $best_stats,
            'average' => $avg_stats
        ]
    ]);
}

// Guardar progreso del jugador
function saveProgress($conn)
{
    $player_name = $conn->real_escape_string($_POST['player_name'] ?? 'Anonymous');
    $current_level = intval($_POST['current_level'] ?? 1);
    $total_xp = intval($_POST['total_xp'] ?? 0);
    $achievements = $conn->real_escape_string($_POST['achievements'] ?? '[]');

    // Verificar si el jugador ya existe
    $check_sql = "SELECT id FROM player_progress WHERE player_name = '$player_name'";
    $check_result = $conn->query($check_sql);

    if ($check_result->num_rows > 0) {
        // Actualizar
        $sql = "UPDATE player_progress 
                SET current_level = $current_level, 
                    total_xp = $total_xp, 
                    achievements = '$achievements',
                    updated_at = NOW()
                WHERE player_name = '$player_name'";
    } else {
        // Insertar
        $sql = "INSERT INTO player_progress (player_name, current_level, total_xp, achievements, created_at, updated_at) 
                VALUES ('$player_name', $current_level, $total_xp, '$achievements', NOW(), NOW())";
    }

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            'success' => true,
            'message' => 'Progress saved successfully'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => $conn->error
        ]);
    }
}

// Obtener progreso del jugador
function getPlayerProgress($conn)
{
    $player_name = $conn->real_escape_string($_GET['player_name'] ?? '');

    if (empty($player_name)) {
        echo json_encode(['success' => false, 'error' => 'Player name required']);
        return;
    }

    $sql = "SELECT * FROM player_progress WHERE player_name = '$player_name'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
        echo json_encode([
            'success' => true,
            'data' => $data
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'No progress found for this player'
        ]);
    }
}
?>