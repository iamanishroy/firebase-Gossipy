var fileAllow = true;
function AlertFileSender() {
    fileAllow = true;
    $('#fileWarning').html('');
    $('#fileSendBtn').removeAttr('disabled');
    $('#fileSendBtn').removeAttr('style');
    $('#wchat').hide();
    $('#sendFileDisplay').show();
    var sizeinbytes = document.getElementById('fileSender').files[0].size;
    $('#sendFileDisplayfile').text(document.getElementById('fileSender').files[0].name);
    if ((sizeinbytes / 1024) > 10240) {
        fileAllow = false;
        $('#fileWarning').html(`<a class="flex-grow text-red-500 border-b-2 border-red-500 py-2 text-lg px-1">File size should be less than 10 MB</a>`);
        $('#fileSendBtn').attr('disabled');
        $('#fileSendBtn').attr('style', 'background-color: gray;');
    }
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    fSize = sizeinbytes;
    i = 0;
    while (fSize > 900) {
        fSize /= 1024;
        i++;
    }
    $('#sendFileDisplaySize').text((Math.round(fSize * 100) / 100) + ' ' + fSExt[i]);
}

function sendFileCancel() {
    $('#wchat').show();
    $('#sendFileDisplay').hide();
}

function sendFile() {
    if (fileAllow) {
        cbt = curName;
        cuId = curId;
        $('#wchat').show();
        $('#sendFileDisplay').hide();
        const sFile = document.getElementById('fileSender').files[0];
        var curUrl = URL.createObjectURL(sFile);
        var uniqId = String.fromCharCode(Math.floor(Math.random() * 26) + 97) + Math.random().toString(16).slice(2) + Date.now().toString(16).slice(4);
        $("#chatbox_" + cbt).append('<div class="col-xs-12 p-b-10 odd">' +
            '<div class="chat-image  profile-picture max-profile-picture">' +
            '<img alt="' + userName + '" src="' + userimg + '">' +
            '</div>' +
            '<div class="chat-body">' +
            '<div class="chat-text">' +
            '<h4>You</h4>' +
            '<p><a href="' + curUrl + '" class="download-link" download=""></a></p>' +
            '<b id="stat_' + uniqId + '">sending</b><span class="msg-status msg-' + cbt + '"><i class="fa fa-check"></i></span>' +
            '</div>' +
            '</div>' +
            '</div>');
        $(".target-emoji").css({ 'display': 'none' });
        $('.wchat-filler').css({ 'height': 0 + 'px' });
        scrollDown();
        var user = firebase.auth().currentUser;
        var now = +new Date();
        insert(uniqId + "", user.uid + "", cuId, 1, '<a href="' + curUrl + '" class="download-link" download=""></a>', now + "");
        firebase.firestore().collection("user").where("id", "==", cuId).get().then(function (snap) {
            snap.forEach(function (snapshot) {
                if (!snapshot.data()['blocked'].includes(userId)) {
                    const ref = firebase.storage().ref();
                    const name = +new Date() + "-" + sFile.name;
                    const metadata = { contentType: sFile.type };
                    const task = ref.child(name).put(sFile, metadata);
                    task.then(snapshot => snapshot.ref.getDownloadURL())
                        .then(url => {
                            $('#stat_' + uniqId).text('Sent');
                            if (sSwitch) {
                                sentmp3.play();
                            }
                            var database = firebase.database();
                            var msgval = '<a href="' + url + '" class="download-link" download=""></a>';
                            $.ajax({
                                url: "https://gossipx-server-1.ml/pusher/pusher.php",
                                type: "POST",
                                data: { uniqId: uniqId, to: cuId, org: user.uid, type: 1, message: msgval, time: now },
                                success: function (data) {
                                    database.ref('chats/' + uniqId).set({
                                        uniqId: uniqId, org: user.uid, dest: cuId, type: 1, data: msgval, time: now
                                    });
                                }
                            });
                        });
                    task.on('state_changed', function progress(snapshot) {
                        var progress = Math.round(100.0 * (snapshot.bytesTransferred / snapshot.totalBytes));
                        $('#stat_' + uniqId).text('sending ' + progress + '% done');
                    });
                }
            });
        });
    }
}