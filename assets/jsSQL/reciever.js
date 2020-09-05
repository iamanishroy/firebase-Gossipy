Pusher.logToConsole = true;
var pusher = new Pusher('fe3a74428b31c6007138', {
    cluster: 'ap2'
});
var channel = pusher.subscribe('my-channel');
channel.bind(userId, function (data) {
    insert(data.uniqId, data.curId, data.userId, data.type, data.message, data.curTime);
    setTimeout(boxSetter(curName, curNo, curId),2000);
    if(sSwitch){
        audiomp3.play();
        audioogg.play();
    }else{
        window.navigator.vibrate(300);
    }
    setTimeout(scrollDown,1000);          
});