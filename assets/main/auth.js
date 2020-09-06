var userName, userId, userimg;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
            userId = user.uid;
            userName = user.displayName;
            userimg = user.photoURL;
            $('#userImgChanged').attr('src', userimg);
            $('.personName').text(userName);
            setter();
            Pusher.logToConsole = false;
            var pusher = new Pusher('fe3a74428b31c6007138', {
                cluster: 'ap2'
            });
            var channel = pusher.subscribe('my-channel');
            channel.bind(userId, function (data) {
                insert(data.uniqId, data.curId, data.userId, data.type, data.message, data.curTime);
                setTimeout(boxSetter(curName, curNo, curId),1500);
                if (sSwitch) {
                    audiomp3.play();
                    audioogg.play();
                } else {
                    window.navigator.vibrate(300);
                }
                setTimeout(scrollDown, 1000);
            });
        }
    } else {
        window.location.replace("authentication/index.html");
    }
});
function logout() {
    db.transaction(function (transaction) {
        transaction.executeSql('DROP TABLE items', undefined, function () {
            firebase.auth().signOut();
        }, function (transaction, err) {
            console.log(err);
        });
    });
}