<?php
    session_start();
    include ('conn.php');
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/autoload.php';
    //email verify

    function sendemail_verify($username, $email, $verify_token)
    {
        
        $mail = new PHPMailer(true);

        $mail->SMTPDebug = 2;
        $mail->isSMTP();
        $mail->SMTPAuth = true;

        $mail->Host = "smtp.gmail.com";
        $mail->Username = "yuvrajsolanki2809@gmail.com";
        $mail->Password = "utgbjablpeouyzxx";

        $mail->SMTPSecure = "tls";
        $mail->Port = 587;

        $mail->setFrom("yuvrajsolanki2809@gmail.com", "SoleTurner");
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = "Email Verification from ......";

        $email_template = "
            <h2>Welcome to Soleturner</h2>
            Here you get all the information about watches and shoes, like how they were created and what was real motive behind it. We promise you that all the information you find here will enlighten your taste towards these watches and shoes. 
            Thanks for joining...          
            <h5>Verify your email address to Login with the below given link</h5>
            <br/><br/>
            <a href = 'http://localhost:3000/verify.php?token=$verify_token'>Click Me </a>
        ";

        $mail->Body = $email_template;
        $mail->send();
        echo 'Message has been sent';
    }


    //batabase insert
    if(isset($_POST['submit']))
    {
        $username = $_POST["username"];
        $email = $_POST["email"];
        $phonenumber = $_POST["phonenumber"]; 
        $password = $_POST["password"];
        $gender = $_POST["gender"];
        $city = $_POST["city"];
        $birthdate = $_POST["birthdate"];
        $verify_token = md5(rand());


        $check_email_query = "SELECT email FROM register WHERE email='$email' LIMIT 1 ";
        $check_email_query_run = mysqli_query($conn, $check_email_query);

        if(mysqli_num_rows($check_email_query_run) > 0)
        {
            $_SESSION['status'] = "Eamil id already Exists";
            header( "Location: registration.php" );
        }
        else
        {
            $query = "INSERT INTO register (username, email, phonenumber, password, gender, city, birthdate, verify_token) VALUE('$username', '$email', '$phonenumber', '$password', '$gender', '$city', '$birthdate', '$verify_token')";
            $query_run = mysqli_query($conn, $query);

            if($query_run)
            {
                sendemail_verify("$username", "$email", "$verify_token");

                $_SESSION['status'] = "Registration Successfull.! Please verify your Email Address.";
                header( "Location: registration.php" );
            }
            else
            {
                $_SESSION['status'] = "Registration Failed";
                header( "Location: registration.php" );
            }
        }
    }
?> 