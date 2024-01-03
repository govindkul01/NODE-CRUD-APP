const mysql = require('mysql2');

//Database connection
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_application'
});

mysqlConnection.connect((err)=>{
    if(err){
        console.log('Error in db connection');
    } else{
        console.log('Connected to database successfully')
    }
})

module.exports = mysqlConnection
