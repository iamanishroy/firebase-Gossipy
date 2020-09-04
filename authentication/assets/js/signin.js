function signIn() {
    var email = $('#email').val();
    var pass = $('#pass').val();
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/user-not-found') {
            alert('This email is not registered!!');
        } else if (errorCode == 'auth/wrong-password') {
            alert('Wrong Password!!');
        } else if (errorCode == 'auth/too-many-requests') {
            alert('Too many invalid requests try again later!!');;
        } else {
            alert('Something went wrong!!');
        }
    });
}
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
            window.location.replace('../index.html')
        }
    } else {
        
    }
});