<?php
// Initialize the session.
// If you are using session_name("something"), don't forget it now!
session_start();

// If it's desired to kill the session, also delete the session cookie.
// Note: This will destroy the session, and not just the session data!
if (isset($_COOKIE['user'])) {
    setcookie('user', '', time()-42000, '/');
    setcookie('token', '', time()-42000, '/');
}

// Finally, destroy the session.
session_destroy();
$redirect = "http://bimore.com.br:8080/every/admin/";
header("location:$redirect");
?>
