import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, link} from "react-browser-router"

import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";


import Comments from "./Components/Comments";
import loginbox from "./Components/Loginbox";
import Player from "./Components/Player";


function App() {
    return (
      <div className="App">
            <Login />
            <Register />
            <Dashboard />
      </div>
  );
}

export default App;
