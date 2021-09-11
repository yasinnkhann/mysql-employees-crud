import react, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [newWage, setNewWage] = useState(0);

  const nameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const countryInputRef = useRef(null);
  const positionInputRef = useRef(null);
  const wageInputRef = useRef(null);
  const newWageInputRef = useRef(null);



  const getEmployees = () => {
    axios.get(`http://localhost:3001/employees`)
    .then(res => {
      setEmployeeList(res.data);
      console.log(res.data)
    })
    .catch(err => {
      console.error(err); 
    })
  };

  const addEmployee = () => {
    axios.post('http://localhost:3001/create', { 
      name, age, country, position, wage 
    })
    .then(() => {
      setEmployeeList([...employeeList, {name, age, country, position, wage}])
    })
    .catch(err => {
      console.error(err); 
    })
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    countryInputRef.current.value = '';
    positionInputRef.current.value = '';
    wageInputRef.current.value = '';
  };

  const updateEmployeeWage = id => {
    axios.put(`http://localhost:3001/update`, {
      wage: newWage,
      id
    })
    .then(() => {
      setEmployeeList(employeeList.map((val) => {
        return val.id === id ? {id: val.id, name: val.name, country: val.country, age: val.age, position: val.position, wage: newWage} : val
      }))
    })
    .catch(err => {
      console.error(err); 
    })
    newWageInputRef.current.value = '';
  };

  const deleteEmployee = id => {
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(() => {
      setEmployeeList(employeeList.filter((val) => {
        return val.id !== id
      }))
    })
    .catch(err => {
      console.error(err); 
    })
  };

  return (
    <div className="App">

      <div className="information">
        <label>Name:</label>
        <input
         type="text" 
         onChange={(e) => setName(e.target.value)}
         ref={nameInputRef}
         />

        <label>Age:</label>
        <input 
        type="number"
        onChange={(e) => setAge(e.target.value)}
        ref={ageInputRef}
        />

        <label>Country:</label>
        <input 
        type="text"
        onChange={(e) => setCountry(e.target.value)}
        ref={countryInputRef}
        />

        <label>Position:</label>
        <input
        type="text"
        onChange={(e) => setPosition(e.target.value)}
        ref={positionInputRef}
        />

        <label>Wage (year):</label>
        <input 
        type="number"
        onChange={(e) => setWage(e.target.value)}
        ref={wageInputRef}
         />

        <button 
        onClick={() => addEmployee()}
        >
          Add Employee
        </button>
      </div>

      <br />

      <div className="employees">
        <button
         onClick={() => getEmployees()}
        >
          Show Employees
        </button>

        {employeeList.map((val) => (
            <div className="employee" key={val.id}>

              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>

              <div>
                <input type="text"
                placeholder="Update wage.."
                onChange={(e) => setNewWage(e.target.value)}
                ref={newWageInputRef}
                />
                <button 
                onClick={() => updateEmployeeWage(val.id)}
                >
                  Update
                </button>

                <button 
                onClick={() => deleteEmployee(val.id)}
                >
                  Delete
                </button>
              </div> 

            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
