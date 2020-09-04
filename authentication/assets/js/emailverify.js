function verifyEmail(email) {
    var email = $('#email').val();
    var pin = Math.floor(100000 + Math.random() * 900000);
    var database = firebase.database();
    var unique_email = true;
    database.ref('emailVerify').orderByChild("email").equalTo(email).once('value', function (snapshot) {
        snapshot.forEach(function (childSnpshot) {
            unique_email = false;
        });
        if (unique_email) {
            var t = new Date().getTime();
            database.ref('emailVerify/' + t).set({ email: email, pin: pin });
            Email.send({
                SecureToken: '119525f6-af80-4e4c-9e85-8245cad29b62',
                From: 'verify.gossipy@gmail.com',
                To: email,
                Subject: 'mimify Email Verification',
                Body: 'Your 6-digit pin is - ' + pin
            }).then(
                message => {
                    pin = 0;
                    if (confirm("We have sent a 6-digit pin to your email! Please check it...")) {
                        window.location.replace('register2.html?un=' + t + '&email=' + email);
                    } else {
                        window.location.replace('index.html');
                    }
                }
            );
        } else {
            alert('This Email is Already Registered!!');
            window.location.replace('index.html');
        }
    });
}
