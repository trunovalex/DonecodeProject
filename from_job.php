<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "info@donecode.ru"; // Замените на свой адрес электронной почты
    $vacancy = $_POST["vacancy"];
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $contact = $_POST["contact"];

    $subject = "Отклик на вакансию: " . $vacancy;

    $headers = "From: " . $name . " <" . $contact . ">\r\n";
    $headers .= "Reply-To: " . $contact . "\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    $email_body = "Вакансия: " . $vacancy . "\n\n";
    $email_body .= "Имя: " . $name . "\n\n";
    $email_body .= "Номер телефона: " . $phone . "\n\n";
    $email_body .= "Telegram / Почта: " . $contact;

    if (isset($_FILES['f']) && $_FILES['f']['error'] == UPLOAD_ERR_OK) {
        $file = $_FILES['f']['tmp_name'];
        $file_name = $_FILES['f']['name'];
        $file_size = $_FILES['f']['size'];
        $file_type = $_FILES['f']['type'];

        $file_content = file_get_contents($file);
        $file_content = chunk_split(base64_encode($file_content));

        $attachment = "Content-Type: ".$file_type.";\r\n";
        $attachment .= " name=\"".$file_name."\";\r\n";
        $attachment .= "Content-Transfer-Encoding: base64\r\n";
        $attachment .= "Content-Disposition: attachment;\r\n";
        $attachment .= " filename=\"".$file_name."\"\r\n\r\n";
        $attachment .= $file_content."\r\n";

        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed;\r\n";
        $headers .= " boundary=\"boundary\"\r\n\r\n";
        $email_body = "--boundary\r\n".$email_body."\r\n".$attachment."\r\n";
        $email_body .= "--boundary--\r\n";
    }

    if (mail($to, $subject, $email_body, $headers)) {
        echo "Ваше сообщение успешно отправлено.";
    } else {
        echo "Ошибка при отправке сообщения.";
    }
}
?>