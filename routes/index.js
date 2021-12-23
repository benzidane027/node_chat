var express = require("express");
var connecter = require("../json_respons/db_connecter");
var router = express.Router();
const path = require("path");
const uni_key = require("uniqid");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    login_error: req.session.login_error,
    singup_error: req.session.singup_error,
  });
});

router.post("/validate_login", function (req, res, next) {
  req.session.singup_error = null;

  req.check("email", "invalid email").isEmail().trim();
  req.check("password", "password less than 6 char").isLength({ min: 6 });

  const err = req.validationErrors();

  if (err) {
    console.log(err);
    req.session.login_error = err[0].msg;
    res.redirect("/");
  } else {
    req.session.login_error = "sucssus";
    connecter(
      `select * from profile where email="${req.body.email}" and password="${req.body.password}" ;`,
      (result) => {
        // console.log(result)

        if (result.length === 1) {
          req.session.login_error = "";

          req.session.user_id = result[0].id;
          req.session.first_name = result[0].name;
          req.session.last_name = result[0].prenom;
          req.session.photo = result[0].photo;
          req.session.status = result[0].status;
          req.session.email = result[0].email;
          req.session.password = result[0].password;

          
          connecter("update profile set status=1 where id="+req.session.user_id,(resualt)=>{
            res.redirect("/main");
          })

        } else {
          req.session.login_error = "invalid email or password";
          res.redirect("/");
        }
      }
    );
  }
});

router.post("/validate_singup", function (req, res, next) {
  req.session.login_error = null;

  req.check("fname", "invalid first name").isAlpha().trim();
  req.check("lname", "invalid last name").isAlpha().trim();
  req.check("email", "invalid email").isEmail().trim();
  req.check("password", "password not same").isIn(req.body.repassword);
  req.check("password", "password less then 6 char").isLength({ min: 6 });

  //image file validator
  let file_pic = null;
  let isimage = false;

  if (req.files) {
    let validation_image = {
      allowedExts: [".gif", ".jpeg", ".jpg", ".png", ".svg", ".blob"],
      allowedmime: [
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/x-png",
        "image/png",
        "image/svg+xml",
      ],
    };
    file_pic = req.files.picture_file;
    if (
      Number(file_pic.size) < 4194304 &&
      validation_image.allowedmime.indexOf(file_pic.mimetype) != -1 &&
      validation_image.allowedExts.indexOf(String(file_pic.name).slice(-4)) !=
        -1
    ) {
      isimage = true;
    } else {
      req.session.singup_error = "bad image file";
      res.redirect("/");
      return;
    }
  }
  //end

  const err = req.validationErrors();
  if (err) {
    //console.log(err);
    req.session.singup_error = err[0].msg;
    res.redirect("/");
  } else {
    connecter(
      `select * from profile where email="${req.body.email}"`,
      (resualt) => {
        //console.log(resualt)
        if (resualt.length == 1) {
          req.session.singup_error = "email already used";
          res.redirect("/");
        } else {
          let image_name = "";
          if (isimage) {
            image_name = uni_key() + String(file_pic.name).slice(-4);
            let image_path = path.join(
              __dirname + "/../user/profile_image",
              `${image_name}`
            );
            file_pic.mv(image_path, (err) => {
              //console.log(uni_key());
              if (err) {
                req.session.singup_error = "image: unexpected error ";
                res.redirect("/");
                return;
              }
            });
          }
          connecter(
            `insert into profile(name,prenom,password,photo,email) values("${req.body.fname}","${req.body.lname}","${req.body.password}","${image_name}","${req.body.email}");`,
            (resualt) => {
              // console.log(resualt)
              req.session.singup_error = "successfully registred";
              res.redirect("/");
            }
          );
        }
      }
    );
  }
});

module.exports = router;
