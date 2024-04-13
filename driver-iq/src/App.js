import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './App.css'; // Import CSS file

const  App = () => {
    return (
        <div className="container">
            <div className="content">
                <h1 >DriverIQ</h1>
                <p className='slogan'>Making it easy to pass on the first try</p>
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
