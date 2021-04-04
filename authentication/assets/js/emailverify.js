function verifyEmail() {
  var email = $("#email").val();
  $("#changeBtnOnClick").text("Verifying...");
  var pin = Math.floor(100000 + Math.random() * 900000);
  var database = firebase.database();
  var unique_email = true;
  database
    .ref("emailVerify")
    .orderByChild("email")
    .equalTo(email)
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnpshot) {
        unique_email = false;
      });
      if (unique_email) {
        var t = new Date().getTime();
        database.ref("emailVerify/" + t).set({ email: email, pin: pin });
        var link =
          "https://gossipy.ml/authentication/register2.html?un=" +
          t +
          "&email=" +
          email;
        mail({
          To: email,
          Subject: "Gossipy Email Verification",
          Body: verifyTemplate
            .replace("<<pin>>", pin)
            .replace("<<link>>", link),
        }).then((res) => {
          pin = 0;
          if (JSON.parse(res).status == "sent") {
            if (
              confirm(
                "We have sent a 6-digit pin to your email! Please check it..."
              )
            ) {
              window.location.replace(
                "register2.html?un=" + t + "&email=" + email
              );
            } else {
              window.location.replace("index.html");
            }
          } else {
            alert(
              "We are facing an issue with our mail server please try again later"
            );
          }
        });
      } else {
        alert("This Email is Already Registered!!");
        window.location.replace("index.html");
      }
    });
}
