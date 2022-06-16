# Analytics Dashboard Demo

An analytics dashboard demo that utilizies a free [Bootstrap template](https://startbootstrap.com/theme/sb-admin-2), Charts.js, DataTables, jQuery, PHP and MySQL.

## Live Demo

 - For a live demo, check it out here (https://rw.jddean.com)

## Getting started

- [ ] Clone the repo.
- [ ] Create a `config.php` file in the `includes` directory with the DB information formatted as follows. Update the credentials if needed.
```
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
```
- [ ] Import the included `db.sql` file for the dataset.
- [ ] All done! Navigate to the root of your localhost and explore.