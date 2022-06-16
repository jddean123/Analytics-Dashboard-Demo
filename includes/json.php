<?php

require("config.php");

    if ($db_conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
    }

if (isset($_GET['cmd'])) { $cmd = $_GET['cmd']; } else { $cmd = null; }
if (isset($_GET['metric'])) { $metric = $_GET['metric']; } else { $metric = null; }
if (isset($_GET['operator'])) { $operatorFlag = $_GET['operator']; } else { $operatorFlag = null; }

if ($cmd == "MigrationPie" || $cmd == "PCsbyOS" || $cmd == "Top10PCModels" || $cmd == "Department" || $cmd == "Windows10Versions" || $cmd == "PCLocationArea") {
    
        $column = "";
        $where = "";
        $order = "count(*)";
        $limit = "";
    
    if ($cmd == "MigrationPie") {
        $column = "migration_status";
    } else if ($cmd == "PCsbyOS") {
        $column = "operating_system";
    } else if ($cmd == "PCLocationArea") {
        $column = "location";
    } else if ($cmd == "Top10PCModels") {
        $column = "computer_model";
        $limit = "LIMIT 10";
    } else if ($cmd == "Department") {
        $column = "department";
    } else if ($cmd == "Windows10Versions") {
        $column = "windows_10_version";
        $where = "WHERE operating_system = 'Windows 10'";
        $order = "windows_10_version";
    }
    
    $Data = "SELECT ".$column.", count(*) FROM computer ".$where." GROUP BY ".$column." ORDER BY ".$order." DESC ".$limit.";";
    
    $Data = $db_conn->query($Data);
    $dataArray = array("labels" => array(), "dataPoints" => array());
            $Data = $Data->fetch_all();
    foreach ($Data as $result) {
            $dataArray["labels"][] = $result[0];
            $dataArray["dataPoints"][] = $result[1];
    }
    
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($dataArray);

} else if ($cmd == "BasicCount" && $metric != null) {
    $operator = "="; //default operator
    
    if ($metric == "Windows10") { $lookup = "Windows 10"; $column = "operating_system"; }
    else if ($metric == "Windows10Version") { $lookup = "1909"; $column = "windows_10_version"; }
    else if ($metric == "Migrated") { $lookup = "Migrated"; $column = "migration_status"; }
    else if ($metric == "Spares") { $lookup = "SPARE"; $column = "name";  }
    else if ($metric == "RAM16") { $lookup = "16"; $column = "memory_gb";  }
    else { $lookup = null; $column = null; }
    
    if ($operatorFlag == "LIKE") { $operator = "LIKE"; $lookup = "%".$lookup."%"; }
    else if ($operatorFlag == "dne") { $operator = "!="; }
    else if ($operatorFlag == "lt") { $operator = "<"; }
    
    if ($lookup != null && $column != null) {
        $Data = "SELECT COUNT(".$column.") AS Count FROM computer WHERE `".$column."` ".$operator." '".$lookup."';";
        $Total = "SELECT COUNT(*) as Total FROM computer;";

        $Data = $db_conn->query($Data);
        $Total = $db_conn->query($Total);
        $dataArray = array("dataPoints" => array());
                $Data = $Data->fetch_assoc();
                $Total = $Total->fetch_assoc();
                $dataArray["dataPoints"]["Count"] = $Data["Count"];
                $dataArray["dataPoints"]["Total"] = $Total["Total"];
                $Percentage = ( $Data["Count"] / $Total["Total"] ) * 100;
                $dataArray["dataPoints"]["Percentage"] = $Percentage;

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($dataArray);
    }

} else  {
    //Returns info for DataTables
    if ($metric == "columns") {
        
        $ColumnsData = "SHOW COLUMNS FROM computer;";
        $ColumnsData = $db_conn->query($ColumnsData);
        $ColumnsData = $ColumnsData->fetch_all();
        $columns = array();
        $count = 0;
        foreach ($ColumnsData as $Column) {
            //$columns["columns"][$count]["mData"] = $Column[0];
            $columns["columns"][$count]["data"] = $Column[0];
            $columns["columns"][$count]["title"] = $Column[0];
            $count++;
        }
        
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($columns);
        
    } else {
    
        $ColumnsData = "SHOW COLUMNS FROM computer;";
        $ColumnsData = $db_conn->query($ColumnsData);
        $ColumnsData = $ColumnsData->fetch_all();
        $columns = array();
        $count = 0;
        foreach ($ColumnsData as $Column) {
            $columns[] = array("db" => $Column[0], "dt" => $count);
            $count++;
        }
        //print_r(json_encode($columnsArray));

        $primaryKey = 'id';
        $table = 'computer';

        require( 'ssp.class.php' );
        
        header('Content-Type: application/json; charset=utf-8');

        echo json_encode(
            SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
        );
    }
    
    /**
    $Data = "SELECT computer_model, count(*) FROM computer GROUP BY computer_model ORDER BY count(*) DESC LIMIT 10;";
    
    $Data1 = $db_conn->query($Data1);
    $dataArray = array("labels" => array(), "dataPoints" => array());
            $Data1 = $Data1->fetch_all();
    foreach ($Data1 as $result) {
            $dataArray["labels"][] = $result[0] . " (".$result[1].")";
            $dataArray["dataPoints"][] = $result[1];
    }
    
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($dataArray);
    **/
    
}



?>