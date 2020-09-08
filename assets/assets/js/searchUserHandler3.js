function sayHi(hiId, hiName){
    send(hiId, 1, 'hi');
    ShowToast("Hi message send to " + hiName);
}