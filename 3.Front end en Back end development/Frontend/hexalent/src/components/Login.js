import React from 'react';
import {Link} from 'react-browser-router'

class Login extends React.Component {
    render() {
      return  <div className="box">
      <img src="Hexalent_logo_white.png" alt="Logo"/>
      <form action="/promo.html">
          <div className="inputBox">
              <input type="text" name="username" required="admin"/>
              <label>Username</label>
          </div>
          <div className="inputBox">
              <input type="password" name="password" required="admin"/>
              <label>Password</label>
          </div>
          <input type="submit" name="submit" value="Submit" href="promo.html"/>
          <div className="regfor">
              <Link to='/Register'>Register account</Link>
          </div>  
      </form>
  </div>;
    }
  }

export default Login