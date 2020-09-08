function changeName() {
    var yourName = prompt("Enter your name if you want to change??");
    yourName = yourName.trim();
    if (yourName != '') {
        userName = yourName;
        $('.personName').text(yourName);
        $('#name').text(yourName);
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: yourName
        }).then(function () {
            firebase.firestore().collection("user").doc(user.uid).update({
                fl:  yourName.charAt(0).toLowerCase(), name: yourName
            });
        }).catch(function (error) { });
    }
}
function saveStatus() {
    if ($('#status').val() != status) {
        var user = firebase.auth().currentUser;
        var status = $('#status').val().trim();
        $('#status').text(status);
        $('#wchat').show();
        $('#userEdit').hide();
        firebase.firestore().collection("user").doc(user.uid).update({
            status: status
        });
    }
}