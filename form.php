<?php
// Проверяем, была ли отправлена форма ВОТ ЗДЕСЬ ЧТО-ТО НАДО ПОМЕНЯТЬ!
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $typeProject = $_POST["type_project"];
    $statusProject = $_POST["status_project"];
    $startProject = $_POST["start_project"];
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Валидация данных (можно добавить свои правила валидации)
    if (empty($name) || empty($phone) || empty($email) || empty($message)) {
        echo "Пожалуйста, заполните все обязательные поля формы.";
    } else {
        // Адрес, на который будет отправлено письмо
        $to = "info@donecode.ru";
        // Заголовок письма
        $subject = "Новая заявка с сайта";
        // Тело письма
        $body = "Тип проекта: $typeProject\nСтатус проекта: $statusProject\nСтарт проекта: $startProject\nИмя: $name\nТелефон: $phone\nEmail: $email\nСообщение: $message";
        // Отправка письма
        if (mail($to, $subject, $body)) {
            echo "Спасибо! Ваше сообщение отправлено.";
        } else {
            echo "Извините, произошла ошибка при отправке сообщения.";
        }
    }
}
?>