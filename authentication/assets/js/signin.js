function signIn() {
    $('#changeBtnOnClick').text('Singing In...');
    var email = $('#email').val();
    var pass = $('#pass').val();
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/user-not-found') {
            alert('This email is not registered!!');
            $('#changeBtnOnClick').text('Sign In');
        } else if (errorCode == 'auth/wrong-password') {
            alert('Wrong Password!!');
            $('#changeBtnOnClick').text('Sign In');
        } else if (errorCode == 'auth/too-many-requests') {
            alert('Too many invalid requests try again later!!');;
            $('#changeBtnOnClick').text('Sign In');
        } else {
            alert('Something went wrong!!');
            $('#changeBtnOnClick').text('Sign In');
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