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

// Obtener acción
$action = $_POST['action'] ?? $_GET['action'] ?? '';

try {
    switch ($action) {
        case 'save_score':
            saveScore($pdo);
            break;

        case 'get_leaderboard':
            getLeaderboard($pdo);
            break;

        case 'get_player_stats':
            getPlayerStats($pdo);
            break;

        case 'save_progress':
            saveProgress($pdo);
            break;

        case 'get_player_progress':
            getPlayerProgress($pdo);
            break;

        case 'social_login':
            socialLogin($pdo);
            break;

        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action']);
            break;
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

// --- FUNCIONES ---

function saveScore($pdo)
{
    $player_name = $_POST['player_name'] ?? 'Anonymous';
    $mode = $_POST['mode'] ?? 'classic';
    $score = intval($_POST['score'] ?? 0);
    $wpm = intval($_POST['wpm'] ?? 0);
    $accuracy = floatval($_POST['accuracy'] ?? 0);
    $level = intval($_POST['level'] ?? 1);

    $stmt = $pdo->prepare("INSERT INTO scores (player_name, mode, score, wpm, accuracy, level, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
    $stmt->execute([$player_name, $mode, $score, $wpm, $accuracy, $level]);

    echo json_encode(['success' => true, 'message' => 'Score saved successfully', 'id' => $pdo->lastInsertId()]);
}

function getLeaderboard($pdo)
{
    $mode = $_GET['mode'] ?? 'all';
    $limit = intval($_GET['limit'] ?? 10);

    $sql = "SELECT player_name, mode, score, wpm, accuracy, level, created_at FROM scores";
    if ($mode !== 'all') {
        $sql .= " WHERE mode = :mode";
    }
    $sql .= " ORDER BY score DESC, wpm DESC LIMIT :limit";

    $stmt = $pdo->prepare($sql);
    if ($mode !== 'all') {
        $stmt->bindValue(':mode', $mode);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
}

function getPlayerStats($pdo)
{
    $player_name = $_GET['player_name'] ?? '';
    if (empty($player_name)) {
        echo json_encode(['success' => false, 'error' => 'Player name required']);
        return;
    }

    // Mejor puntuación
    $stmt = $pdo->prepare("SELECT MAX(score) as best_score, MAX(wpm) as best_wpm, MAX(accuracy) as best_accuracy, MAX(level) as max_level FROM scores WHERE player_name = ?");
    $stmt->execute([$player_name]);
    $best_stats = $stmt->fetch();

    // Total partidas
    $stmt = $pdo->prepare("SELECT COUNT(*) as total_games FROM scores WHERE player_name = ?");
    $stmt->execute([$player_name]);
    $total_games = $stmt->fetchColumn();

    // Promedios
    $stmt = $pdo->prepare("SELECT AVG(score) as avg_score, AVG(wpm) as avg_wpm, AVG(accuracy) as avg_accuracy FROM scores WHERE player_name = ?");
    $stmt->execute([$player_name]);
    $avg_stats = $stmt->fetch();

    echo json_encode([
        'success' => true,
        'data' => [
            'player_name' => $player_name,
            'total_games' => $total_games,
            'best' => $best_stats,
            'average' => $avg_stats
        ]
    ]);
}

function saveProgress($pdo)
{
    $player_name = $_POST['player_name'] ?? 'Anonymous';
    $current_level = intval($_POST['current_level'] ?? 1);
    $total_xp = intval($_POST['total_xp'] ?? 0);
    $achievements = $_POST['achievements'] ?? '[]';

    // Verificar si existe
    $stmt = $pdo->prepare("SELECT id FROM player_progress WHERE player_name = ?");
    $stmt->execute([$player_name]);

    if ($stmt->fetch()) {
        $stmt = $pdo->prepare("UPDATE player_progress SET current_level = ?, total_xp = ?, achievements = ?, updated_at = NOW() WHERE player_name = ?");
        $stmt->execute([$current_level, $total_xp, $achievements, $player_name]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO player_progress (player_name, current_level, total_xp, achievements, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$player_name, $current_level, $total_xp, $achievements]);
    }

    echo json_encode(['success' => true, 'message' => 'Progress saved successfully']);
}

function getPlayerProgress($pdo)
{
    $player_name = $_GET['player_name'] ?? '';
    if (empty($player_name)) {
        echo json_encode(['success' => false, 'error' => 'Player name required']);
        return;
    }

    $stmt = $pdo->prepare("SELECT * FROM player_progress WHERE player_name = ?");
    $stmt->execute([$player_name]);
    $data = $stmt->fetch();

    if ($data) {
        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'error' => 'No progress found']);
    }
}

function socialLogin($pdo)
{
    $provider = $_POST['provider'] ?? '';
    $providerId = $_POST['provider_id'] ?? '';
    $email = $_POST['email'] ?? '';
    $name = $_POST['name'] ?? 'Player';
    $avatar = $_POST['avatar'] ?? '';

    if (!$provider || !$providerId) {
        echo json_encode(['success' => false, 'error' => 'Missing provider data']);
        return;
    }

    $idColumn = ($provider === 'google') ? 'google_id' : 'facebook_id';

    // 1. Buscar por ID de proveedor
    $stmt = $pdo->prepare("SELECT * FROM player_progress WHERE $idColumn = ?");
    $stmt->execute([$providerId]);
    $user = $stmt->fetch();

    // 2. Si no existe, buscar por email (para fusionar cuentas)
    if (!$user && $email) {
        $stmt = $pdo->prepare("SELECT * FROM player_progress WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user) {
            // Actualizar con ID social
            $updateSql = "UPDATE player_progress SET $idColumn = ?, avatar_url = ? WHERE id = ?";
            $stmt = $pdo->prepare($updateSql);
            $stmt->execute([$providerId, $avatar, $user['id']]);
        }
    }

    // 3. Crear nuevo usuario si no existe
    if (!$user) {
        // Asegurar nombre único
        $baseName = $name;
        $counter = 1;
        while (true) {
            $stmt = $pdo->prepare("SELECT id FROM player_progress WHERE player_name = ?");
            $stmt->execute([$name]);
            if (!$stmt->fetch())
                break;
            $name = $baseName . $counter++;
        }

        $sql = "INSERT INTO player_progress (player_name, $idColumn, email, avatar_url, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$name, $providerId, $email, $avatar]);

        // Obtener usuario creado
        $stmt = $pdo->prepare("SELECT * FROM player_progress WHERE $idColumn = ?");
        $stmt->execute([$providerId]);
        $user = $stmt->fetch();
    }

    echo json_encode([
        'success' => true,
        'user' => [
            'name' => $user['player_name'],
            'email' => $user['email'],
            'avatar' => $user['avatar_url']
        ],
        'progress' => [
            'current_level' => $user['current_level'],
            'total_xp' => $user['total_xp'],
            'achievements' => $user['achievements']
        ]
    ]);
}
?>