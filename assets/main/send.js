function send(rec, typ, val) {
    firebase.firestore().collection("user").where("id", "==", rec).get().then(function (snap) {
        snap.forEach(function (snapshot) {
            if (!snapshot.data()['blocked'].includes(userId)) {
                var database = firebase.database();
                var user = firebase.auth().currentUser;
                var now = +new Date();
                var uniqId = String.fromCharCode(Math.floor(Math.random() * 26) + 97) + Math.random().toString(16).slice(2) + Date.now().toString(16).slice(4);
                insert(uniqId + "", user.uid + "", rec, typ, val + "", now + "");
                if (sSwitch) {
                    sentmp3.play();
                }
                $.ajax({
                    url: "https://gossipx-server-1.ml/pusher/pusher.php",
                    type: "POST",
                    data: { uniqId: uniqId, to: rec, org: user.uid, type: typ, message: val, time: now },
                    success: function (data) {
                        database.ref('chats/' + uniqId).set({
                            uniqId: uniqId, org: user.uid, dest: rec, type: typ, data: val, time: now
                        });
                    }
                });
            }
        });
    });
}