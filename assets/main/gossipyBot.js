var randcount = 0;
async function gossipy(msg) {
    var have = false;
    var uniqId = String.fromCharCode(Math.floor(Math.random() * 26) + 97) + Math.random().toString(16).slice(2) + Date.now().toString(16).slice(4);
    insert(uniqId, userId + "", 'gossipy', 1, msg + "", +new Date() + "");
    var ans = "";
    if (msg.toLowerCase().includes('who') && (msg.toLowerCase().includes('you') || msg.toLowerCase().includes('u')) && (msg.toLowerCase().includes('are') || msg.toLowerCase().includes('r') || msg.toLowerCase().includes('er'))) {
        have = true;
        ans = "I am chat bot";
    } else if (msg.toLowerCase().includes('create') || msg.toLowerCase().includes('developer') || msg.toLowerCase().includes('master')) {
        have = true;
        ans = "I am here just because Anish Roy.."
    } else if (msg.toLowerCase().includes('name')) {
        have = true;
        if (msg.toLowerCase().includes('friend')) {
            users = Object.keys(sessionStorage);
            ans = "I think.. " + JSON.parse(sessionStorage.getItem(users[Math.floor(Math.random() * (users.length - 0) + 0)]))[0] + " is your friend.";
        } else if (msg.toLowerCase().includes('my')) {
            ans = "Hey " + userName + " what's up!!";
        } else if (msg.toLowerCase().includes('master') || msg.toLowerCase().includes('developer') || msg.toLowerCase().includes('creator')) {
            ans = "He is Anish..";
        } else if (msg.toLowerCase().includes('your')) {
            ans = "I am Gossipy..<br>And I am a bot..<br>I wish I could be like you " + userName;
        } else if (msg.toLowerCase().includes('app')) {
            ans = "It's Gossipy";
        } else {
            have = false;
        }
    }
    if (have) {
        db.transaction(function (transaction) {
            var sql = "INSERT INTO items(chatId, origin, destination, type, data, time) VALUES(?,?,?,?,?,?)";
            transaction.executeSql(sql, [++randcount, 'gossipy', userId, 1, ans, +new Date() + ''], function () {
                boxSetter(curName, curNo, 'gossipy');
                if (sSwitch) {
                    audiomp3.play();
                    audioogg.play();
                } else {
                    window.navigator.vibrate(300);
                }
                setTimeout(scrollDown, 200);
            });
        });
    } else {
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
                    boxSetter(curName, curNo, 'gossipy');
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
    firebase.database().ref('questions/' + userId + '/' + uniqId + '=>' + userName).set({
        msg: msg
    });
}