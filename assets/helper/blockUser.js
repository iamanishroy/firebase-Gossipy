function blockUser(){
    userToBeBlocked = curId;
    curBName = curName;
    if(userBlockList.includes(userToBeBlocked)){
        $('#usBlock').html('<i class="icon-close"></i> Block User');
        userBlockList.pop(userToBeBlocked);
        ShowToast("You have unblocked " + curBName);
    }else{
        $('#usBlock').html('<i class="icon-close"></i> Unblock User');
        ShowToast("You have blocked " + curBName);
        userBlockList.push(userToBeBlocked);
    } 
    var user = firebase.auth().currentUser;      
    firebase.firestore().collection("user").doc(user.uid).update({
        blocked: userBlockList
    });
}