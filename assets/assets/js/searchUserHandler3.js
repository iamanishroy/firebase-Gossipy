function sayHi(hiId, hiImage, hiName){
    var curTime = new Date();
    sendToBackend('hi', hiId, curTime);
    insert(lastChat++, hiImage, hiName, userId, hiId, '1', 'hi', curTime);
    ShowToast(hiName);
    sendToReciever(Ses_img, username, hiId, userId, '1', 'hi', curTime); 
}