<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получение данных из формы
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Формирование заголовков письма
    $to = 'info@donecode.ru';
    $subject = 'Новая форма от пользователя';
    $headers = "From: $name <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

    // Формирование тела письма
    $body = "<h2>Новая форма от пользователя</h2>";
    $body .= "<p><strong>Имя:</strong> $name</p>";
    $body .= "<p><strong>Номер телефона:</strong> $phone</p>";
    $body .= "<p><strong>Telegram / Почта:</strong> $email</p>";
    $body .= "<p><strong>Сообщение:</strong> $message</p>";

    // Отправка письма
    if (mail($to, $subject, $body, $headers)) {
        echo 'Спасибо! Ваша форма успешно отправлена.';
    } else {
        echo 'Извините, при отправке формы произошла ошибка.';
    }
}
?>
