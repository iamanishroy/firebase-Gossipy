function send(val) {
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var now = +new Date();
    var uniqId = String.fromCharCode(Math.floor(Math.random() * 26) + 97) + Math.random().toString(16).slice(2) + Date.now().toString(16).slice(4);
    insert(uniqId + "", user.uid + "", 'dest' + "", '1', val + "", now + "");
    // if (sSwitch) {
    //     sentmp3.play();
    // }
    $.ajax({
        url: "https://gossipx-server-1.ml/pusher/pusher.php",
        type: "POST",
        data: { uniqId: uniqId, to: curId, org: userId, type: 1, message: val, time: now },
        success: function (data) {
            database.ref('chats/' + user.uid + '/' + uniqId).set({
                uniqId: uniqId, org: 'gossipy', dest: user.uid, type: 1, data: val, time: now
            });
        }
    });
}