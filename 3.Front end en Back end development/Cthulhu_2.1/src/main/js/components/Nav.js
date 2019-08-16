import React from 'react';
import { Link } from 'react-browser-router';

class Nav extends React.Component {
    render() {
      return  <div className="Nav">
        <h1>Dashboard</h1>
        <img src="Hexalent_logo_white.png" alt="Logo"/>
        <div>
            <Link to="/" onClick={this.logoutUser}><p>Logout</p></Link>
        </div>
    </div>;
    }
  }

export default Nav