const mysql=require("mysql")
module.exports=function (sql,callback){

    let con=mysql.createConnection({
        host:"localhost",
        port:3306,
        user:"root",
        password:"@mine1997Amine",
        database:"chat_system"

    })
    con.connect(function (err){
        if (err) return "nodata"
       // console.log("conected")
        con.query(sql,(err,resualt)=>{
            if(err) throw err
            con.destroy()
            callback(resualt)
        })
    })
}