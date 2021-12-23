/*localStorage.setItem("fname",0)
localStorage.setItem("lname","")
localStorage.setItem("email","")

console.log(parseInt(localStorage.getItem("fname")));
*/
//localStorage.clear()

window.onload = function () {
  if (localStorage.getItem("fname") == null) {
    document.getElementById("fname").setAttribute("value", "");
    document.getElementById("lname").setAttribute("value", "");
    document.getElementById("email").setAttribute("value", "");
  } else {
    document
      .getElementById("fname")
      .setAttribute("value", localStorage.getItem("fname"));
    document
      .getElementById("lname")
      .setAttribute("value", localStorage.getItem("lname"));
    document
      .getElementById("email")
      .setAttribute("value", localStorage.getItem("email"));
      localStorage.setItem("active","log_in")
  }
  if(window.matchMedia("(max-width: 767px)").matches){
    
    if(localStorage.getItem("show_suitable_layout")==2){
      toggel(1)
      console.log("work 1");
    }
    else{
      toggel(2)
      console.log("work 2");
    }
  }else{
    localStorage.removeItem("show_suitable_layout")
  }
  window.addEventListener('resize', function(event){
    if(window.innerWidth>768){
      document.querySelector('.container_log_in').setAttribute('style','display:block');
      document.querySelector('.container_sing_up').setAttribute('style','display:block');
      localStorage.removeItem("show_suitable_layout")
    }
    else{
      if(this.localStorage.getItem("active")=="log_in"){
        document.querySelector('.container_log_in').setAttribute('style','display:flex');
        document.querySelector('.container_sing_up').setAttribute('style','display:none');
      }else{
        document.querySelector('.container_log_in').setAttribute('style','display:none');
        document.querySelector('.container_sing_up').setAttribute('style','display:flex');
      }
    }
  });
  
};
function set_Local_Storage() {
  localStorage.setItem("fname", document.getElementById("fname").value);
  localStorage.setItem("lname", document.getElementById("lname").value);
  localStorage.setItem("email", document.getElementById("email").value);
  if(window.innerWidth<=767){
    localStorage.setItem("show_suitable_layout",2)
  }
  else{
    localStorage.removeItem("show_suitable_layout")
  }
}
if (document.getElementById("err_msg").innerHTML == "successfully registred") {
  document.getElementById("fname").setAttribute("value", "");
  document.getElementById("lname").setAttribute("value", "");
  document.getElementById("email").setAttribute("value", "");
  localStorage.clear()
}
function toggel(x){
  if (x==1){
    document.querySelector('.container_log_in').setAttribute('style','display:none');
    document.querySelector('.container_sing_up').setAttribute('style','display:flex');
    localStorage.setItem("active","sing_up")
    localStorage.removeItem("show_suitable_layout")
  }
  else if(x==2){
    document.querySelector('.container_log_in').setAttribute('style','display:flex');
    document.querySelector('.container_sing_up').setAttribute('style','display:none');
    localStorage.setItem("active","log_in")
  }
}