
const express = require("express");
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeesystem'
})

//Enable CORS for all routes
app.use(cors());

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Create the record
app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query("INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
     (err, result) => {
        if (err){
            console.log(err);
        }else{
            res.send("Data inserted successfully!");
        }
    }
    )
});

//View the records
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
        console.log(err);
        }else{
            res.send(result);
        }
    
    })
})

//View the records by id

app.get('/employee/:id', (req, res) => {
    db.query('SELECT * FROM employees WHERE id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);

        } else {
            res.send(rows);
        }
    })
})



//Update the records by id

app.put('/update', (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query('UPDATE employees SET wage=? WHERE id=?', [wage, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

//Delete the record from the database

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);

        } else {
            res.send(result);
        }
    })
})


//Run on port

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


