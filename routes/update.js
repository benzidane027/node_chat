var express = require("express");
var router = express.Router();
const connecter = require("../json_respons/db_connecter");

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  res.render("update_profile", {
    fname: req.session.first_name,
    lname: req.session.last_name,
    email: req.session.email,
    error_on_update: req.session.error_on_update,
    error_on_change: req.session.error_on_change,
  });
});

router.post("/apply_uptate_info", (req, res) => {
  req.session.error_on_change = "";
  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }

  req.check("fname", "invalid first name").isAlpha().trim();
  req.check("lname", "invalid last name").isAlpha().trim();
  req.check("email", "invalid email").isEmail().trim();
  req.check("c_password", "password erro").custom((a) => {
    return a == req.session.password ? true : false;
  });

  let err = req.validationErrors();
  if (err) {
    req.session.error_on_update = err[0].msg;
    res.redirect("/update");
  } else {
    connecter(
      `select * from profile where email="${req.body.email}"`,
      (resualt) => {
        if (resualt.length == 1 && req.body.email != req.session.email) {
          req.session.error_on_update = "email already used";
          res.redirect("/update");
        } else {
          connecter(
            `update profile set name="${req.body.fname}",prenom="${req.body.lname}",email="${req.body.email}" where id=${req.session.user_id}`,
            (resualt) => {
              req.session.error_on_update = "secssufly update info";
              req.session.first_name = req.body.fname;
              req.session.last_name = req.body.lname;
              req.session.email = req.body.email;
              res.redirect("/update");
            }
          );
        }
      }
    );
  }
});

router.post("/apply_password_change", (req, res) => {
  req.session.error_on_update = "";

  if (req.session.user_id == undefined) {
    res.redirect("/");
    return;
  }
  req.check("n_password", "password less than 6 char").isLength({ min: 6 });
  req
    .check("n_password", "password error not same")
    .equals(String(req.body.ren_password));
  req
    .check("c_password", "current password error")
    .isIn(String(req.session.password));

  let err = req.validationErrors();
  if (err) {
    req.session.error_on_change = err[0].msg;
    res.redirect("/update");
  } else {
    connecter(
      `update profile set password="${req.body.n_password}" where id=${req.session.user_id}`,
      (resualt) => {
        req.session.error_on_change = "password sucssfuly updated";
        req.session.password=req.body.n_password
        res.redirect("/update");
      }
    );
  }
});

module.exports = router;
