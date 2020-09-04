<?php
    include '../dbManager.php';
    $data = "";
    $sql = "SELECT `uid`, `name`, `image`  FROM `user` WHERE `verified` = '1' AND `uid` <> '{$_POST['user']}' AND (`name` LIKE '{$_POST['data']}%' OR `uid` LIKE '{$_POST['data']}%');";
    $result = mysqli_query($conn, $sql);
    mysqli_close($conn);
    while($res = mysqli_fetch_array($result)){
        $data .= "^{$res['0']}^{$res['1']}|";
        $data .= "<div class='noti flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4'><div class='p-4 md:w-1/3 md:mb-0 mb-6 flex'>";
        $data .= "<div class='w-16 h-16 inline-flex items-center justify-center rounded-full text-red-500 mb-4 flex-shrink-0'>";
        $data .= "<img alt='blog' src='{$res['2']}' class='rounded-full flex-shrink-0 object-cover object-center'";
        $data .= "style='height: 4.5rem; width: 4.5rem; margin-top: 16px;'></div><div class='flex-grow pl-6'>";
        $data .= "<h2 class='text-gray-900 text-lg title-font font-medium mb-2' style='margin-bottom: 0; margin-top: 1px;'>{$res['1']}</h2>";
        $data .= "<p class='leading-relaxed text-gray-600'>{$res['0']}</p>";
        $data .= "<button onclick=".'"'. "sayHi('{$res['0']}', '{$res['2']}', '{$res['1']}')".'"'." class='cl bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'>";
        $data .= "Say hi to Gossip</button></div></div></div>|";
    }
    echo $data;
?>


