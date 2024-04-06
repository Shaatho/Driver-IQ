import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './login';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import App from './App';
import Signup from './signup';
import "./signup.css"
import Home from './Home';
import Chapters from './Chapters';
import Admin from './admin';
import ChapterFlashcards from './Flashcards';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<App/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/chapters' element={<Chapters/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/chapter/:id' element = {<ChapterFlashcards/>}/>
      </Routes>
    </BrowserRouter>
  </div>
);

