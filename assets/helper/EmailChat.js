function EmailChat() {
    var cht = prompt('Enter "' + curName + '" to get Email of chats of this User');
    cht = cht.trim();
    if (cht === curName) {
        emUser = curId;
        emName = curName
        var dbb = openDatabase("itemDB", "1.0", "itemDB", 65535);
        dbb.transaction(function (transaction) {
            var sql = "SELECT * FROM items WHERE origin = '" + emUser + "' OR destination = '" + emUser + "' ORDER BY rowid";
            transaction.executeSql(sql, undefined, function (transaction, result) {
                if (result.rows.length) {
                    var eml = "<h2>";
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        var dborigin = row.origin;
                        var dbdata = row.data;
                        if (userId != dborigin) {
                            eml += "<b style='color: blue;'>" + emName + "</b> => " + dbdata + "<br>";
                        } else {
                            eml += "<b>You</b> => " + dbdata + "<br>";
                        }
                    }
                    eml += "</h2><br><br>Thank You,<br>Your Gossipy Team"
                    Email.send({
                        SecureToken: '119525f6-af80-4e4c-9e85-8245cad29b62',
                        From: 'verify.gossipy@gmail.com',
                        To: usEmail,
                        Subject: 'Email of ' + curName + ' chats',
                        Body: eml
                    }).then(
                        message => {
                            alert("We have sent the Email. You can check your email for the same...");
                        }
                    );
                } else {
                    alert('No chat to send from user ' + curName);
                }
            })
        })
    }
}