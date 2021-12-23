var express = require("express");
var router = express.Router();
const uni_key = require("uniqid");
const path = require("path");

const connecter = require("./db_connecter");
const { request } = require("http");
const { json } = require("express");

router.get("/user_active", function (req, res, next) {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }
  connecter(
    `select name,prenom,photo from profile where status=1 `,
    (result) => {
      //console.log(result);
      res.json({ result });
    }
  );
});
router.get("/sended_message", function (req, res, next) {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  let user_id = Number(req.session.user_id);
  let sql =
    "SELECT profile.name,profile.prenom,profile.photo,messages.object,messages.message_content,messages.file,messages.showed,profile.id as prID,messages.id as msgID FROM `profile`,`messages` WHERE messages.sender_id=" +
    user_id +
    " and profile.id=messages.reciver_id and (" +
    user_id +
    ",messages.id) not IN(SELECT userID,msgID FROM corby) order by messages.id ";

  connecter(sql, (result) => {
    // console.log(result);
    res.json({ result });
  });
});

router.get("/recived_message", function (req, res, next) {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  let user_id = Number(req.session.user_id);
  let sql =
    "SELECT profile.name,profile.prenom,profile.photo,messages.object,messages.message_content,messages.file,messages.showed,profile.id as prID,messages.id as msgID FROM `profile`,`messages` WHERE messages.reciver_id=" +
    user_id +
    " and profile.id=messages.sender_id and (" +
    user_id +
    ",messages.id) not IN(SELECT userID,msgID FROM corby) order by messages.id ";

  connecter(sql, (result) => {
    // console.log(result);
    res.json({ result });
  });
});

router.get("/corby_message", function (req, res, next) {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  let user_id = Number(req.session.user_id);
  let sql =
    "SELECT  profile.name,profile.prenom,profile.photo,messages.object,messages.message_content,messages.file,messages.showed,profile.id as prID,messages.id as msgID FROM `profile`,`messages` WHERE (profile.id=messages.sender_id or profile.id=messages.reciver_id) and profile.id!=" +
    user_id +
    " and (" +
    user_id +
    ",messages.id) IN(SELECT userID,msgID FROM corby) order by messages.id ;";

  connecter(sql, (result) => {
    // console.log(result);
    res.json({ result });
  });
});
router.get("/message_content/:id", function (req, res, next) {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  let message_id = req.params.id;
  let sql = "SELECT  * FROM `messages` WHERE id=" + message_id;
  connecter(sql, (result) => {
    // console.log(result);
    let message = result;
    connecter(
      `select name,prenom,photo from profile where id=${message[0].sender_id}`,
      (result) => {
        let sender = result;
        connecter(
          `select name,prenom,photo from profile where id=${message[0].reciver_id}`,
          (result) => {
            let reciver = result;

            connecter(
              `update  messages  set showed=1 where id=${req.params.id}`,
              (result) => {
                res.json({
                  message: message[0],
                  sender: sender[0],
                  reciver: reciver[0],
                });
              }
            );
          }
        );
      }
    );
  });
});

router.get("/user_info", function (req, res, next) {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  let user_id = Number(req.session.user_id);
  let sql = "SELECT  * FROM `profile` WHERE id=" + user_id;
  connecter(sql, (result) => {
    // console.log(result);
    res.json({ result });
  });
});

router.post("/set_new_message", function (req, res, next) {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  let user_id = Number(req.session.user_id);

  let receiver_id = req.body.receiver;
  console.log(receiver_id);
  let object = req.body._object;
  let message = req.body._message;
  let file_name = "";
  req.check("_object", "object is empty").trim().notEmpty();
  req.check("_message", "error with message").trim();
  req.check("receiver", "bad user selected").isDecimal();
  let err = req.validationErrors();
  if (err) {
    res.json({ error: err[0].msg });
    return;
  }
  if (req.files) {
    let __file = req.files._file;
    file_name = uni_key() + String(__file.name).slice(-4);
    let file_path = path.join(
      __dirname + "/../user/message_file",
      `${file_name}`
    );
    __file.mv(file_path, (err) => {
      //console.log(uni_key());
      if (err) {
        res.json({ error: "error with file" });
        return;
      }
    });
  }
  let sql = `insert into messages(sender_id,reciver_id,object,message_content,file)values(${user_id},${receiver_id},"${object}","${message}","${file_name}")`;
  connecter(sql, (result) => {
    // console.log(result);
    res.json({ error: "sucssus" });
  });
});

router.get("/all_users", function (req, res, next) {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  let user_id = Number(req.session.user_id);
  let sql =
    "SELECT id,name,prenom,photo,status FROM `profile` where id!=" +
    req.session.user_id;
  connecter(sql, (result) => {
    // console.log(result);
    res.json({ result });
  });
});
router.get("/deconnect", function (req, res, next) {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }
  let user_id = req.session.user_id;
  req.session.destroy((err) => {
    if (err) {
      res.end("error on log out");
    }
    connecter("update profile set status=0 where id=" + user_id, (resualt) => {
      res.redirect("/");
    });
  });
});
router.post("/update_myinfo", (req, res) => {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }
  let first_name = req.body.fname;
  let last_name = req.body.lname;
  let email = req.body.email;
  let photo = "";
  let password = req.body.password;
});

router.get("/corby_message/:id", (req, res) => {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  connecter(
    `insert into corby values(${parseInt(req.session.user_id)},${parseInt(
      req.params.id
    )})`,
    (result) => {
      res.json("suc");
    }
  );
});
router.get("/change_status/:value", (req, res) => {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  if (req.params.value === "on") {
    connecter(
      "update profile set status=1 where id=" + req.session.user_id,
      (resualt) => {
        res.json({err:"suc"});
      }
    )
  } else if (req.params.value === "off") {
    connecter(
      "update profile set status=0 where id=" + req.session.user_id,
      (resualt) => {
        res.json({err:"suc"});
      }
    )
  } else {
    req.end("err")
  }
});
router.get("/test",(req,res)=>{

  res.json({test:1230});
})
module.exports = router;
