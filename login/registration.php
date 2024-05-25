<?php 
    include('header.php'); 
    
?>
<link rel ="stylesheet" href="style.css">
<div class="container">
    <div class="card">
            <h2>Registration Form</h2>
             <?php 
                session_start();
                if(isset($_SESSION['status']))
                {
            ?>
                <div class="alert alert-success">
                    <h5><?= $_SESSION['status']; ?>
                </div>
                <?php
                    unset($_SESSION['status']);
                }
                ?>
                
            
            
                <form action="process registration.php" method="post">
                    <div class="form-group">
                        <label for="username">User Name</label>
                        <input type="text" name="username" required><br>
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" required><br>
                    </div>

                    <div class="form-group">
                        <label for="phonenumber">Phone Number</label>
                        <input type="tel"  id="phone" name="phonenumber" pattern="[0-9]{10}" title="Please enter a 10-digit phone number" required><br>
                    </div>

                    <div class="form-group">        
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required><br>
                    </div>

                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <select name="gender" required>
                            <option value="">Select Gender</option>
                            <option value="male" value="Male">Male</option>
                            <option value="female" value="Female">Female</option>
                            <option value="other" value="">Other</option>
                        </select><br>
                    </div>

                    <div class="form-group">
                        <label for="city">City</label>
                        <input type="text" name="city" required><br>
                    </div> 

                    <div class="form-group">
                        <label for="birthdate">Birth Date</label>
                        <input type="date" name="birthdate" required><br>
                    </div>

                    <!-- Buttons -->
                    <div class="form-group">
                        <input type="submit" name="submit" value="Submit">
                        <input type="button" value="Cancel" onclick="window.location.href='main page.php';">
                        <input type="button" value="Refresh" onclick="location.reload();">
<?php include('end.php'); ?>