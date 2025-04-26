
import './App.css'
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {routes} from './router'
import AuthWrapper from './AuthWrapper';
import { StompProvider } from './contexts/WebSocketContext';
function App() {

  return (
    <BrowserRouter>
     <StompProvider>
     <AuthWrapper/>
     </StompProvider>
    </BrowserRouter>

  )
}

export default App
