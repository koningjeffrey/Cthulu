import axios from 'axios';
import React from 'react';
import ReactDOM from'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, NavLink, Prompt} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Producer from'./components/Producer';

class App extends React.Component {

	constructor(props) {
            super(props);
                this.state = {  files: [], comments: [], currentFile: {}, currentUser:  {}, 
                                currentUserId: null, currentFileId: null, message: ""};
                            
                this.loginUser = this.loginUser.bind(this);
                this.getUploads = this.getUploads.bind(this);
                this.currentUser = React.createRef();
                this.currentUserId = React.createRef();
                this.lUsername = React.createRef();
	}
        loginUser(currentUser)   {
            this.setState({currentUser: currentUser, currentUserId:currentUser.userId});
            this.getUploads();
        }
        getUploads() {
	  axios.get(`/api/files/` + this.state.currentUserId)
            .then(res => {
                const files = res.data;
                console.log(files);
                this.setState({ files: files });
        });
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
                                         render={(props) => <Register {...props} /> }  />
                             <Route exact path="/Producer"
                                         render={(props) => <Producer {...props}  /> }  />
                        </div>
                      </Switch>
                    </Router>
                    </div>
                    );
                }
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
);