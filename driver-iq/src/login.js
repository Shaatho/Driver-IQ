import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { firebase } from './firebaseConfig'; // Import app, db, and firebase from firebaseConfig


const Signup = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, pass);
            const user = userCredential.user;
            
            if (user) {
                // Check if the user is an admin (You need to implement this)
                const isAdminUser = await checkAdminStatus(user);
                if (isAdminUser) {
                    setLoggedIn(true);
                    setIsAdmin(true);
                } else {
                    alert("You are not authorized as admin");
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const checkAdminStatus = async (user) => {
        // Define the admin email
        const adminEmail = 'admin@gmail.com';
    
        // Get the logged-in user's email
        const userEmail = user.email;
    
        // Check if the user's email matches the admin email
        const isAdmin = userEmail === adminEmail;
    
        return isAdmin;
    };
    

    if (loggedIn) {
        if (isAdmin) {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/home" />;
        }
    }

    return (
        <div>
            <div className="main_container_signup">
                <div className="header">
                    <h2>Login</h2>
                </div>
                <div className="box">
                    <input type='text' value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="box">
                    <input type='password' value={pass} placeholder="Password" onChange={(e) => setPass(e.target.value)}></input>
                </div>
                <p>Don't have an account <Link to="/signup">create account</Link></p>
                <button onClick={submit}>Login</button>
            </div>
        </div>
    );
};

export default Signup;
