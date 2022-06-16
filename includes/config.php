<?php

$DB_servername = "localhost";
$DB_username = "root";
$DB_password = "root";
$DB_name = "readyworks";
$DB_port = '3306';
$db_conn = new mysqli($DB_servername, $DB_username, $DB_password, $DB_name, $DB_port);

// SQL server connection information
$sql_details = array(
    'user' => $DB_username,
    'pass' => $DB_password,
    'db'   => $DB_name,
    'host' => $DB_servername
);
        
?>