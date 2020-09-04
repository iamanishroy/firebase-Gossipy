var db = openDatabase("itemDB", "1.0", "itemDB", 65535);
var lastChat;
function setter() {
    deletee();
}
function deletee() {
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
function loadIndex() {
    db.transaction(function (transaction) {
        var sql = "SELECT * FROM items ORDER BY rowid DESC";
        transaction.executeSql(sql, undefined, function (transaction, result) {
            if (result.rows.length) {
                $(".clist").html("");
                let listed = new Array();
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    var dbimage = row.image;
                    var dbname = row.name;
                    var dborigin = row.origin;
                    var dbdestination = row.destination;
                    if (userId == dbdestination && !(listed.includes(dborigin))) {
                        listed.push(dborigin);
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
            } else {
                deletee();
            }
        }, function (transaction, err) {
            db.transaction(function (transaction) {
                var sql = "CREATE TABLE items " +
                    "(chatId INT NOT NULL," +
                    "image VARCHAR(500) NOT NULL," +
                    "name VARCHAR(35) NOT NULL," +
                    "origin VARCHAR(25) NOT NULL," +
                    "destination VARCHAR(25) NOT NULL," +
                    "type INT(1) NOT NULL," +
                    "data VARCHAR(500) NOT NULL," +
                    "time DATETIME NOT NULL)";
                transaction.executeSql(sql, undefined, function () {
                    $.ajax({
                        async: false,
                        url: "../backEnd/loadChat.php",
                        type: "POST",
                        data: { uid: userId },
                        success: function (data) {
                            var arr = JSON.parse("[" + data + "]");
                            for (var i = 0; i <= arr[0].length - 1; i++) {
                                insert(arr[0][i][0] + "", arr[0][i][1] + "", arr[0][i][2] + "", arr[0][i][3] + "", arr[0][i][4] + "", arr[0][i][5] + "", arr[0][i][6] + "", arr[0][i][7] + "");
                            }
                        }
                    });
                    setInterval(loadIndex, 600);
                });
            });
        })
    })
}
function insert(chatId, image, name, origin, destination, type, data, time) {
    lastChat = chatId;
    db.transaction(function (transaction) {
        var sql = "INSERT INTO items(chatId, image, name, origin, destination, type, data, time) VALUES(?,?,?,?,?,?,?,?)";
        transaction.executeSql(sql, [chatId, image, name, origin, destination, type, data, time], function () { }, function (transaction, err) {
        })
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