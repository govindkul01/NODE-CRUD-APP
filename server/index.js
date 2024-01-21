const express = require("express");
const dotenv = require("dotenv");
const ip = require("ip");
const app = express();
const mysql2= require("mysql2");
const bodyParser = require('body-parser');
const cors = require('cors');

// DOTENV is zero-dependency module that loads environment variables from a .env file into process.env
//Created a .env file in the root of project
dotenv.config();
const PORT = process.env.SERVER_PORT || 3001;

//dotenv.config();
const db = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});

//Enable CORS for all routes
app.use(cors());

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Create the record
app.post('/create', (req, res) => {
    const fname = req.body.fname;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query("INSERT INTO employee (fname, age, country, position, wage) VALUES (?,?,?,?,?)",
    [fname, age, country, position, wage],
     (err, result) => {
        if (err){
            console.log(err);
        }else{
            res.send("Data inserted successfully!");
        }
    }
    )
});

//View all records
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employee", (err, result) => {
        if (err) {
        console.log(err);
        }else{
            res.send(result);
        }
    
    })
})

//View records by id
app.get('/employee/:id', (req, res) => {
    db.query('SELECT * FROM employee WHERE id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    })
})

//Update the records by id
app.put('/update/:id', (req, res) => {
    console.log('received Put request', req.body);
    const id = req.params.id;
     const fname = req.body.fname;
     const age = req.body.age;
     const country = req.body.country;
     const position = req.body.position;
    const wage = req.body.wage;

   db.query('UPDATE employee SET fname=?, age=?, country=?, position=?,wage=? WHERE id=?', [fname, age, country, position, wage, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

//Delete record from the database
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);

        } else {
            res.send(result);
        }
    })
})


//Run on port

app.listen(PORT, () => console.log(`Server running on: ${ip.address()}:${PORT}`));


