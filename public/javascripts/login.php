
<script>
    function loading_page_funcion() {

        getUsers();
        sync_show_reception();
        sync_sended_message()
        show_reception("second");
        get_myInfo();
        setInterval(function() {
            sync();
        }, 4000);
    }

    function sync() {
        sync_show_reception();
        sync_sended_message();
        sync_show_corby_message();
        //  console.log("sync");
    }

    /******************************************************************************/
    

    function get_active_user() {
        var options = "";
        var myReq = new XMLHttpRequest();
        //myReq.onreadystatechange
        //  console.log("work"+" "+id_);
        myReq.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {

                var resp_ = myReq.responseText;

                myObj = JSON.parse(resp_);
                var x = document.getElementById("mySelect");
                x.innerHTML = null;
                var option = document.createElement("option");
                option.text = "active";
                x.add(option);
                //  myStatus.innerHTML=resp_;
                //console.log(myObj.id[1]);

                for (var i = 0; i < myObj.number; i++) {
                    var option = document.createElement("option");
                    option.text = myObj.name[i] + "  " + myObj.prenom[i];
                    x.add(option);
                }
            }

        }
        myReq.open("get", "get_user_active.php?user_id=" + String(<?php echo $userId ?>), true);
        myReq.send();
    }

    function con() {


        var myReq = new XMLHttpRequest();
        myReq.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {

                var resp_ = myReq.responseText;
                console.log(resp_);
            }
        }


        myReq.open("get", "new_msg.php", true);
        myReq.send();
    }



    function sync_show_reception() {
        var reciver = String(<?php echo $userId ?>);
        // console.log("sync reception work");
        var number_of_not_showed = 0;


        var myReq = new XMLHttpRequest();
        myReq.onreadystatechange = function() {

            if (this.readyState === 4 && this.status === 200) {
                // var myselect = document.getElementById("selcte_msg_page");
                var mytable = document.getElementById("message_list");
                var myTr = document.createElement("tr");
                var resp_ = myReq.responseText;
                myObj = JSON.parse(resp_);
                mytable.innerHTML = null;
                for (var i = myObj.number - 1; i >= 0; i--) {
                    var show_ = `<img src="img_icon/showed.png" width="16" height="13">`;
                    var msgImage = `<img src="img_icon/msg_img.png" width="30" height="30"  onclick="message_content_recive('${myObj.msgID[i]}')">`
                    var file = ""
                    // console.log(typeof(myObj.showed[i]) + " " + myObj.showed[i]);
                    if (myObj.showed[i] == "0") {
                        show_ = `<img src="img_icon/not-showed.png"  width="16" height="13">`;
                    }
                    if (myObj.file[i] != "") {
                        file = `<a href="${myObj.file[i]}" download="${myObj.file[i]}">click</a>`;
                    }
                    var str = `<tr> <td>${msgImage}</td>  <td>${myObj.sender_name[i]+" "+myObj.sender_prenom[i]}</td>   <td>${myObj.object[i]}</td>   <td>${myObj.message_content[i]}</td>   <td>${file}</td>   <td>${show_}</td>  </tr>`;
                    mytable.innerHTML = mytable.innerHTML + str;


                }
                //console.log(myObj);
            }
        }


        myReq.open("get", "get_msg.php?reciver=" + reciver, true);
        myReq.send();

    }

    


    function sync_sended_message() {
        var sender = String(<?php echo $userId ?>);

        // console.log("sync sended work");

        var number_of_not_showed = 0;


        var myReq = new XMLHttpRequest();
        myReq.onreadystatechange = function() {

            if (this.readyState === 4 && this.status === 200) {
                // var myselect = document.getElementById("selcte_msg_page");
                var mytable = document.getElementById("message_list_2");
                var myTr = document.createElement("tr");
                var resp_ = myReq.responseText;
                myObj = JSON.parse(resp_);
                mytable.innerHTML = null;
                for (var i = myObj.number - 1; i >= 0; i--) {
                    var show_ = `<img src="img_icon/showed.png" width="16" height="13">`;
                    var msgImage = `<img src="img_icon/msg_img.png" width="30" height="30" onclick="message_content_send('${myObj.msgID[i]}')">`
                    var file = ""
                    //console.log(typeof(myObj.showed[i]) + " " + myObj.showed[i]);
                    if (myObj.showed[i] == "0") {
                        show_ = `<img src="img_icon/not-showed.png"  width="16" height="13">`;
                    }
                    if (myObj.file[i] != "") {
                        file = `<a href="${myObj.file[i]}" download="${myObj.file[i]}">click</a>`;
                    }
                    var str = `<tr> <td>${msgImage}</td>  <td>${myObj.sender_name[i]+" "+myObj.sender_prenom[i]}</td>   <td>${myObj.object[i]}</td>   <td>${myObj.message_content[i]}</td>   <td>${file}</td>   <td>${show_}</td>  </tr>`;
                    mytable.innerHTML = mytable.innerHTML + str;


                }
                //console.log(myObj);
            }
        }


        myReq.open("get", "get_sended_msg.php?sender=" + sender, true);
        myReq.send();

    }

    

    function send() {


        var select_id = document.getElementById("selcte_users_id");

        var sender_id = <?php echo $userId ?>;
        var reciver_id = parseInt(select_id.value);
        if (reciver_id == -1) {
            document.getElementById("erro_msg").innerHTML = "no reciver selected";
            return;
        }

        var msg_obj = document.getElementById("my_msg_obj");
        var msg_content = document.getElementById("my_msg_content");
        var myFile = document.getElementById("file_src");

        document.getElementById("erro_msg").innerHTML = "file oploading";
        if (myFile.value == "") {
            document.getElementById("erro_msg").innerHTML = "uploading..";
            var files = myFile.files;
            var formData = new FormData();
            var file = files[0];
            formData.append("msg_file", "");
            console.log("not work");
        } else {
            document.getElementById("erro_msg").innerHTML = "uploading..";
            var files = myFile.files;
            var formData = new FormData();
            var file = files[0];
            formData.append("msg_file", file, file.name);
            //console.log("work");
        }

        formData.append("sender_id", sender_id);
        formData.append("reciver_id", reciver_id);
        formData.append("msg_obj", msg_obj.value);
        formData.append("msg_content", msg_content.value);

        var myReq = new XMLHttpRequest();
        myReq.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {

                var resp_ = myReq.responseText;
                console.log(resp_);
                if (resp_ == 1) {
                    document.getElementById("erro_msg").innerHTML = "sendig sucssusfly";
                    msg_obj.value = "";
                    msg_content.value = "";
                    myFile.value = "";
                    getUsers();
                    console.log(resp_);
                }
                if (resp_ == -1) {
                    document.getElementById("erro_msg").innerHTML = "no reciver selected";
                    console.log(resp_);
                }
                // console.log(typeof(resp_)+" " +resp_);

            }
        }
        var str = `sender_id=${sender_id}&reciver_id=${reciver_id}&msg_obj=${msg_obj.value}&msg_content=${msg_content.value}`;

        myReq.open("post", "new_msg.php", true);
        //  myReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        //  myReq.send(str);
        myReq.send(formData);
    }



    function getUsers() {


        var options = "";
        var myReq = new XMLHttpRequest();
        //myReq.onreadystatechange
        //  console.log("work"+" "+id_);
        myReq.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {

                var resp_ = myReq.responseText;

                myObj = JSON.parse(resp_);
                var x = document.getElementById("selcte_users_id");
                x.innerHTML = null;
                var option = document.createElement("option");
                option.text = "-----choose----";
                option.value = "-1";
                x.add(option);
                //  myStatus.innerHTML=resp_;
                //console.log(myObj.id[1]);

                for (var i = 0; i < myObj.number; i++) {
                    var option = document.createElement("option");
                    option.text = myObj.name[i] + "  " + myObj.prenom[i];
                    option.value = myObj.id[i];
                    x.add(option);

                }
            }

        }
        myReq.open("get", "getUser.php?user_id=" + String(<?php echo $userId ?>), true);
        myReq.send();
    }

    function message_content_recive(mesage_id) {
        hide_div();
        document.getElementById("sixth").style.display = "block";

        var myReq = new XMLHttpRequest();
        myReq.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {

                var resp_ = myReq.responseText;
                console.log(resp_);
                var myObj = JSON.parse(resp_);
                document.getElementById("email__").innerHTML = "<b>sender email:</b>    " + myObj.email[0];
                document.getElementById("name__").innerHTML = "<b>sender name:    </b>" + myObj.name[0];
                document.getElementById("prenom__").innerHTML = "<b>sender prenom: </b>" + myObj.prenom[0];
                document.getElementById("object__").innerHTML = myObj.object[0];
                document.getElementById("msg_content__").innerHTML = myObj.message_content[0];
                if (myObj.file[0] == "")
                    document.getElementById("file__").innerHTML = "no file send";
                else
                    document.getElementById("file__").innerHTML = `<a href="${myObj.file[0]}" download="${myObj.file[0]}">download</a>`;

                document.getElementById("btn_corby").innerHTML = `<button onclick="show_reception('second')" class="btn"> return </button><button onclick="message_to_corby('${String(mesage_id)}','${String(<?php echo $userId ?>)}')" class="btn"> corby</button>`;
            }
        }


        myReq.open("get", "message_content.php?message_id=" + String(mesage_id) + "&condition=messages.sender_id", true);
        myReq.send();
    }

    function message_content_send(mesage_id) {
        hide_div();
        document.getElementById("sixth").style.display = "block";

        var myReq = new XMLHttpRequest();
        myReq.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {

                var resp_ = myReq.responseText;
                // console.log(resp_);
                var myObj = JSON.parse(resp_);
                document.getElementById("email__").innerHTML = "reciver email:    " + myObj.email[0];
                document.getElementById("name__").innerHTML = "reciver name:    " + myObj.name[0];
                document.getElementById("prenom__").innerHTML = "reciver prenom: " + myObj.prenom[0];
                document.getElementById("object__").innerHTML = myObj.object[0];
                document.getElementById("msg_content__").innerHTML = myObj.message_content[0];
                if (myObj.file[0] == "")
                    document.getElementById("file__").innerHTML = "no file send";
                else
                    document.getElementById("file__").innerHTML = `<a href="${myObj.file[0]}" download="${myObj.file[0]}">download</a>`;
                document.getElementById("btn_corby").innerHTML = `<button onclick="show_reception('second')" class="btn"> return </button><button onclick="message_to_corby('${String(mesage_id)}','${String(<?php echo $userId ?>)}')" class="btn"> corby</button>`;

            }
        }


        myReq.open("get", "message_content.php?message_id=" + String(mesage_id) + "&condition=messages.reciver_id", true);
        myReq.send();
    }

    function message_to_corby(messageid, userid) {
        console.log(messageid + " " + userid);
        var myReq = new XMLHttpRequest();
        myReq.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {

                var resp_ = myReq.responseText;
                console.log(resp_);
            }
        }


        myReq.open("get", "message_to_corby.php?message_id=" + messageid + "&user_id=" + userid, true);
        myReq.send();

    }

    function sync_show_corby_message() {
        var user = String(<?php echo $userId ?>);

        // console.log("sync sended work");

        var number_of_not_showed = 0;


        var myReq = new XMLHttpRequest();
        myReq.onreadystatechange = function() {

            if (this.readyState === 4 && this.status === 200) {
                // var myselect = document.getElementById("selcte_msg_page");
                var mytable = document.getElementById("message_list_3");
                var myTr = document.createElement("tr");
                var resp_ = myReq.responseText;
              //  console.log(resp_);
                myObj = JSON.parse(resp_);
                mytable.innerHTML = null;
                for (var i = myObj.number - 1; i >= 0; i--) {
                    var show_ = `<img src="img_icon/showed.png" width="16" height="13">`;
                    var msgImage = `<img src="img_icon/msg_img.png" width="30" height="30">`
                    var file = ""
                    //console.log(typeof(myObj.showed[i]) + " " + myObj.showed[i]);
                    if (myObj.showed[i] == "0") {
                        show_ = `<img src="img_icon/not-showed.png"  width="16" height="13">`;
                    }
                    if (myObj.file[i] != "") {
                        file = `<a href="${myObj.file[i]}" download="${myObj.file[i]}">click</a>`;
                    }
                    var str = `<tr> <td>${msgImage}</td>  <td>${myObj.name[i]+" "+myObj.prenom[i]}</td>   <td>${myObj.object[i]}</td>   <td>${myObj.message_content[i]}</td>   <td>${file}</td>   <td>${show_}</td>  </tr>`;
                    mytable.innerHTML = mytable.innerHTML + str;


                }
                //console.log(myObj);
            }
        }


        myReq.open("get", "show_corby.php?user=" + user, true);
        myReq.send();

    }