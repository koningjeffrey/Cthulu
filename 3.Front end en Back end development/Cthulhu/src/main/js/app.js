import axios from 'axios';
import React from 'react';
import ReactDOM from'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Producer from './components/Producer';
import Promo from './components/Promo';
import Admin from './components/Admin';
import Settings from './components/Settings';

class App extends React.Component {

	constructor(props) {
            super(props);
                this.state = {  files: [], comments: [], currentFile: {}, currentUser:  {}, 
                                currentUserId: 0, currentFileId: 0, message: ""};
                            
                this.loginUser = this.loginUser.bind(this);
                this.logoutUser = this.logoutUser.bind(this);
	}
        loginUser(currentUser)   {
            this.setState({currentUser: currentUser, currentUserId:currentUser.userId});
        }
        logoutUser()    {
            this.setState({files: [], comments: [], currentFile: {}, currentUser:  {}, 
                                currentUserId: 0, currentFileId: 0, message: ""});
        }

	render() {
		return (
                
                    <div>  
                     <Router>
                      <Switch>
                        <div className="App">
                            <Route exact path="/" 
                                         render={(props) => <Login {...props} currentUser={this.state.currentUser} loginUser={this.loginUser} /> }  />
                            <Route exact path="/Register" 
                                         render={(props) => <Register {...props} currentUser={this.state.currentUser} loginUser={this.loginUser}/> }  />
                            <Route exact path="/Producer"
                                         render={(props) => <Producer {...props} currentUser={this.state.currentUser} /> }  />
                            <Route exact path="/Promo"
                                         render={(props) => <Promo {...props} currentUser={this.state.currentUser} /> } />
                            <Route exact path="/Admin"
                                         render={(props) => <Admin {...props} currentUser={this.state.currentUser} /> } />
                            <Route exact path="/Settings"
                                         render={(props) => <Settings {...props} currentUser={this.state.currentUser} /> } />                     
                        </div>
                      </Switch>
                    </Router>
                    </div>
                    );
                }
}

export default App;