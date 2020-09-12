function presence() {
    users = Object.keys(sessionStorage);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    users.forEach(user => {
        if (user == 'gossipy') {
            sessionStorage.setItem('ON__' + user, 'Online always');
        } else {
            firebase.database().ref('presence/' + user).on('value', function (snapshot) {
                if (snapshot.exists()) {
                    if (snapshot.val().online) {
                        sessionStorage.setItem('ON__' + user, 'online');
                    } else {
                        var date = new Date(snapshot.val().time);
                        var todate = new Date();
                        var strDate = date.toLocaleDateString().split('/');
                        var strNowDate = todate.toLocaleDateString().split('/');
                        var strTime = date.toLocaleTimeString();
                        var timeAr = strTime.split(' ');
                        var time, m;
                        time = timeAr[0].split(':')[0] + ':' + timeAr[0].split(':')[1] + ' ' + timeAr[1];
                        if (strNowDate[2] == strDate[2] && strNowDate[1] == strDate[1]) {
                            if (strNowDate[0] == strDate[0]) {
                                m = 'last seen today at ' + time;
                            } else if (parseInt(strNowDate[0]) - parseInt(strDate[0]) == 1) {
                                m = 'last seen yesterday at ' + time;
                            } else {
                                m = `last seen ${months[parseInt(strDate[1])]} ${strDate[0]} at ${time}`
                            }
                        } else {
                            m = `last seen ${months[parseInt(strDate[1])]} ${strDate[0]}, ${strDate[2]} at ${time}`;
                        }
                        sessionStorage.setItem('ON__' + user, m);
                    }
                } else {
                    sessionStorage.setItem('ON__' + user, 'Offline');
                }
            });
        }
    });
}
$(window).unload(function () {
    firebase.database().ref('presence/' + userId).set({
        online: false, time: +new Date()
    });
});