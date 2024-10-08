import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app, db, firebase } from './firebaseConfig'; // Import app, db, and firebase from firebaseConfig

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, pass);
            const user = userCredential.user;
            if (user) {
                alert("Account Created Successfully");
                // Redirect to home page
                navigate('/login');
            }
        } catch (error) {
            alert(error.message); // error handling
        }
    };
    
    return (
        <div>
            <div className="main_container_signup">
                <div className="header">
                    <h2>Sign up</h2>
                </div>
                <div className="box">
                    <input type='text' value={name} placeholder="UserName" onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className="box">
                    <input type='text' value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="box">
                    <input type='text' value={pass} placeholder="Password" onChange={(e) => setPass(e.target.value)}></input>
                </div>
                <p>Already have an account <Link to="/login">Login</Link></p>
                <button onClick={submit}>Signup</button>
            </div>
        </div>
    )
}

export default Signup;
