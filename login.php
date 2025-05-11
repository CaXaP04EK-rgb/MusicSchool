<?php
require_once('db.php'); // Убедитесь, что этот файл существует и правильно настроен

error_reporting(E_ALL);
ini_set('display_errors', 1);

$email = $_POST['email'];
$pass = $_POST['password'];

// Хешируем пароль для безопасности
$hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

// Используем правильное имя таблицы (без кавычек или с обратными кавычками)
$sql = "INSERT INTO `User` (email, pass) VALUES ('$email', '$hashed_pass')";

if ($conn->query($sql) === TRUE) {
    echo "Новый пользователь успешно создан";
} else {
    echo "Ошибка: " . $conn->error;
}

$conn->close(); // Закрываем соединение