var banner = document.getElementById("banner");
var wrapper = document.getElementsByClassName("wrapper")[0];
var backgroundImage = document.getElementsByClassName("background-image")[0];
var content = document.getElementsByClassName("content")[0];

/*
Example URL
https://generator.devbanner.center/banner?username=tisButABug&subtext=test
*/

$("#bannerForm").submit(function(event) {
  event.preventDefault();

  var $form = $(this);
  var $banner = $("#banner");
  var $spinnerOverlay = $(".spinnerOverlay");
  var $errorOverlay = $(".errorOverlay");
  var url = $form.attr('action') + '?' + $form.serialize();

  banner.onload = () => {
    $spinnerOverlay.fadeOut();
  };

  banner.onerror = () => {
    $spinnerOverlay.hide();
    $errorOverlay.show();
    banner.src = "res/images/examplebanner.png";
  };

  $spinnerOverlay.fadeIn();
  $errorOverlay.hide();
  banner.src = url;
});

function resize() {
  wrapper.height = window.innerHeight * 1.1;
  backgroundImage.height = window.innerHeight * 1.2;
  if(window.innerWidth < 600){
    content.style.left = "45%";
  }else{
    content.style.left = "48%";
  }
}

window.onresize = resize;
resize();
