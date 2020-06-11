<?php
    // https://have-fun.tistory.com/entry/DB데이터-삽입-수정-삭제
    $db_host = "localhost";
    $db_user = "baekdavid";
    $db_passwd = "r3a9m2s*";
    $db_name = "baekdavid";

    // MySQL - DB 
    $conn = mysqli_connect($db_host,$db_user,$db_passwd,$db_name);
    if (mysqli_connect_errno()){
        echo "MySQL connection failed: " . mysqli_connect_error();
        exit;
    } else {
        echo "DB : \"$db_name\"connected<br/>";
    }

    $sql = "CREATE TABLE discord_messages
            (
                PID bigint(20) unsigned not null auto_increment,

                ChannelType CHAR(255) COMMENT 'Channel type',
                ChannelId CHAR(255) COMMENT 'Channel ID',
                ChannelName CHAR(255) COMMENT 'Channel Name',
                
                GuildId CHAR(255) COMMENT 'Guild ID',
                GuildName CHAR(255) COMMENT 'Guild Name',

                Message LONGTEXT COMMENT 'Message',

                AuthorId CHAR(255) COMMENT 'Writor ID',
                AuthorUsername CHAR(255) COMMENT 'Writor Name',
                AuthorBot tinyint(1) DEFAULT '1' COMMENT 'Assistant On',

                Embed tinyint(1) DEFAULT '1' COMMENT 'Assistant On',

                CreateTime CHAR(255) COMMENT 'Sent on',

                PRIMARY KEY(PID)
            ) charset=utf8";

    if (mysqli_query($conn,$sql)){
        echo "Table created<br/>";
    } else {
        echo "Table not created: " . mysqli_error($conn);
        exit;
    }
?>
