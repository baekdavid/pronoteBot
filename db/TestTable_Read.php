<?php
    
    $db_host = "localhost";
    $db_user = "baekdavid";
    $db_passwd = "r3a9m2s*";
    $db_name = "baekdavid";

    // MySQL - DB
    $conn = mysqli_connect($db_host,$db_user,$db_passwd,$db_name);
    if (mysqli_connect_errno()){
        echo "MySQL connection failed: " . mysqli_connect_error();
        exit;
    }

    // utf8.
    mysqli_set_charset($conn,"utf8"); 

    // sql
    $sql = "SELECT * FROM discord_messages";
    if ($result = mysqli_query($conn,$sql)){
        $rows = array();
        while($row = mysqli_fetch_array($result)) {
            $rows[] = $row;
        } 
        $qryResult = array();
        $qryResult['discord_messages'] = $rows;
        echo json_encode($qryResult);

        mysqli_close($conn);

    } else {
        echo "sql error: " . mysqli_error($conn);
        exit;
    }
?>