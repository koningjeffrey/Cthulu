import React from 'react';
import axios from 'axios';

class Register extends React.Component {

    constructor(props) {
        super(props);
            this.state = {};

    this.addUser = this.addUser.bind(this);
    
    this.rFirstName = React.createRef();
    this.rLastName = React.createRef();
    this.rEmail = React.createRef();
    this.rPassword = React.createRef();
    this.rCountry = React.createRef();
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
                this.setState({message: "User Created!"});
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