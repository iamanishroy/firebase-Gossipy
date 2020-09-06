function triggerInp() {
   document.querySelector('#upload_image').click();
}
function cancelUploading() {
   $(".crop_image").hide();
   $(".crop_image_cancel").hide();
   $("#uploadimage").hide();
   $('.hideWhenCropping').show();
}
$(document).ready(function () {
   var wid = $(window).width() - ((2 * $(window).width()) / 100);
   $(".crop_image").hide();
   $(".crop_image_cancel").hide();
   $("#uploadimage").hide();
   $image_crop = $('#uploadimage').croppie({
      enableExif: true,
      viewport: {
         width: ((2 * wid) / 3),
         height: ((2 * wid) / 3),
         type: 'circle' //square
      },
      boundary: {
         width: wid,
         height: wid
      }
   });
   $('#upload_image').on('change', function () {
      $("#uploadimage").show();
      $(".crop_image").show();
      $(".crop_image_cancel").show();
      $('.hideWhenCropping').hide();
      var reader = new FileReader();
      reader.onload = function (event) {
         $image_crop.croppie('bind', {
            url: event.target.result
         });
      }
      reader.readAsDataURL(this.files[0]);
      $(".crop_image").show();
      $(".crop_image_cancel").show();
   });
   $('.crop_image').click(function (event) {
      $image_crop.croppie('result', {
         type: 'canvas',
         size: 'viewport'
      }).then(function (str) {
         $("#uploadimage").hide();
         $('.crop_image').hide();
         $('.crop_image_cancel').hide();
         $('#imgLoading').show();
         var user = firebase.auth().currentUser;
         const ref = firebase.storage().ref();
         // extract content type and base64 payload from original string
         var pos = str.indexOf(';base64,');
         var type = str.substring(5, pos);
         var b64 = str.substr(pos + 8);
         // decode base64
         var imageContent = atob(b64);
         // create an ArrayBuffer and a view (as unsigned 8-bit)
         var buffer = new ArrayBuffer(imageContent.length);
         var view = new Uint8Array(buffer);
         // fill the view, using the decoded base64
         for (var n = 0; n < imageContent.length; n++) {
            view[n] = imageContent.charCodeAt(n);
         }
         // convert ArrayBuffer to Blob           
         const file = new Blob([buffer], { type: type });//.files[0];
         const name = +new Date() + "-" + file.name;
         const metadata = {
            contentType: file.type
         };
         const task = ref.child(name).put(file, metadata);
         task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
               userimg = url;
               $('#imgTrigger').attr('src', url);
               $('#userImgChanged').attr('src', url);
               user.updateProfile({
                  photoURL: url
               }).then(function () {
                  firebase.database().ref('users/' + user.uid).update({
                     image: url
                  });
               }).catch(function (error) { });
            });
         $('#imgLoading').hide();
         $('.hideWhenCropping').show();
      })
   });
});