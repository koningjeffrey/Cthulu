import React from 'react';
import axios from 'axios';

class Settings extends React.Component {

    constructor(props) {
        super(props);
            this.state = { };

    this.changeUser = this.changeUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    
    this.sFirstName = React.createRef();
    this.sLastName = React.createRef();
    this.sPassword = React.createRef();
    this.sCountry = React.createRef();
    }

    saveLocalStorage() {
        localStorage.setItem('password', this.sPassword.current.value);
    }

    changeUser(e)  {
        e.preventDefault();
        const data = new FormData();
            data.append("userId", this.props.currentUser.userId);
            data.append("firstName", this.sFirstName.current.value);
            data.append("lastName", this.sLastName.current.value);
            data.append("password", this.sPassword.current.value);
            data.append("country", this.sCountry.current.value);

        axios.post(`/api/changeUser`, data)
            .then(result => {
                const changedUser = result.data;
                this.setState({currentUser: changedUser });
                this.loginUser();
        });    
    }
    
    loginUser()   {
            const data = new FormData();
                data.append("email", this.state.currentUser.email);
                data.append("password", this.state.currentUser.password);
                
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
      <h1>Change user settings</h1>
      <form onSubmit={this.changeUser}>
          <div className="inputBox">
              <input type="text" ref={this.sFirstName}/>
              <label>First name</label>
          </div>
          <div className="inputBox">
              <input type="text" ref={this.sLastName}/>
              <label>Last name</label>
          </div>
          <div className="inputBox">
              <input type="text" ref={this.sCountry}/>
              <label>Country</label>
          </div>
          <div className="inputBox">
              <input    type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        title="Must contain at least one number and one uppercase and lowercase letter, 
                        and at least 8 or more characters (example:Passw0rd)"ref={this.sPassword}/>
              <label>Password</label>
          </div>
          <input type="submit" name="Submit" value="Submit" />
      </form>
  </div>;
    }
  }

export default Settings