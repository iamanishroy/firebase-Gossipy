function fillTable() {
    var chats = new Array();
    var user = firebase.auth().currentUser;
    var database = firebase.database();
    database.ref('chats').orderByChild('dest').equalTo(user.uid).once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            chats.push(childSnapshot.val());
        });
        database.ref('chats').orderByChild('org').equalTo(user.uid).once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                chats.push(childSnapshot.val());
            });
        });
    });
    
    setTimeout(function () {
        db.transaction(function (transaction) {
            transaction.executeSql('DELETE FROM items', undefined, function () {
                chats = chats.sort(function (a, b) {
                    return a.time - b.time;
                });
                chats.forEach(function(cur){
                    insert(cur.uniqId + "", cur.org + "", cur.dest + "", cur.type + "", cur.data + "", cur.time + "");
                    // console.log(cur.time)
                });
            }, function (transaction, err) {
                console.log(err);
            });
        });
        
    }, 1000);
}

/*
function fillTable() {
    db.transaction(function (transaction) {
        transaction.executeSql('DELETE FROM items', undefined, function () {
            var user = firebase.auth().currentUser;
            var database = firebase.database();
            database.ref('chats').orderByChild('time').once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    if (!childSnapshot.val().uniqId != true) {
                        insert(childSnapshot.val().uniqId + "", childSnapshot.val().org + "", childSnapshot.val().dest + "", childSnapshot.val().type + "", childSnapshot.val().data + "", childSnapshot.val().time + "");
                    }
                });
            });
        }, function (transaction, err) {
            console.log(err);
        });
    });
}
*/