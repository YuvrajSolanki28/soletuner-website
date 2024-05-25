<?php
session_start();
include('conn.php');

if(isset ( $_GET['token']))
{
    $token = $_GET['token'];
    $verfiy_query = "SELECT verify_token, verify_status FROM register WHERE verify_token='$token' LIMIT 1";
    $verfiy_query_run = mysqli_query($conn, $verfiy_query);

    if(mysqli_num_rows($verfiy_query_run) > 0)
    {
        $row = mysqli_fetch_array( $verfiy_query_run );
        if($row['verify_status'] =="0")
        {
            $clicked_token = $row['verify_token'];
            $update_query = "UPDATE register SET verify_status= 1 WHERE verify_token='$clicked_token' LIMIT 1";
            $update_query_run = mysqli_query($conn, $update_query);

            if($update_query_run)
            {
                $_SESSION['status'] = "Your Account has been verified Successfully.!";
                header("Location: login.php");
                exit(0);
            }
            else
            {
                $_SESSION['status'] = "Verification Failed.!";
                header("Location:  login.php");
                exit(0);
            }
        }
        else
        {
            $_SESSION['status'] = "Email Already Verified. Please Login";
            header("Location: login.php");
        }
    }
    else
    {
        $_SESSION['status']= "This Token Does not Exists";
        header("Location: registration.php");
    }
}
else
{
    $_SESSION['status'] = "not Allowed";
    header("Location: login.php");
}

?>