import './App.css'
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/login/login';
function App() {

  return (
    <Router>
      <Switch>
          <Route path="/about">
            about
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
            abc
          </Route>
        </Switch>
    </Router>
  )
}

export default App
