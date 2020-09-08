var searchedUser = new Array();
$('#searchbox').keyup(function () {
    var val = $('#searchbox').val();
    if (val != "") {
        if (val.length == 1) {
            firebase.firestore().collection("user").where("fl", "==", val.charAt(0).toLowerCase())
                .where("visibility", "==", true).get()
                .then(function (snapshot) {
                    $('.searchList').html("");
                    searchedUser = [];
                    snapshot.forEach(function (childSnapshot) {
                        var primary = childSnapshot.data();
                        if (primary['id'] != userId) {
                            searchedUser.push(primary);
                            var append = `
                            <div class='noti flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4'>
                            <div class='p-4 md:w-1/3 md:mb-0 mb-6 flex'>
                            <div class='w-16 h-16 inline-flex items-center justify-center rounded-full text-red-500 mb-4 flex-shrink-0'>
                            <img alt='${primary['name']}' src='${primary['image']}' class='rounded-full flex-shrink-0 object-cover object-center'
                            style='height: 4.5rem; width: 4.5rem; margin-top: 16px;'></div><div class='flex-grow pl-6'>
                            <h2 class='text-gray-900 text-lg title-font font-medium mb-2' style='margin-bottom: 0; margin-top: 1px;'>
                            ${primary['name']}</h2><p class='leading-relaxed text-gray-600'>${primary['email']}</p>
                            <button onclick="sayHi('${primary['id']}', '${primary['name']}')" class='cl bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'>
                            Say hi to Gossip</button></div></div></div>
                            `;
                            $('.searchList').append(append);
                        }
                    });
                });
        } else {
            $('.searchList').html("");
            for (var i = 0; i < searchedUser.length; i++) {
                if ((((searchedUser[i]['name']).toLowerCase())).includes(val.toLowerCase())) {
                    var append = `
                    <div class='noti flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4'>
                    <div class='p-4 md:w-1/3 md:mb-0 mb-6 flex'>
                    <div class='w-16 h-16 inline-flex items-center justify-center rounded-full text-red-500 mb-4 flex-shrink-0'>
                    <img alt='${searchedUser[i]['name']}' src='${searchedUser[i]['image']}' class='rounded-full flex-shrink-0 object-cover object-center'
                    style='height: 4.5rem; width: 4.5rem; margin-top: 16px;'></div><div class='flex-grow pl-6'>
                    <h2 class='text-gray-900 text-lg title-font font-medium mb-2' style='margin-bottom: 0; margin-top: 1px;'>
                    ${searchedUser[i]['name']}</h2><p class='leading-relaxed text-gray-600'>${searchedUser[i]['email']}</p>
                    <button onclick="sayHi('${searchedUser[i]['id']}', '${searchedUser[i]['name']}')" class='cl bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'>
                    Say hi to Gossip</button></div></div></div>
                    `;
                    $('.searchList').append(append);
                }
            }
        }
    } else {
        $('.searchList').html("");
    }
});