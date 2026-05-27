<?php

class PHP_Email_Form
{
    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $message;
    public $headers;
    public $smtp;

    public function add_message($message, $label = '')
    {
        if ($label) {
            $this->message .= "<p><b>$label:</b> $message</p>";
        } else {
            $this->message .= "<p>$message</p>";
        }
    }

    public function send()
    {
        $this->headers = "MIME-Version: 1.0" . "\r\n";
        $this->headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $this->headers .= "From: " . $this->from_name . " <" . $this->from_email . ">" . "\r\n";

        if ($this->smtp) {

            require_once('PHPMailerAutoload.php');
            $mail = new PHPMailer;
            if ($mail->send()) {
                return true;
            } else {
                return false;
            }
        } else {
            // Use the built-in mail() function for sending mail
            return mail($this->to, $this->subject, $this->message, $this->headers);
        }
    }
}

?>
