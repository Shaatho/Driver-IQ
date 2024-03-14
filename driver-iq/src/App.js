import React from 'react';
import './App.css';
import Login from './login' ;


function App() {
  
const handleClick = () =>{
  window.location.href= "./login";
  
}

  return (
    <div className="dark">
      {
        <button onClick={handleClick}>Login</button>
      }
      {
        <h2>Landing Page</h2>
      }
    </div>
  );
}

export default App;
