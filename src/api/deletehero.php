<?php
$host = "127.0.0.1";
$username = 'joeromine';
$passwd = '9lqJ48^7q$ya';
$dbname = 'heroes';

// Create connection to db
$db = new mysqli($host, $username, $passwd, $dbname);

// If failure report and exit
if ($db->connect_errno) {
    echo "Failed to connect to MySQL: " . $db->connect_error;
    exit();
}

if (isset($_GET['id'])) {

// sql to delete a record
    $sql = "DELETE FROM heroes WHERE id= " . $_GET['id'];

    if ($db->query($sql) === true) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $db->error;
    }

    $db->close();
}