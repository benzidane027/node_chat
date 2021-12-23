  var show_bar=false
function toggel_nav() {
  console.log("work")
  if(!show_bar){
    document.querySelector(".nav-bar").style.display="block";

    show_bar=true
  }
  else{
    document.querySelector(".nav-bar").style.display="none";
    show_bar=false
  }

  }
window.addEventListener("resize",()=>{
  if(window.innerWidth>768){
   document.querySelector(".nav-bar").style.display="block"
  console.log("jj");
  document.getElementById("sho").innerHTML=window.innerWidth
  }
 /* else{
      if(show_bar)
      document.querySelector(".nav-bar").style.display="bock"
      else
      document.querySelector(".nav-bar").style.display="none"
  }*/

})