<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '/xampp/htdocs/PHPMailer/src/Exception.php';
require '/xampp/htdocs/PHPMailer/src/PHPMailer.php';
require '/xampp/htdocs/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Пожалуйста, заполните форму корректно.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.yandex.ru';
        $mail->SMTPAuth = true;
        $mail->Username = 'infoprivatehouse@yandex.ru'; // Ваш email на Яндексе
        $mail->Password = 'jihcsurhspdvtfql'; // Пароль приложения
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        
        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->Encoding = 'base64';

        $mail->setFrom('infoprivatehouse@yandex.ru', 'Частные Дома');
        $mail->addAddress('infoprivatehouse@yandex.ru');

        // Отправка письма администратору с данными из формы
        $mail->isHTML(false);
        $mail->Subject = "Новое сообщение с вашего сайта от $name";
        $mail->Body = "Имя: $name\nEmail: $email\n\nСообщение:\n$message\n";
        $mail->send();

        // Отправка письма с благодарностью пользователю
        $mail->clearAddresses(); // Очищаем адресатов
        $mail->addAddress($email); // Добавляем адрес пользователя
        $mail->Subject = "Благодарим за обращение, $name!";
        $mail->Body = "Уважаемый(ая) $name,\n\nСпасибо за ваше обращение! Мы свяжемся с вами в ближайшее время.\n\nС уважением,\nКоманда Частные Дома";

        if ($mail->send()) {
            http_response_code(200);
            echo "Спасибо! Ваше сообщение успешно доставлено.";
        } else {
            http_response_code(500);
            echo "Ошибка при отправке сообщения пользователю: " . $mail->ErrorInfo;
        }

    } catch (Exception $e) {
        http_response_code(500);
        echo "Ошибка при отправке сообщения администратору: " . $e->getMessage();
    }
}
?>



