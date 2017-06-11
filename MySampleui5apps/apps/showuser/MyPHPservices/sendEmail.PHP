<?php
require_once 'D:/WAMP/www/swiftmailer-5.x/lib/swift_required.php';

$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
  ->setUsername('mk.johri@gmail.com')
  ->setPassword('#522818081*');

$mailer = Swift_Mailer::newInstance($transport);

$message = Swift_Message::newInstance('Test Subject')
  ->setFrom(array('mk.johri@gmail.com' => 'ABC'))
  ->setTo(array('mk.johri@gmail.com'))
  ->setBody('This is a test mail.');

$result = $mailer->send($message);
?>