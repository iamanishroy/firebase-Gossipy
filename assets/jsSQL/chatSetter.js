var db = openDatabase("itemDB", "1.0", "itemDB", 65535);
var lastChat;
function loadIndex() {
    console.log('load Ind')
    db.transaction(function (transaction) {
        var sql = "SELECT * FROM items ORDER BY rowid DESC";
        transaction.executeSql(sql, undefined, function (transaction, result) {
            if (result.rows.length) {
                $(".clist").html("");
                let listed = new Array();
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    var dborigin = row.origin;
                    var dbdestination = row.destination;
                    var database = firebase.database();
                    if (userId == dbdestination && !(listed.includes(dborigin))) {
                        listed.push(dborigin);
                        var dbname, dbimage;
                        console.log(dborigin)
                        if (localStorage.getItem(dborigin) == null) {
                            database.ref('users/' + dborigin).on('value', function (snapshot) {
                                if (snapshot.exists()) {
                                    dbname = snapshot.val().name;
                                    dbimage = snapshot.val().image;
                                    localStorage.setItem(dborigin, JSON.stringify([snapshot.val().name, snapshot.val().image]));
                                }
                            });
                            console.log('iffing1')

                        } else {
                            dbname = JSON.parse(localStorage.getItem(dborigin))[0];
                            dbimage = JSON.parse(localStorage.getItem(dborigin))[1];
                            console.log('elsing')

                        }
                        console.log(dbname)

                        var htm = `<li class="person chatboxhead active" id="chatbox1_${dbname}" data-chat="person_${i}"
                                href="javascript:void(0)"
                                onclick="javascript:chatWith('${dbname}','${i}','${dbimage}','Offline','${dborigin}')">
                                <a href="javascript:void(0)">
                                    <span class="userimage profile-picture min-profile-picture"><img
                                            src="${dbimage}" alt="${dbname}"
                                            class="avatar-image is-loaded bg-theme" width="100%"></span>
                                    <span>
                                    <span class="bname personName">${dbname}</span>
                                    <span class="personStatus"><span class="time Online"></span></span>
                                    <span class="count"></span><br>
                                    <small class="preview"></small>
                                    </span>
                                </a>
                            </li>`;
                        $(".clist").append(htm);
                    }
                    if (userId == dborigin && !(listed.includes(dbdestination))) {
                        listed.push(dbdestination);
                        var dbname, dbimage;
                        console.log(dbdestination)
                        if (localStorage.getItem(dbdestination) == null) {
                            database.ref('users/' + dbdestination).on('value', function (snapshot) {
                                if (snapshot.exists()) {
                                    dbname = snapshot.val().name;
                                    dbimage = snapshot.val().image;
                                    localStorage.setItem(dbdestination, JSON.stringify([snapshot.val().name, snapshot.val().image]));
                                    console.log(dbdestination + '?')
                                }
                            });
                            console.log('iffing')

                        } else {
                            dbname = JSON.parse(localStorage.getItem(dbdestination))[0];
                            dbimage = JSON.parse(localStorage.getItem(dbdestination))[1];
                            console.log('elsing')
                        }
                        console.log(dbname)
                        var htm = `<li class="person chatboxhead active" id="chatbox1_${dbname}" data-chat="person_${i}"
                                href="javascript:void(0)"
                                onclick="javascript:chatWith('${dbname}','1','${dbimage}','Offline','${dbdestination}')">
                                <a href="javascript:void(0)">
                                    <span class="userimage profile-picture min-profile-picture"><img
                                            src="${dbimage}" alt="${dbname}"
                                            class="avatar-image is-loaded bg-theme" width="100%"></span>
                                    <span>
                                    <span class="bname personName">${dbname}</span>
                                    <span class="personStatus"><span class="time Online"></span></span>
                                    <span class="count"></span><br>
                                    <small class="preview"></small>
                                    </span>
                                </a>
                            </li>`;
                        $(".clist").append(htm);
                    }
                }
            }

        }, function (transaction, err) {
            db.transaction(function (transaction) {
                var sql = "CREATE TABLE items " +
                    "(chatId INT NOT NULL," +
                    "origin VARCHAR(25) NOT NULL," +
                    "destination VARCHAR(25) NOT NULL," +
                    "type INT(1) NOT NULL," +
                    "data VARCHAR(500) NOT NULL," +
                    "time DATETIME NOT NULL)";
                transaction.executeSql(sql, undefined, function () {
                    fillTable();
                    setTimeout(setInterval(loadIndex, 1000), 1000);

                });
            });
        })
    })
}
function insert(chatId, origin, destination, type, data, time) {
    //lastChat = chatId;
    db.transaction(function (transaction) {
        var sql = "INSERT INTO items(chatId, origin, destination, type, data, time) VALUES(?,?,?,?,?,?)";
        transaction.executeSql(sql, [chatId, origin, destination, type, data, time], function () { },
            function (transaction, err) {
                console.log(err)
            });
    });
}
/*
    chatId,image,name,origin,destination,type,data,time
*/
                            // var htm = `<li class="person chatboxhead active" id="chatbox1_${dbname}" data-chat="person_1"
                            //     href="javascript:void(0)"
                            //     onclick="javascript:chatWith('${dbname}','1','${dbimage}','Online','${dborigin}')">
                            //     <a href="javascript:void(0)">
                            //         <span class="userimage profile-picture min-profile-picture"><img
                            //                 src="${dbimage}" alt="${dbname}"
                            //                 class="avatar-image is-loaded bg-theme" width="100%"></span>
                            //         <span>
                            //         <span class="bname personName">${dbname}</span>
                            //         <span class="personStatus"><span class="time Online"><i
                            //             class="fa fa-circle" aria-hidden="true"></i></span></span>
                            //         <span class="count"><span
                            //             class="icon-meta unread-count">2</span></span><br>
                            //         <small class="preview"><span class="Online">Online</span></small>
                            //         </span>
                            //     </a>
                            // </li>`;