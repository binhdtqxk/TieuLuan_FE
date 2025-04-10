import './App.css'
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {routes} from './router'
import AuthWrapper from './AuthWrapper';
function App() {

  return (
    <BrowserRouter>
     
     <AuthWrapper/>
   
    </BrowserRouter>

  )
}

export default App
