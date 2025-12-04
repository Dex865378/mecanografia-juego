-- Script SQL para crear las tablas necesarias en tu base de datos
-- Ejecuta este script en phpMyAdmin (https://php-myadmin.net/)

-- Tabla para almacenar puntuaciones
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

-- Tabla para almacenar el progreso del jugador
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

-- Tabla para almacenar configuraciones del jugador
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

-- Insertar datos de ejemplo (opcional)
INSERT INTO `scores` (`player_name`, `mode`, `score`, `wpm`, `accuracy`, `level`, `created_at`) VALUES
('Player1', 'classic', 1500, 85, 95.50, 5, NOW()),
('Player2', 'versus-ai', 2000, 92, 98.20, 7, NOW()),
('Player3', 'survival', 1200, 78, 93.10, 4, NOW());
