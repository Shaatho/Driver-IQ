import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './App.css'; // Import CSS file

const  App = () => {
    return (
        <div className="container">
            <div className="content">
                <h1>Driver IQ</h1>
                <p>Making passing at the first try an easy feat</p>
                <div className="buttons">
                    {/* Link to login page */}
                    <Link to="/login" className="login-button">Login</Link>
                    {/* Link to sign-up page */}
                    <Link to="/signup" className="signup-button">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default App;
