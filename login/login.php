<?php 
    include('header.php');
?>
    <link rel ="stylesheet" href="style.css">
    <div class="container">
        <form action="logincode.php" method="POST">
            <h2 align="center">Login</h2>
            <?php 
                session_start();
                if(isset($_SESSION['status']))
                {
            ?>
                <div class="alert alert-success">
                    <h5><?= $_SESSION['status']; ?><h5>
                </div>
                <?php
                    unset($_SESSION['status']);
                }
                ?>
            <div class="card">
            <div class="from-group">
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="from-group">
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" required>
            </div>
            
            <div class="from-group">
                <input type="submit" name="submit" value="Login">
            </div>
            </div>
        </form>
    </div>    
<?php 
    include('end.php'); 
?>