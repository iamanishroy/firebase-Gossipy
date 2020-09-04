<?php
    if(isset($_POST["image"])){
        $data = $_POST["image"];        
        $image_array_1 = explode(";", $data);
        $image_array_2 = explode(",", $image_array_1[1]);
        $data = base64_decode($image_array_2[1]);
        $imageName = uniqid() . '.png';
        file_put_contents('../user/'.$imageName, $data);
        include '../dbManager.php';
        $sql = "UPDATE `user` SET `image`= '../user/{$imageName}' WHERE `uid` LIKE '{$_POST['uid']}';";
        mysqli_query($conn, $sql);
        mysqli_close($conn);
        echo '../user/' . $imageName;
    }
?>