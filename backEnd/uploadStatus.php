<?php
    include '../dbManager.php';
    $sql = "UPDATE `user` SET `status`= '{$_POST['status']}' WHERE `uid` LIKE '{$_POST['uid']}';";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
?>