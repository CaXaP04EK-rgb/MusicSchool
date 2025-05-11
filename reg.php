<?php
// Включаем отображение ошибок
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Подключаемся к базе данных
require_once('db.php');

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Неверный метод запроса");
}

// Получаем и проверяем данные
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? 'student'; // Значение по умолчанию
$rememberMe = isset($_POST['rememberMe']) ? 1 : 0;

// Валидация данных
if (empty($email) || empty($password)) {
    die("Email и пароль обязательны для заполнения");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Некорректный формат email");
}

$allowedRoles = ['student', 'teacher', 'admin', 'director'];
if (!in_array($role, $allowedRoles)) {
    die("Недопустимая роль пользователя");
}

// Проверяем, нет ли уже пользователя с таким email
$checkSql = "SELECT id FROM `User` WHERE email = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    die("Пользователь с таким email уже существует");
}
$checkStmt->close();

// Хешируем пароль
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Подготавливаем SQL-запрос для вставки
$sql = "INSERT INTO `User` (email, pass, role, remember_me) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $email, $hashedPassword, $role, $rememberMe);

// Выполняем запрос
if ($stmt->execute()) {
    // Регистрация успешна
    header("Location: login.php?registration=success");
    exit();
} else {
    die("Ошибка регистрации: " . $conn->error);
}

// Закрываем соединения
$stmt->close();
$conn->close();