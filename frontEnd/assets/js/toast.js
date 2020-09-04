function ShowToast(name) {
	var sToast = document.getElementById('toast_container');
	sToast.setAttribute('style', 'visibility:visible; animation:animation_toast 3s linear 1;');
	var mToast = document.getElementById('toast_message');
	mToast.innerHTML = "Hi message sent to " + name;
	setTimeout(HideToast, 3000);
}
function HideToast() {
	var sToast = document.getElementById('toast_container');
	sToast.setAttribute('style', 'visibility:hidden; animation:animation_toast 3s linear 1;');
	var mToast = document.getElementById('toast_message');
	mToast.innerHTML = "This is a toast message";
}