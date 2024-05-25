<?php
    session_start();
    include ('conn.php');

    if(isset($_POST['submit']))
    {
        if(!empty(trim($_POST["email"])) && !empty(trim($_POST["password"])))
        {
            $email = mysqli_real_escape_string($conn, $_POST["email"]);
            $password = mysqli_real_escape_string($conn, $_POST["password"]);  

            $sql = "SELECT * FROM register WHERE email = '$email' AND  password = '$password' LIMIT 1 ";
            $sql_run = mysqli_query($conn, $sql);
            
            if(mysqli_num_rows($sql_run) > 0)
            {
                $row = mysqli_fetch_array($sql_run);
                
                if($row['verify_status'] == "1")
                {
                    $_SESSION['authenticated'] = true;
                    $_SESSION['auth_user'] = [
                     
                    ];

                    $_SESSION['status'] = "You are Logged in successfully.";
                    header("Location: src/app/page.js");
                    exit(0);
                }
                else
                {
                    $_SESSION['status'] = "Please Verify your Email Address to Login";
                    header("Location: login.php");
                    exit(0);
                }
            }   
            else
            {
                $_SESSION['status'] = "inviled email or password";
                header("Location: login.php");
                exit(0);
            }
        }
        else
        {
            $_SESSION['status'] = "all fields are mandetory";
            header("Location: login.php");
            exit(0);
        }

    }

?>