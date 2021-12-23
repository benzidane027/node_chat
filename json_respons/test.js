const mysql = require("mysql");
const express =require("express")


/*
const fetch= require("node-fetch")
  fetch("google.com").then((res)=>{
    console.log(res.json());
  })*/


/*
let con = mysql.createConnection({
  host: 'localhost',
  port:3306,
  user: 'root',
  password: '@mine1997Amine',
  database:'chat_system'
});

console.log(con.state);
con.connect(function (err) {
  if (err) return "no data";

  console.log("conected");
  let sql = "show tables;";
  con.query(sql, (err, resualt) => {
    if (err) throw err;
    console.log("conn");
    console.log(resualt);

    //callback(resualt)
  });
});
*/

console.log("done");
