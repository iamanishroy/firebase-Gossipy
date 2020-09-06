var dbb = openDatabase("itemDB", "1.0", "itemDB", 65535);
var fetch = false;
setInterval(fetcher,1000);
function fetcher(){
    if(fetch)
        boxSetter(curName, curNo, curId);    
}
function boxSetter(name, sno, cid) {
    $(".clist").html("");
    dbb.transaction(function (transaction) {
        var sql = "SELECT * FROM items WHERE origin = '" + cid + "' OR destination = '" + cid + "' ORDER BY rowid";
        transaction.executeSql(sql, undefined, function (transaction, result) {
            if (result.rows.length) {
                var htm = `<div id="chatbox_${name}" class="chat chatboxcontent active-chat" data-chat="person_${sno}" client="${name}">`;
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    var dbimage = JSON.parse(sessionStorage.getItem(cid))[1];
                    var dbname = name;
                    var dborigin = row.origin;
                    var dbdata = row.data;
                    var dbdestination = row.destination;
                    var dbtime = new Date(row.time);
                    var milli = Date.now() - dbtime.getTime();
                    var seconds = Math.floor((milli / 1000) % 60);
                    var minutes = Math.floor((milli / (1000 * 60)) % 60);
                    var hours = Math.floor((milli / (1000 * 60 * 60)) % 24);
                    var days = Math.floor(hours / 24);
                    var days = Math.floor(days / 30);
                    if (userId != dborigin) {
                        htm += `<div class="col-xs-12 p-b-10">
                                    <div class="chat-image  profile-picture max-profile-picture">
                                        <img alt="${dbname}" src="${dbimage}"
                                            class="bg-theme">
                                    </div>
                                    <div class="chat-body">
                                        <div class="chat-text">
                                            <h4>${dbname}</h4>
                                            <p>${dbdata}</p>
                                            <b>`;
                                            if(hours > 0){
                                                htm += hours + " hour ago";
                                            }else if(minutes > 0){
                                                htm += minutes + " minute ago";
                                            }else{
                                                htm += "Just Now"; 
                                            }
                                            htm += `</b>
                                        </div>
                                    </div>
                                </div>`;
                    } else {
                        htm += `<div class="col-xs-12 p-b-10 odd">
                                    <div class="chat-image  profile-picture max-profile-picture">
                                        <img alt="${userName}" src="${userimg}">
                                    </div>
                                    <div class="chat-body">
                                        <div class="chat-text">
                                            <h4>You</h4>
                                            <p>${dbdata}</p>
                                            <b>`;
                                            if(hours > 0){
                                                htm += hours + " hour ago";
                                            }else if(minutes > 0){
                                                htm += minutes + " minute ago";
                                            }else{
                                                htm += "Just Now"; 
                                            }
                                            htm += `</b>
                                            <span class="msg-status msg-mega">
                                            <i class="fa fa-check"></i></span>
                                        </div>
                                    </div>
                                </div>`;
                    }                    
                }
                htm += `</div>`;
            }
            $(".cbox").html(htm);
        })
    })
    
}