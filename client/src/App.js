import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [id, setId] = useState(0);
  const [fname, setFname] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newFname, setNewFname] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newCountry, setNewCountry] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  //Add employee to database
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      fname: fname,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          fname: fname,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
      alert("Data added successfully!");
    });
  };

  //View all employees from db
  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
      //alert("Employee loaded successfully!");
    });
  };

  //View employee by id
  const getEmployeeById = (id) => {
    Axios.get(`http://localhost:3001/employee/${id}`).then((response) => {
      console.log(response.data);
      setEmployeeList(response.data);
      alert("Employee loaded successfully!");
    });
  };

  //Delete employee from db
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const updateDetails = (id) => {
    console.log("Employee id: ", id);
    const updatedFields = {
      fname: newFname,
      age: parseInt(newAge),
      country: newCountry,
      position: newPosition,
      wage: parseInt(newWage),
    };
    updateEmployee(id, updatedFields);
  };

  //Update employee field with existing id
  const updateEmployee = (id, updatedFields) => {
    Axios.put(`http://localhost:3001/update/${id}`, { ...updatedFields }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) =>
            val.id === id ? { ...val, ...updatedFields } : val
          )
        );
        UpdateForm(); //close the update form after update
      }
    );
  };

  const UpdateForm = (id) => {
    setShowUpdateForm(!showUpdateForm);
    setId(id);
  };

  return (
    //Field inputs to take from the user
    <div className="App">
      <h1 id="emp">Employee Management System</h1>
      <form className="employee-form">
        <div className="information">
          <label>Name: </label>
          <input
            type="text"
            onChange={(event) => {
              setFname(event.target.value);
            }}
          />
          <label>Age: </label>
          <input
            type="number"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
          <label>Country: </label>
          <input
            type="text"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />
          <label>Position: </label>
          <input
            type="text"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          />
          <label>Wage: </label>
          <input
            type="number"
            onChange={(event) => {
              setWage(event.target.value);
            }}
          />
        </div>
      </form>

      <div className="employees">
        <div className="btn-container">
          <button className="btn" onClick={addEmployee}>
            Add Employee
          </button>
          <button className="btn" onClick={getEmployees}>
            Show Employees
          </button>

          <button
            className="btn"
            onClick={() => {
              getEmployeeById(id);
            }}
          >
            view employee
          </button>
          <input
            type="number"
            className="eid"
            placeholder="enter id"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
        </div>

        {employeeList.map((val, key) => {
          return (
            <div className="employee" key={key}>
              <div>
                <h3>Name: {val.fname}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wages: {val.wage}</h3>
              </div>

              <div>
                <button id="upd" onClick={() => UpdateForm(val.id)}>
                  Update
                </button>

                <div>
                  <button
                    id="dlt"
                    onClick={() => {
                      deleteEmployee(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showUpdateForm && (
        <div className="update-form">
          <input
            type="text"
            placeholder="New Name..."
            onChange={(event) => {
              setNewFname(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="New Age..."
            onChange={(event) => {
              setNewAge(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="New Country..."
            onChange={(event) => {
              setNewCountry(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="New Position..."
            onChange={(event) => {
              setNewPosition(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="New Wage..."
            onChange={(event) => {
              setNewWage(event.target.value);
            }}
          />
          <button
            onClick={() => {
              updateDetails(id);
            }}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
