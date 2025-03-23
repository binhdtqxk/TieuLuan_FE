import './App.css'
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {routes} from './router'
function App() {

  return (
    <BrowserRouter>
     
     <Routes>
        {routes.map((item, index) => {
          const Page = item.Component;
          return <Route key={index} path={item.path} element={
                <Page />
          } />;
        })}
      </Routes>
   
    </BrowserRouter>

  )
}

export default App
