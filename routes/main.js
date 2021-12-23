var express = require('express');
const session = require('express-session');
var va=require("express-validator")
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

   if(req.session.user_id==undefined)
        res.redirect("/")
    else
        res.render('main', { fname:req.session.first_name,lname:req.session.last_name,pic_profile_path:"http://localhost:3000/static/images/pic1.png"});
        //res.end(String(req.session.user_id))
});

module.exports = router;