var usernameInput = document.getElementById("username");
var subtextInput = document.getElementById("subtext");
var displayBanner = document.getElementById("displayBanner");
var generatorBTN = document.getElementById("generateBTN");
var action = "https://generator.devbanner.center/banner?";

/*
Example URL
https://generator.devbanner.center/banner?username=tisButABug&subtext=test
*/

generateBTN.addEventListener("click", generateBanner);

document.addEventListener("keydown", function(e){
  if(e.keycode === 13 || e.which === 13){
    generateBanner();
  }
})

function generateBanner(){
  this.username = usernameInput.value;
  this.subtext = subtextInput.value;
  this.src = action + usernameInput.name + "=" + this.username + "&" + subtextInput.name + "=" + this.subtext;
  displayBanner.src = this.src;
}
