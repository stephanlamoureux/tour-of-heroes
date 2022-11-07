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
    $sql_stmt = "SELECT id, name FROM heroes WHERE id=?";
    $stmt = $db->prepare($sql_stmt);
    $stmt->bind_param("i", $_GET['id']);

    // Execute query
    $stmt->execute();
    if ($stmt->fetch()) {
        return $result;
    }

    // Loop over results
    $array = [];

    while ($row = $result->fetch_assoc()) {
        array_push($array, $row);
    }

    // Close connection to database
    $db->close();

    // Display fetched data in JSON
    echo json_encode($array);
}
