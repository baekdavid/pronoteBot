<?php
    header("Access-Control-Allow-Origin: *");
    
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

    // utf8.
    mysqli_set_charset($conn,"utf8");

    // post 
    $_POST = json_decode(file_get_contents("php://input"), true);
    // $channelName22 = $_POST[channelName];
    // echo "$channelName22";

    if(isset($_POST[channelType]) &&
        isset($_POST[channelId]) &&
        isset($_POST[channelName]) &&
        isset($_POST[guildId]) &&
        isset($_POST[guildName]) &&
        isset($_POST[message]) &&
        isset($_POST[authorId]) &&
        isset($_POST[authorUsername]) &&
        isset($_POST[authorBot]) &&
        isset($_POST[embed]) &&
        isset($_POST[createTime])
    ) {
        $channelType = $_POST[channelType];
        $channelId = $_POST[channelId];
        $channelName = $_POST[channelName];
        $guildId = $_POST[guildId];
        $guildName = $_POST[guildName];
        $message = $_POST[message];
        $authorId = $_POST[authorId];
        $authorUsername = $_POST[authorUsername];
        $authorBot = $_POST[authorBot];
        $embed = $_POST[embed];
        $createTime = $_POST[createTime];
    
        // Table values
        $sql = "INSERT INTO discord_messages (PID, ChannelType, ChannelId, ChannelName, GuildId, GuildName, Message, AuthorId, AuthorUsername, AuthorBot, Embed, CreateTime)
        VALUES (NULL, '$channelType', '$channelId', '$channelName', '$guildId', '$guildName', '$message', '$authorId', '$authorUsername', '$authorBot', '$embed', '$createTime')";
    
        if (mysqli_query($conn,$sql)){
            echo "TableWrite finished: $sql<br/>";
        } else {
            echo "TableWrite failed: " . mysqli_error($conn);
        }
        
    } else {
        echo "InputData not enough";
        exit;
    }

    mysqli_close($conn);
?>