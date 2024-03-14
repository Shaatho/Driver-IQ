
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import'firebase/compat/auth';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyABCp6AHwMzfv-VLBgjcNND80zQPy1lPx4",
  authDomain: "driver-iq.firebaseapp.com",
  projectId: "driver-iq",
  storageBucket: "driver-iq.appspot.com",
  messagingSenderId: "804585581407",
  appId: "1:804585581407:web:feb204f16cd79f889764ea"
};


const app = initializeApp(firebaseConfig);
export default app