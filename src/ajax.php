<?php
    $subject = 'Заявка с сайта';
    $mess = '';
    $mess .= '<hr>';
    if(isset($_POST['info'])) {
        $subject = $_POST['info'];
    }
    if(isset($_POST['company'])) {
        $company = substr(htmlspecialchars(trim($_POST['company'])), 0, 100);
        $mess .= '<b>Имя компании:</b>' . $company . '<br>';
    }
    if(isset($_POST['inn'])) {
        $inn = substr(htmlspecialchars(trim($_POST['inn'])), 0, 100);
        $mess .= '<b>ИИН:</b>' . $inn . '<br>';
    }
    if(isset($_POST['contact_name'])) {
        $name = substr(htmlspecialchars(trim($_POST['contact_name'])), 0, 100);
        $mess .= '<b>Имя:</b>' . $name . '<br>';
    }
    if(isset($_POST['phone'])) {
        $tel = substr(htmlspecialchars(trim($_POST['phone'])), 0, 100);
        $mess .= '<b>Телефон:</b>' . $tel . '<br>';
    }
    if(isset($_POST['email'])) {
        $email = substr(htmlspecialchars(trim($_POST['email'])), 0, 100);
        $mess .= '<b>Почта:</b>' . $email . '<br>';
    }
    if(isset($_POST['loth'])) {
        $loth = substr(htmlspecialchars(trim($_POST['loth'])), 0, 100);
        $mess .= '<b>Номер лота:</b>' . $loth . '<br>';
    }
    $mess .= '<hr>';

    require 'class.phpmailer.php';
    $mail = new PHPMailer();
    $mail->AddAddress('ssv@aplan.ru','');
    $mail->AddAddress('utushkin.project@gmail.com','');
    $mail->IsHTML(true);                        // выставляем формат письма HTML
    $mail->Subject = $subject; // тема письма
    $mail->CharSet = "UTF-8";                   // кодировка
    $mail->Body = $mess;
    if(isset($_FILES['file'])) {
            if($_FILES['file']['error'] == 0){
            $mail->AddAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
        }
    }
    // отправляем наше письмо
    if (!$mail->Send()){
        die ('Mailer Error: ' . $mail->ErrorInfo);
        $mail->ErrorInfo;
    }else{
        echo 'true';
    }?>