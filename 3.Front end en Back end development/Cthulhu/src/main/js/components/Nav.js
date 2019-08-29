import React from 'react';
import { Link } from 'react-browser-router';
import { history } from 'react-router-dom';

class Nav extends React.Component {
    
    constructor(props)  {
        super(props);
            this.state = {  files: [], comments: [], currentFile: {}, currentUser:  {}, 
                            currentUserId: 0, currentFileId: 0};
                        
            this.logoutUser = this.logoutUser.bind(this);
            this.clearLocalStorage = this.clearLocalStorage.bind(this);
    }
    
    logoutUser(e)    {
        e.preventDefault();
        this.clearLocalStorage();
        this.props.history.push('/Login');                
    }
    clearLocalStorage() {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    }
    
    render() {
      return (
        <div className="Nav">
            <h1>Dashboard</h1>
            <img src="Hexalent_logo_white.png" alt="Logo"/>
            <div>
                <Link to="/Settings"><p>Settings</p></Link>
                <Link to="/"><p>Logout</p></Link>
            </div>
        </div>
        );
    }
  };

export default Nav