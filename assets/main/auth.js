var userName, userId, userimg, status, usEmail, uVis = false;
var userBlockList = new Array();
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
            userId = user.uid;
            firebase.database().ref('presence/' + userId).set({
                online: true, time: +new Date()
            });
            userName = user.displayName;
            userimg = user.photoURL;
            $('#userImgChanged').attr('src', userimg);
            $('.personName').text(userName);
            sessionStorage.clear();
            setter();
            $('#imgTrigger').attr('src', userimg);
            $('#name').text(userName);
            usEmail = user.email;
            $('#userCode').text(usEmail);
            firebase.firestore().collection("user").where("id", "==", user.uid).get()
                .then(function (snap) {
                    snap.forEach(function (snapshot) {
                        status = snapshot.data()['status'];
                        userBlockList = snapshot.data()['blocked'];
                        uVis = snapshot.data()['visibility'];
                        if (uVis) {
                            $('#vis').html('<input type="checkbox" id="visibilityToogle" checked><span class="slider round"></span>');
                        } else {
                            $('#vis').html('<input type="checkbox" id="visibilityToogle"><span class="slider round"></span>');
                        }
                        $('#status').text(status);
                        $('#visibilityToogle').click(function () {
                            if (uVis) {
                                uVis = false;
                            } else {
                                uVis = true;
                            }
                            firebase.firestore().collection("user").doc(user.uid).update({
                                visibility: uVis
                            });
                        });
                    });
                });
            Pusher.logToConsole = false;
            var pusher = new Pusher('fe3a74428b31c6007138', {
                cluster: 'ap2'
            });
            var channel = pusher.subscribe('my-channel');
            channel.bind(userId, function (data) {
                db.transaction(function (transaction) {
                    var sql = "INSERT INTO items(chatId, origin, destination, type, data, time) VALUES(?,?,?,?,?,?)";
                    transaction.executeSql(sql, [data.uniqId, data.curId, data.userId, data.type, data.message, data.curTime], function () {
                        boxSetter(curName, curNo, curId);
                        if (sSwitch) {
                            audiomp3.play();
                            audioogg.play();
                        } else {
                            window.navigator.vibrate(300);
                        }
                        setTimeout(scrollDown, 200);
                    });
                });
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