<?php
$conn = new mysqli("127.0.0.1:3306", "username", "password", "RegisterUser");
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}