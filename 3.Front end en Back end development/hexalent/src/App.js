import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <Router>
      <div className="App">
        <Link exact to="/">Register</Link>
        
          <Route path="/" component={Login}>Register</Route>
          <Route path="/Register" component={Register}>Register</Route>
      </div>
    </Router>
  );
}

export default App;
