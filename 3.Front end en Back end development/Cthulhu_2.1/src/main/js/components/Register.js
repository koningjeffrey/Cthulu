import React from 'react';
import axios from 'axios';

class Register extends React.Component {

    constructor(props) {
        super(props);
            this.state = {};

    this.addUser = this.addUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    
    this.rFirstName = React.createRef();
    this.rLastName = React.createRef();
    this.rEmail = React.createRef();
    this.rPassword = React.createRef();
    this.rCountry = React.createRef();
    }

    saveLocalStorage() {
        localStorage.setItem('email', this.rEmail.current.value);
        localStorage.setItem('password', this.rPassword.current.value);
    }

    addUser(e)  {
        e.preventDefault();
        const data = new FormData();
            data.append("email", this.rEmail.current.value);
            data.append("firstName", this.rFirstName.current.value);
            data.append("lastName", this.rLastName.current.value);
            data.append("password", this.rPassword.current.value);
            data.append("country", this.rCountry.current.value);

        axios.post(`/api/user`, data)
            .then(result => {
                const createdUser = result.data;
                this.loginUser();
        });    
    }
    loginUser()   {
            const data = new FormData();
                data.append("email", this.rEmail.current.value);
                data.append("password", this.rPassword.current.value);
                
            axios.post(`/api/login`, data)
                    .then(result => {
                        const user = result.data;
                        this.setState({currentUser: user, currentUserRole: user.userRole});
                        this.saveLocalStorage();
                        this.props.loginUser(this.state.currentUser);
                        if(user !== "")  {
                            if(user.userRole === 0) {this.props.history.push('/Producer');}
                            if(user.userRole === 1) {this.props.history.push('/Promo');}
                            if(user.userRole === 2) {this.props.history.push('/Admin');}
                        } else {return null;}
            });            
    }

    render() {
      return  <div className="box">
      <h1>Register to become Hexalent</h1>
      <h2>in search of exellent talent.</h2>
      <form onSubmit={this.addUser}>
      <div className="inputBox">
              <input type="text" ref={this.rEmail}/>
              <label>E-mail</label>
          </div>
          <div className="inputBox">
              <input type="text" ref={this.rFirstName}/>
              <label>First name</label>
          </div>
          <div className="inputBox">
              <input type="text" ref={this.rLastName}/>
              <label>Last name</label>
          </div>
          <div className="inputBox">
              <input type="text" ref={this.rCountry}/>
              <label>Country</label>
          </div>
          <div className="inputBox">
              <input type="password" ref={this.rPassword}/>
              <label>Password</label>
          </div>
          <input type="submit" name="Submit" value="Submit"/>
      </form>
  </div>;
    }
  }

export default Register