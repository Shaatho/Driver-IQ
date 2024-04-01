
//import { initializeApp } from "firebase/app";

import'firebase/compat/auth';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'



const firebaseConfig = {
   apiKey: "AIzaSyABCp6AHwMzfv-VLBgjcNND80zQPy1lPx4",
  authDomain: "driver-iq.firebaseapp.com",
  projectId: "driver-iq",
  storageBucket: "driver-iq.appspot.com",
  messagingSenderId: "804585581407",
  appId: "1:804585581407:web:feb204f16cd79f889764ea"
};


const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const storage = app.storage();

export { app, db, storage,firebase };