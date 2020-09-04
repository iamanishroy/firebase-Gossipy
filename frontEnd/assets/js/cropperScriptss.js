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
          }).then(function () {
             console.log('jQuery bind complete');
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
       }).then(function (response) {
          $("#uploadimage").hide();
          $('.crop_image').hide();
          $('.crop_image_cancel').hide();
          $('#imgLoading').show();
          $.ajax({
             url: "backEnd/upload.php",
             type: "POST",
             data: { "image": response, "uid": userId },
             success: function (data) {
                $('#imgTrigger').attr('src', data);
                $('#userImgChanged').attr('src', data);
                $('#imgLoading').hide();
                Ses_img = data;
                $('.hideWhenCropping').show();
             }
          });
       })
    });
  });