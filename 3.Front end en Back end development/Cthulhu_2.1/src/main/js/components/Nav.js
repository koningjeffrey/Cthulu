import React from 'react';
import { Link } from 'react-browser-router';
import { history } from 'react-router-dom';
import Chat from './Chat'

class Nav extends React.Component {
    
    constructor(props)  {
        super(props);
            this.state = {  files: [], comments: [], currentFile: {}, currentUser:  {}, 
                            currentUserId: 0, currentFileId: 0, drop: false};
                        
            this.logoutUser = this.logoutUser.bind(this);
            this.clearLocalStorage = this.clearLocalStorage.bind(this);
            this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState({
            drop: !this.state.drop
        })
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
            <div className="menu">
                <ul>
                    <li><p onClick={this.toggle}>Chat</p></li>
                    <li><p onClick={this.toggle}>Notifications</p></li>
                    <li><Link to="/" onClick={this.logoutUser}><p>Logout</p></Link></li>
                </ul>
            </div>
            {this.state.drop && <Chat/>}
        </div>
        );
    }
  };

export default Nav