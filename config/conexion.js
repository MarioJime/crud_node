const mysql = require('mysql');
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'biblioteca',
    port:8080
    
});

conexion.connect((err)=>{
    if(err) {
        throw err;
    }else{
        console.log("Established connection");
    }
})

module.exports = conexion;