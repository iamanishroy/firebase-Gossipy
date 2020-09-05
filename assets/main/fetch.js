function fillTable() {
    db.transaction(function (transaction) {
        transaction.executeSql('DELETE FROM items', undefined, function () {
            var user = firebase.auth().currentUser;
            var database = firebase.database();
            database.ref('chats/' + user.uid).orderByChild('time').once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    insert(childSnapshot.val().uniqId + "", childSnapshot.val().org + "", childSnapshot.val().dest + "", childSnapshot.val().type + "", childSnapshot.val().data + "", childSnapshot.val().time + "");
                });
            });
            // loadIndex();
        }, function (transaction, err) {
            console.log(err);
        });
    });
}