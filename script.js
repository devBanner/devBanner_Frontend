var usernameInput = document.getElementById("username");
var subtextInput = document.getElementById("subtext");
var banner = document.getElementById("banner");
var generatorBTN = document.getElementById("generateBTN");
var action = "https://generator.devbanner.center/banner?";
var wrapper = document.getElementsByClassName("wrapper")[0];
var backgroundImage = document.getElementsByClassName("background-image")[0];
var content = document.getElementsByClassName("content")[0];
var bannerError = document.getElementById("bannerError");
var spinner = document.getElementById("spinner");

/*
Example URL
https://generator.devbanner.center/banner?username=tisButABug&subtext=test
*/

generateBTN.addEventListener("click", (e)=>{
  generateBanner(e)
});

document.addEventListener("keydown", function(e){
  if(e.keycode === 13 || e.which === 13){
    generateBanner(e);
  }
})

function generateBanner(e){
  e.preventDefault();
  this.username = usernameInput.value;
  this.subtext = subtextInput.value;
  this.src = action + usernameInput.name + "=" + this.username + "&" + subtextInput.name + "=" + this.subtext;
  banner.src = this.src;
  banner.classList.add("hidden");
  bannerError.classList.add("hidden");
  spinner.classList.remove("hidden");
}

banner.onload = () => {
  banner.classList.remove("hidden");
  bannerError.classList.add("hidden");
  spinner.classList.add("hidden");
};

banner.onerror = () => {
  bannerError.classList.remove("hidden");
  spinner.classList.add("hidden");
}

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
