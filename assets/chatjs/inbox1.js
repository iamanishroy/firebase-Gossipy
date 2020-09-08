var audioogg = new Audio('assets/audio/chat.ogg');
var audiomp3 = new Audio('assets/audio/chat.mp3');
var sentogg = new Audio('assets/audio/sent.ogg');
var sentmp3 = new Audio('assets/audio/sent.mp3');
function scrollDown() {
    var wtf = $('.wchat-chat-body');
    var height = wtf[0].scrollHeight;
    wtf.scrollTop(height);
    $(".scroll-down").css({ 'visibility': 'hidden' });
}
var curId;
var curImg;
var curName;
var curNo;
var h = 0;
function chatWith(chatuser, toid, img, status, chatuserId, mail, stat) {
    curId = chatuserId;
    curImg = img;
    curName = chatuser;
    curNo = toid;
    boxSetter(chatuser, toid, chatuserId);
    dispBlock(curId);
    $('.curImg').attr("src", img);
    $('.curName').text(chatuser);
    if ($("#pane-intro").css('visibility') == 'visible') {
        $("#pane-intro").css({ 'visibility': 'hidden' });
        $(".chat-right-aside").css({ 'visibility': 'visible' });
    }
    createChatBox(chatuser, toid, img, status);
    scrollDown();
    $('.right .top').attr("data-user", chatuser)
        .attr("data-image", img)
        .attr("data-mail", mail)
        .attr("data-stat", stat);
}
function createChatBox(chatboxtitle, toid, img, status, minimizeChatBox) {
    var chatFormTpl =
        '<div class="block-wchat" id="chatForm_' + chatboxtitle + '">' +
        '<div id="typing_on"></div>' +
        '<button class="icon ti-face-smile font-24 btn-emoji" onclick="javascript:chatemoji()" href="javascript:void(0)" id="toggle-emoji"></button>' +
        '<div tabindex="-1" class="input-container">' +
        '<div tabindex="-1" class="input-emoji">' +
        '<div class="input-placeholder" style="visibility: visible;display:none;">Type a message</div>' +
        '<textarea class="input chatboxtextarea" id="chatboxtextarea" name="chattxt" onkeydown="javascript:return checkChatBoxInputKey(event,this,\'' + chatboxtitle + '\',\'' + toid + '\',\'' + img + '\');" contenteditable spellcheck="true" style="resize:none;height:20px" placeholder="Type a message"></textarea>' +
        '</div>' +
        '</div>' +
        '<button onclick="javascript:return clickTosendMessage(\'' + chatboxtitle + '\',\'' + toid + '\',\'' + img + '\');" class="btn-icon icon-send fa fa-paper-plane-o font-24 send-container"></button>' +
        '</div>';
    if ($("#chatbox_" + chatboxtitle).length > 0) {
        $("#chatFrom").html(chatFormTpl);
        $(".chatboxtextarea").focus();
        return;
    }
    $(" <div />").attr("id", "chatbox_" + chatboxtitle)
        .addClass("chat chatboxcontent active-chat")
        .attr("data-chat", "person_" + toid)
        .attr("client", chatboxtitle)
        .html('<span class="hidecontent"></span>')
        .appendTo($("#resultchat"));
    if (minimizeChatBox != 1) {
        $("#chatFrom").html(chatFormTpl);
    }
}
function checkChatBoxInputKey(event, chatboxtextarea, chatboxtitle, toid, img, send) {
    $(".input-placeholder").css({ 'visibility': 'hidden' });
    if ((event.keyCode == 13 && event.shiftKey == 0) || (send == 1)) {
        message = $(chatboxtextarea).val();
        message = message.replace(/^\s+|\s+$/g, "");
        $(chatboxtextarea).val('');
        $(chatboxtextarea).focus();
        $(".input-placeholder").css({ 'visibility': 'visible' });
        $(".chatboxtextarea").css('height', '20px');
        if (message != '') {
            message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
            message = message.replace(/\n/g, "<br />");
            var $con = message;
            var $words = $con.split(' ');
            for (i in $words) {
                if ($words[i].indexOf('http://') == 0 || $words[i].indexOf('https://') == 0) {
                    $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
                }
                else if ($words[i].indexOf('www') == 0) {
                    $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
                }
            }
            message = $words.join(' ');
            message = emojione.shortnameToImage(message); // Set imotions
            $("#chatbox_" + chatboxtitle).append('<div class="col-xs-12 p-b-10 odd">' +
                '<div class="chat-image  profile-picture max-profile-picture">' +
                '<img alt="' + userName + '" src="' + userimg + '">' +
                '</div>' +
                '<div class="chat-body">' +
                '<div class="chat-text">' +
                '<h4>' + userName + '</h4>' +
                '<p>' + message + '</p>' +
                '<b>Just Now</b><span class="msg-status msg-' + chatboxtitle + '"><i class="fa fa-check"></i></span>' +
                '</div>' +
                '</div>' +
                '</div>');
            $(".target-emoji").css({ 'display': 'none' });
            $('.wchat-filler').css({ 'height': 0 + 'px' });
            scrollDown();
            firebase.firestore().collection("user").where("id", "==", curId).get().then(function (snap) {
                snap.forEach(function (snapshot) {
                    if (!snapshot.data()['blocked'].includes(userId)) {
                        var database = firebase.database();
                        var user = firebase.auth().currentUser;
                        var now = +new Date();
                        var uniqId = String.fromCharCode(Math.floor(Math.random() * 26) + 97) + Math.random().toString(16).slice(2) + Date.now().toString(16).slice(4);
                        insert(uniqId + "", user.uid + "", curId, 1, message + "", now + "");
                        if (sSwitch) {
                            sentmp3.play();
                        }
                        $.ajax({
                            url: "https://gossipx-server-1.ml/pusher/pusher.php",
                            type: "POST",
                            data: { uniqId: uniqId, to: curId, org: user.uid, type: 1, message: message, time: now },
                            success: function (data) {
                                database.ref('chats/' + uniqId).set({
                                    uniqId: uniqId, org: user.uid, dest: curId, type: 1, data: message, time: now
                                });
                            }
                        });
                    }
                })
            });
        }
        return false;
    }
    var adjustedHeight = chatboxtextarea.clientHeight;
    var maxHeight = 60;
    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > chatboxtextarea.clientHeight)
            $(chatboxtextarea).css('height', adjustedHeight + 8 + 'px');
    } else {
        $(chatboxtextarea).css('overflow', 'auto');
    }
}
function dispBlock(c){
    if(userBlockList.includes(c)){
        $('#usBlock').html('<i class="icon-close"></i> Unblock User');
    }else{
        $('#usBlock').html('<i class="icon-close"></i> Block User');
    }
}
function clickTosendMessage(chatboxtitle, toid, img) {
    message = $(".chatboxtextarea").val();
    message = message.replace(/^\s+|\s+$/g, "");
    $(".chatboxtextarea").val('');
    $(".chatboxtextarea").focus();
    $(".input-placeholder").css({ 'visibility': 'visible' });
    $(".chatboxtextarea").css('height', '20px');
    if (message != '') {
        message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
        message = message.replace(/\n/g, "<br />");
        var $con = message;
        var $words = $con.split(' ');
        for (i in $words) {
            if ($words[i].indexOf('http://') == 0 || $words[i].indexOf('https://') == 0) {
                $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
            }
            else if ($words[i].indexOf('www') == 0) {
                $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
            }
        }
        message = $words.join(' ');
        message = emojione.shortnameToImage(message);  // Set imotions
        $("#chatbox_" + chatboxtitle).append('<div class="col-xs-12 p-b-10 odd">' +
            '<div class="chat-image  profile-picture max-profile-picture">' +
            '<img alt="' + userName + '" src="' + userimg + '">' +
            '</div>' +
            '<div class="chat-body">' +
            '<div class="chat-text">' +
            '<h4>You</h4>' +
            '<p>' + message + '</p>' +
            '<b>Just Now</b><span class="msg-status msg-' + chatboxtitle + '"><i class="fa fa-check"></i></span>' +
            '</div>' +
            '</div>' +
            '</div>');
        $(".target-emoji").css({ 'display': 'none' });
        $('.wchat-filler').css({ 'height': 0 + 'px' });
        scrollDown();
        send(curId, 1, message);
    }
    var adjustedHeight = $(".chatboxtextarea").clientHeight;
    var maxHeight = 40;
    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max($(".chatboxtextarea").scrollHeight, adjustedHeight);
        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > $(".chatboxtextarea").clientHeight)
            $($(".chatboxtextarea")).css('height', adjustedHeight + 8 + 'px');
    } else {
        $($(".chatboxtextarea")).css('overflow', 'auto');
    }
    return false;
}
