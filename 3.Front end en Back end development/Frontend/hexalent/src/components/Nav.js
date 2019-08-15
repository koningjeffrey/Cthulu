import React from 'react';
import { Link } from 'react-browser-router';

class Nav extends React.Component {
    render() {
      return  <div className="Nav">
        <Link to="/Producer"><h1>Dashboard</h1></Link>
        <Link to="/Producer"><img src="Hexalent_logo_white.png" alt="Logo"/></Link>
        <div>
        <Link to="/Notifications"><p>Notifications</p></Link>
            <Link to="/"><p>Logout</p></Link>
        </div>
    </div>;
    }
  }

export default Nav