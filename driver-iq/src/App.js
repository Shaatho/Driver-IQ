import React from 'react';
import './App.css';



function App() {
  

const handleClick = () =>{
  window.location.href= "./signup";
  
}

  return  (
    

    <div className="dark">
      
      {
        <button onClick={handleClick}>Signup</button>
      }
      {
        <h2>Landing Page</h2>
      }
    </div>
  );
  
}

export default App;
