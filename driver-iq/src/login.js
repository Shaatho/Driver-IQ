import React, { useState } from "react";
import './login.css'
import { Link,Navigate} from "react-router-dom";
import firebase from './firebaseConfig';


const Signup = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [loggedIn, setLoggedIn] = useState(false);

    const submit = async(e)=>{
        e.preventDefault()
        try
        {
            const user =await firebase.auth().signInWithEmailAndPassword(email, pass)
            if(user){
                alert("Login Successfully")
                  setLoggedIn(true);
            }

        }catch(error)
        {
            alert(error)

        }
    };
    if (loggedIn) {
        return <Navigate to="/home" />; // Redirect to home page if loggedIn is true
    }
    return (
        <div>
         <div className="main_container_signup">
            <div className="header">
                <h2>Login</h2>
            </div>
            <div className="box">
                <input type ='text' value={email} placeholder="Email" onChange ={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="box">
                <input type ='text' value={pass} placeholder="Password" onChange={(e) => setPass(e.target.value)}></input>
            </div>
            <p>Don't have an account <Link to="/signup">create account</Link></p>
            <button onClick={submit}>login</button>
         </div>
        </div>
    )
}
export default Signup