var db = openDatabase("itemDB", "1.0", "itemDB", 65535);
var lastChat;
var fetUsData = (usId) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("user").where("id", "==", usId).get()
            .then(function (snap) {
                snap.forEach(function (snapshot) {
                    resolve(snapshot);
                });
            });
    });
}
async function loadIndex() {
    db.transaction(function (transaction) {
        var sql = "SELECT * FROM items ORDER BY rowid DESC";
        transaction.executeSql(sql, undefined, async function (transaction, result) {
            if (result.rows.length) {
                $(".clist").html("");
                let listed = new Array();
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    var dborigin = row.origin;
                    var dbdestination = row.destination;
                    if (userId == dbdestination && !(listed.includes(dborigin))) {
                        listed.push(dborigin);
                        var dbname, dbimage, dbemail, dbstatus;
                        if (sessionStorage.getItem(dborigin) == null) {
                            var snapshot = await fetUsData(dborigin);
                            dbname = snapshot.data().name;
                            dbimage = snapshot.data().image;
                            dbemail = snapshot.data().email;
                            dbstatus = snapshot.data().status;
                            sessionStorage.setItem(dborigin, JSON.stringify([dbname, dbimage, dbemail, dbstatus]));

                        } else {
                            dbname = JSON.parse(sessionStorage.getItem(dborigin))[0];
                            dbimage = JSON.parse(sessionStorage.getItem(dborigin))[1];
                            dbemail = JSON.parse(sessionStorage.getItem(dborigin))[2];
                            dbstatus = JSON.parse(sessionStorage.getItem(dborigin))[3];
                        }
                        var htm = `<li class="person chatboxhead active" id="chatbox1_${dbname}" data-chat="person_${i}"
                                href="javascript:void(0)"
                                onclick="javascript:chatWith('${dbname}','${i}','${dbimage}','Offline','${dborigin}','${dbemail}','${dbstatus}')">
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
                        var dbname, dbimage, dbemail, dbstatus;
                        if (sessionStorage.getItem(dbdestination) == null) {
                            var snapshot = await fetUsData(dbdestination);
                            dbname = snapshot.data().name;
                            dbimage = snapshot.data().image;
                            dbemail = snapshot.data().email;
                            dbstatus = snapshot.data().status;
                            sessionStorage.setItem(dbdestination, JSON.stringify([dbname, dbimage, dbemail, dbstatus]));
                        } else {
                            dbname = JSON.parse(sessionStorage.getItem(dbdestination))[0];
                            dbimage = JSON.parse(sessionStorage.getItem(dbdestination))[1];
                            dbemail = JSON.parse(sessionStorage.getItem(dbdestination))[2];
                            dbstatus = JSON.parse(sessionStorage.getItem(dbdestination))[3];
                        }
                        var htm = `<li class="person chatboxhead active" id="chatbox1_${dbname}" data-chat="person_${i}"
                                href="javascript:void(0)"
                                onclick="javascript:chatWith('${dbname}','1','${dbimage}','Offline','${dbdestination}','${dbemail}','${dbstatus}')">
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
            } else {
                deletee();
            }
        }, async function (transaction, err) {
            db.transaction(async function (transaction) {
                var sql = "CREATE TABLE items " +
                    "(chatId INT NOT NULL," +
                    "origin VARCHAR(25) NOT NULL," +
                    "destination VARCHAR(25) NOT NULL," +
                    "type INT(1) NOT NULL," +
                    "data VARCHAR(500) NOT NULL," +
                    "time DATETIME NOT NULL)";
                transaction.executeSql(sql, undefined, function () {
                    fillTable();
                    setInterval(loadIndex, 2000);
                });
            });
        })
    })
}
async function setter() {
    deletee();
}
async function deletee() {
    db.transaction(function (transaction) {
        var sql = "DROP TABLE items";
        transaction.executeSql(sql, undefined, function () {
            loadIndex();
        },
            function (transaction, err) {
                loadIndex();
            })
    });
}
function insert(chatId, origin, destination, type, data, time) {
    //lastChat = chatId;
    db.transaction(function (transaction) {
        var sql = "INSERT INTO items(chatId, origin, destination, type, data, time) VALUES(?,?,?,?,?,?)";
        transaction.executeSql(sql, [chatId, origin, destination, type, data, time], function () { },
            function (transaction, err) {
                // console.log(err)
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