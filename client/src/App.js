import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const addToList = () =>{
    Axios.post('http://localhost:5000/login',{
      email: email,
      password: password,
    });
  };

  return (
    <div className="App">
      <h1> Seeya Login</h1>

      <label>Email:</label>
      <input 
        type="text" 
        onChange={(e)=>{
        setEmail(e.target.value);
      }}></input>
      <label>Password:</label>
      <input 
        type="text" 
        onChange={(e)=>{
        setPassword(e.target.value);
      }}></input>

      <button onClick={addToList}>Login</button>
    </div>
  );
}

export default App;
