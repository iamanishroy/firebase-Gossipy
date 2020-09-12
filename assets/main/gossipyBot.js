randcount = 0;
function gossipy(msg) {
    // console.log(message)
    // firebase.database().ref('questions/' + userId + '==>' + userName).set({
    //     msg: message
    // });
    // console.log(getMsg(message));
    insert(++randcount + "", userId + "", 'gossipy', 1, msg + "", +new Date() + "");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://acobot-brainshop-ai-v1.p.rapidapi.com/get?bid=178&key=sX5A2PcYZbsN5EY6&uid=mashape&msg=" + msg,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "acobot-brainshop-ai-v1.p.rapidapi.com",
            "x-rapidapi-key": "4fbc9643f5msh0f0d37bbccc53a4p158c97jsn56395363bb0d"
        }
    }    
    $.ajax(settings).done(function (response) {
        db.transaction(function (transaction) {
            var sql = "INSERT INTO items(chatId, origin, destination, type, data, time) VALUES(?,?,?,?,?,?)";
            transaction.executeSql(sql, [++randcount, 'gossipy', userId, 1, response.cnt, +new Date() + ''], function () {
                boxSetter(curName, curNo, curId);
                if (sSwitch) {
                    audiomp3.play();
                    audioogg.play();
                } else {
                    window.navigator.vibrate(300);
                }
                setTimeout(scrollDown, 200);
            });
        });
    });
}
// var again = true;
// var preDef = new Array()
// if(again){}
        // message = message.toLowerCase();
        // preDef.forEach(q => {
        //     if (message.includes(q)) {
        //         const reply = greeting[Math.floor(Math.random() * greeting.length)];
        //         speech.text = reply;
        //     }
        // })
