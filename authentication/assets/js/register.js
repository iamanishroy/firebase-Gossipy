const un = urlParams.get('un');
function signUp() {
    var database = firebase.database();
    const email = $('#email').val();
    const pass = $('#pass').val();
    const pin = $('#pin').val();
    if (pass.length > 5) {
        firebase.database().ref('emailVerify/' + un).on('value', function (snapshot) {
            if (snapshot.val().pin == pin) {
                const auth = firebase.auth();
                const promise = auth.createUserWithEmailAndPassword(email, pass);
                promise.then(t => {
                    var user = firebase.auth().currentUser;
                    database.ref('users/' + user.uid).set({
                        id: user.uid , fl: email.charAt(0).toLowerCase(), email: email, name: email.split('@')[0], image: 'assets/assets/images/user2.png', status: '' 
                    });
                    user.updateProfile({
                        displayName: email.split('@')[0],
                        photoURL: 'assets/assets/images/user2.png',
                    }).then(function () {
                        var uniqId = String.fromCharCode(Math.floor(Math.random() * 26) + 97) + Math.random().toString(16).slice(2) + Date.now().toString(16).slice(4);
                        database.ref('chats/' + uniqId).set({
                            uniqId: uniqId ,org: 'gossipy', dest: user.uid, type: 1, data: 'Welcome to Gossipy', time: +new Date()
                        }).then(function () {
                            alert("Your Account is Successfully Created!! Have Fun!! :-)");
                            window.location.replace('../index.html');
                        })
                    }).catch(function (error) { });
                });
                promise.catch(e => alert(e.message));
            } else {
                alert("You have Entered a wrong pin!!");
                $('#resend').show();
            }
        });
    } else {
        alert("Password should be at least 6-character long!!");
    }
}
function resend() {
    var pin = Math.floor(100000 + Math.random() * 900000);
    var database = firebase.database();
    database.ref('emailVerify/' + un).remove();
    database.ref('emailVerify/' + un).set({ email: $('#email').val(), pin: pin });
    Email.send({
        SecureToken: '119525f6-af80-4e4c-9e85-8245cad29b62',
        From: 'verify.gossipy@gmail.com',
        To: email,
        Subject: 'mimify Email Verification',
        Body: 'Your 6-digit pin is - ' + pin
    }).then(
        message => {
            pin = 0;
            alert("We have sent a 6-digit pin to your email! Please check it...");
            $('#resend').hide();
        }
    );
}
