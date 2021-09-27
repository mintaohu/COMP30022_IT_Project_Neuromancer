import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [name, setName] = useState('')
  const [email,setEmail] = useState('')
  const [tel,setTel] = useState('')

  const addToList = () =>{
    Axios.post('http://localhost:5000/insert',{
      name: name,
      email: email,
      tel: tel,
    });
  };

  return (
    <div className="App">
      <h1> Seeya Register</h1>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e)=>{
        setName(e.target.value);
      }}></input>
      <label>Email:</label>
      <input 
        type="text" 
        onChange={(e)=>{
        setEmail(e.target.value);
      }}></input>
      <label>Telephone:</label>
      <input 
        type="text" 
        onChange={(e)=>{
        setTel(e.target.value);
      }}></input>

      <button onClick={addToList}>Add To List</button>
    </div>
  );
}

export default App;
