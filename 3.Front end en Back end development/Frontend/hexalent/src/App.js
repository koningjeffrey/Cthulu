import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import Login from './components/Login'
import Register from './components/Register'
import Producer from './components/Producer'
import Promo from './components/Promo'
import Admin from './components/Admin'

import axios from 'axios';

class App extends React.Component{

  constructor(props) {
		super(props);
		this.state = {	currentUserID: 0, users: [], user: {},
						uploads: [], files: [], message: ""};

        this.setFileToUpload = this.setFileToUpload.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.getUploads = this.getUploads.bind(this);
		this.switchUser = this.switchUser.bind(this);
		this.getUsers = this.getUsers.bind(this);
		this.addUser = this.addUser.bind(this);

    this.email = React.createRef();
		this.firstName = React.createRef();
		this.lastName = React.createRef();
		this.country = React.createRef();
		this.password = React.createRef();
	}
	
	componentDidMount() {
		this.getUsers();
	}

	addUser(e) {
		e.preventDefault();
    const data = new FormData();
    data.append("email", this.email.current.value);
		data.append("firstName", this.firstName.current.value);
		data.append("lastName", this.lastName.current.value);
		data.append("country", this.country.current.value);
		data.append("password", this.password.current.value);

		axios.post(`/api/user`, data)
		.then(result => {
			const user = result.data;
			this.setState({ message: "User succesfully created" });
			this.getUsers();
			this.switchUser(null, user.id);
		})
	}

	switchUser(e, newValue) {
		this.setState({ message: "" });
		if(newValue == 0) {
			this.setState({ currentUserID: 0 });
			return;
		}
		axios.get(`/api/user/` + newValue)
		.then(res => {
			const user = res.data;
			this.setState({ user: user, currentUserID: user.id });
			this.getUploads();
		});
	}
	
	getUsers() {
		axios.get(`/api/users`)
		.then(res => {
			const users = res.data;
			this.setState({ users: users });
		});
	}

	getUploads() {
	  axios.get(`/api/uploads/` + this.state.user.id)
      .then(res => {
        const uploads = res.data;
        console.log(uploads);
        this.setState({ uploads: uploads });
      })
	}

	setFileToUpload(e) {
		console.log(e.target.files[0]);
		this.setState({files: e.target.files});
	}

	uploadFile(e) {
		e.preventDefault();
		const data = new FormData();
        data.append('file', this.state.files[0]);
		data.append('id', this.state.user.id);
		
		axios.post(`/api/upload`, data)
		.then(result => {
			const message = result.data;
			this.setState({ message: message });
			this.getUploads();
		})
  }
  
  render() {
  return (
    <Router>
      <Switch>
        <div className="App">
            <Route exact path="/" component={Login}/>
            <Route exact path="/Register" component={Register}/>
            <Route exact path="/Producer" component={Producer}/>
            <Route exact path="/Promo" component={Promo}/>
            <Route exact path="/Admin" component={Admin}/>
        </div>
      </Switch>
    </Router>
  );
  }
}

export default App;
