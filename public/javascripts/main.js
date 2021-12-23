let test_choose_reciver = true; // for choose reciver combo box
localStorage.clear()
let layout = [
  document.getElementById("new_message_layout"),
  document.getElementById("sended_message_layout"),
  document.getElementById("recived_message_layout"),
  document.getElementById("corby_message_layout"),
  document.getElementById("display_message_layout"),
];
function show_suitable_layout(a) {
  for (let i = 0; i <= 4; i++) {
    if (i == Number(a)) layout[i].style.display = "block";
    else layout[i].style.display = "none";
  }
}

function get_all_user() {
  if (test_choose_reciver) {
    test_choose_reciver = false;
    var myReq = new XMLHttpRequest();
    myReq.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var resp_ = myReq.responseText;

        myObj = JSON.parse(resp_);
        var x = document.getElementById("choose_use");

        x.innerHTML = null;
        var option = document.createElement("option");
        option.text = "choose";
        option.value = "-1";
        x.add(option);

        for (var i = 0; i < myObj.result.length; i++) {
          var option = document.createElement("option");
          option.text = myObj.result[i].name + "  " + myObj.result[i].prenom;
          option.value = myObj.result[i].id;
          x.add(option);
        }
       // console.log(myObj.result[0]);
      }
    };
    myReq.open("get", "/json/all_users", true);
    myReq.send();
  } else {
    test_choose_reciver = true;
  }
}
function send_my_message() {
  var select_id = document.getElementById("choose_use");

  var reciver_id = parseInt(select_id.value);
  if (reciver_id == -1) {
    document.getElementById("erro_msg").innerHTML = "no reciver selected";
    return;
  }

  var msg_obj = document.getElementById("_object");
  var msg_content = document.getElementById("_message");
  var myFile = document.getElementById("_file");
  // console.log(msg_obj.value+" "+msg_content.value+" "+myFile.value+" "+reciver_id);

  if (myFile.value == "") {
    document.getElementById("erro_msg").innerHTML = "uploading..";
    var files = myFile.files;
    var formData = new FormData();
    var file = files[0];
    formData.append("_file", "");
  } else {
    document.getElementById("erro_msg").innerHTML = "uploading..";
    var files = myFile.files;
    var formData = new FormData();
    var file = files[0];
    formData.append("_file", file, file.name);
  }

  formData.append("receiver", reciver_id);
  formData.append("_object", msg_obj.value);
  formData.append("_message", msg_content.value);

  var myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var resp_ = myReq.responseText;
     // console.log(resp_);
      var obj = JSON.parse(resp_);
      if (obj.error == "sucssus") {
        document.getElementById("erro_msg").innerHTML = "sendig sucssusfly";
        msg_obj.value = "";
        msg_content.value = "";
        myFile.value = "";
      } else {
        document.getElementById("erro_msg").innerHTML = obj.error;
      }
    }
  };

  myReq.open("post", "/json/set_new_message", true);
  myReq.send(formData);
}

function sync_sended_message() {
 // console.log("sended");
  var myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var mytable = document.getElementById("message_list_sended");

      var resp_ = myReq.responseText;
      var myObj = JSON.parse(resp_);
      mytable.innerHTML = null;
      for (var i = myObj.result.length - 1; i >= 0; i--) {
        var show_ = `veiw`;
        var msgImage = `<img src="static/images/open_msg.png" width="35" height="35" onclick="message_content('${myObj.result[i].msgID}')">`;
        var file = "";
        //console.log(typeof(myObj.showed[i]) + " " + myObj.showed[i]);
        if (myObj.result[i].showed == "0") {
          show_ = `not veiw`;
          msgImage = `<img src="static/images/close_msg.png" width="30" height="30" onclick="message_content('${myObj.result[i].msgID}')">`;
        }
        if (myObj.result[i].file != "") {
          file = `<a href="${myObj.result[i].file}" download="${myObj.result[i].file}">click</a>`;
        }
        var str = `<tr> <td>${msgImage}</td>  <td>${
          myObj.result[i].name + " " + myObj.result[i].prenom
        }</td>   <td>${myObj.result[i].object}</td>   <td>${
          myObj.result[i].message_content
        }</td>   <td>${file}</td>   <td>${show_}</td>  </tr>`;
        mytable.innerHTML = mytable.innerHTML + str;
      }
      //console.log(myObj);
    }
  };

  myReq.open("get", "/json/sended_message", true);
  myReq.send();
}
function sync_recived_message() {
  var myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var mytable = document.getElementById("message_list_recived");

      var resp_ = myReq.responseText;
      var myObj = JSON.parse(resp_);
      mytable.innerHTML = null;
      for (var i = myObj.result.length - 1; i >= 0; i--) {
        var file = "";
        var show_ = `veiw`;
        var msgImage = `<img src="static/images/open_msg.png" width="35" height="35" onclick="message_content('${myObj.result[i].msgID}')">`;
        //console.log(typeof(myObj.showed[i]) + " " + myObj.showed[i]);
        if (myObj.result[i].showed == "0") {
          show_ = `not veiw`;
          msgImage = `<img src="static/images/close_msg.png" width="30" height="30" onclick="message_content('${myObj.result[i].msgID}')">`;
        }
        if (myObj.result[i].file != "") {
          file = `<a href="${myObj.result[i].file}" download="${myObj.result[i].file}">click</a>`;
        }
        var str = `<tr> <td>${msgImage}</td>  <td>${
          myObj.result[i].name + " " + myObj.result[i].prenom
        }</td>   <td>${myObj.result[i].object}</td>   <td>${
          myObj.result[i].message_content
        }</td>   <td>${file}</td>   <td>${show_}</td>  </tr>`;
        mytable.innerHTML = mytable.innerHTML + str;
      }
    }
  };

  myReq.open("get", "/json/recived_message", true);
  myReq.send();
}
function sync_corby_message() {
  var myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var mytable = document.getElementById("message_list_corby");

      var resp_ = myReq.responseText;
      var myObj = JSON.parse(resp_);
      mytable.innerHTML = null;
      for (var i = myObj.result.length - 1; i >= 0; i--) {
        var show_ = `veiw`;
        var msgImage = `<img src="static/images/open_msg.png" width="35" height="35" onclick="message_content('${myObj.result[i].msgID}')">`;
        var file = "";
        //console.log(typeof(myObj.showed[i]) + " " + myObj.showed[i]);
        if (myObj.result[i].showed == "0") {
          show_ = `not veiw`;
          msgImage = `<img src="static/images/close_msg.png" width="30" height="30" onclick="message_content('${myObj.result[i].msgID}')">`;
        }
        if (myObj.result[i].file != "") {
          file = `<a href="${myObj.result[i].file}" download="${myObj.result[i].file}">click</a>`;
        }
        var str = `<tr> <td>${msgImage}</td>  <td>${
          myObj.result[i].name + " " + myObj.result[i].prenom
        }</td>   <td>${myObj.result[i].object}</td>   <td>${
          myObj.result[i].message_content
        }</td>   <td>${file}</td>   <td>${show_}</td>  </tr>`;
        mytable.innerHTML = mytable.innerHTML + str;
      }
    }
  };

  myReq.open("get", "/json/corby_message", true);
  myReq.send();
}

function message_content(mesage_id) {
  var sender_info = document.getElementById("sender_info");
  var reciver_info = document.getElementById("reciver_info");
  var object_info = document.getElementById("object_info");
  var message_info = document.getElementById("message_info");
  var file_info = document.getElementById("file_info");
  var button_corby = document.getElementById("to_corby");
  show_suitable_layout(4);

  var myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var resp_ = myReq.responseText;
      var myObj = JSON.parse(resp_);
      reciver_info.innerHTML = myObj.reciver.prenom + " " + myObj.reciver.name;
      sender_info.innerHTML = myObj.sender.prenom + " " + myObj.sender.name;
      object_info.innerHTML = myObj.message.object;
      message_info.innerHTML = myObj.message.message_content;
      if (myObj.message.file == "") file_info.innerHTML = `no file sent`;
      else file_info.innerHTML = `<a href="${myObj.message.file}">download</a>`;
      button_corby.setAttribute("onclick", `to_corby(${myObj.message.id})`);
      // console.log(myObj);
    }
  };

  myReq.open("get", "json//message_content/" + String(mesage_id), true);
  myReq.send();
}

function to_corby(mesage_id) {
 // console.log(mesage_id + " to corby\n");
  var myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var resp_ = myReq.responseText;
      var myObj = JSON.parse(resp_);
     // console.log(myObj);
    }
  };
  myReq.open("get", "json/corby_message/" + String(mesage_id), true);
  myReq.send();
}

function change_status() {
  var my_select = document.getElementById("change_status");
  var value = "";

  if (my_select.value == "on") {
    value = "on";
  } else if (my_select.value == "off") {
    value = "off";
  } else return;
 // console.log(value);

  var myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var resp_ = myReq.responseText;
      var myObj = JSON.parse(resp_);
      // console.log("good");
    }
  };

  myReq.open("get", "/json/change_status/" + String(value), true);
  myReq.send();
}

sync_recived_message();
sync_sended_message();
sync_corby_message();
