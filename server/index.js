const connection = require('./connection') //connection file
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //

//GET Method
app.get('/interns', (req, res) => {
    const q = "SELECT * FROM intern"
    connection.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

//GET by id
app.get('/interns/:ID', (req, res) => {
    connection.query('SELECT * FROM INTERN WHERE ID=?', [req.params.ID], (err, rows) => {
        if (err) {
            console.log(err);

        } else {
            res.send(rows);
        }
    })
})

//POST method
app.post("/interns", (req, res) => {
    const q = "INSERT INTO intern( `Name`, `Email`, `Salary`) VALUES (?)";
    const values = [
        req.body.Name,
        req.body.Email,
        req.body.Salary,
    ];

    connection.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("data added successfully")
    })
});

//Update method
app.put("/intern/:ID", (req, res) => {

    //const q = "UPDATE intern SET `Name`=?, `Email`=?, `Salary`=? WHERE ID=?";

    const uid = req.params.ID;
    const name = req.body.Name;
    const email = req.body.Email;
    const salary = req.body.Salary;

    connection.query('UPDATE intern SET Name=?,Email=?,Salary=? WHERE ID=?', [name, email, salary, uid], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Updated data successfully!");
        }
    })
})

//Delete method
app.delete('/intern/:ID', (req, res) => {

    connection.query('DELETE FROM intern WHERE ID=?', [req.params.ID], (err, rows) => {
        if (err) {
            console.log(err);

        } else {
            res.send("Deleted!");
        }
    })
})


//run on port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


