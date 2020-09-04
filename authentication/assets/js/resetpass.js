function resetPass() {
    var auth = firebase.auth();
    var emailAddress = $('#email').val();
    auth.sendPasswordResetEmail(emailAddress).then(function () {
        alert('We have send you a Reset email to your email.');
        window.location.replace('index.html');
    }).catch(function (error) {
        console.log(error.code)
        if(error.code == 'auth/invalid-email'){
            alert('Invalid Email!!');
        }else if(error.code == ''){
            alert('This email is not registered with us!!');
        }else{
            alert('Some error occured!!');
        }
    });
}