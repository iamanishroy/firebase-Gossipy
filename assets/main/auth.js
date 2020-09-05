firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
            userId = user.uid;
            var userName = user.displayName;
            var userimg = user.photoURL;
            setInterval(loadIndex, 1000);
            // loadIndex()
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