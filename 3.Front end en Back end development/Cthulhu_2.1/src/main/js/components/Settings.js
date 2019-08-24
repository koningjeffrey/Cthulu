import React from 'react';
import axios from 'axios';

class Settings extends React.Component {

    constructor(props) {
        super(props);
            this.state = { button: false, message:"" };

    this.changeUser = this.changeUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.check = this.check.bind(this);
    
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
    
    check(e)    {
        let reFirstName = /^[a-zA-Z][a-zA-Z .,'-]*$/;
        let reLastName = /^[a-zA-Z][a-zA-Z .,'-]*$/;
        let rePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;
        
        if(e.target.name === "firstName") {
            if(reFirstName.test(this.sFirstName.current.value) === false) {
                this.setState({ button : false, message : "Enter a valid first name!" });;
            }else {
                this.setState({ message : "" });
            }}
        if(e.target.name === "lastName") {
            if(reLastName.test(this.sLastName.current.value) === false) {
                this.setState({ button : false, message : "Enter a valid last name!" });
            }else {
                this.setState({ message : "" });
            }}
        if(e.target.name === "password") {
            if(rePassword.test(this.sPassword.current.value) === false) {
                this.setState({ button : false, message : "Enter a valid password!\n\
                (Password requires one lower case letter, one upper case letter, \n\
                 one digit, 6-13 length, and no spaces)" });
            }else {
                this.setState({ message : "" });
            }}
        if(reFirstName.test(this.sFirstName.current.value) === true &&
           reLastName.test(this.sLastName.current.value) === true &&
           rePassword.test(this.sPassword.current.value) === true) {
                this.setState({ button : true });
        }
    }

    render() {
      return  (
            <div className="box">
                <h1>Change user settings</h1>
                <form onSubmit={this.changeUser}>
                  <div className="inputBox">
                      <input type="text" ref={this.sFirstName} name="firstName" onBlur={this.check}/>
                      <label>First name</label>
                  </div>
                  <div className="inputBox">
                      <input type="text" ref={this.sLastName} name="lastName" onBlur={this.check}/>
                      <label>Last name</label>
                  </div>
                  <div className="inputBox">
                      <input type="text" ref={this.sCountry}/>
                      <label>Country</label>
                  </div>
                  <div className="inputBox">
                      <input type="password" ref={this.sPassword} name="password" onBlur={this.check}/>
                      <label>Password</label>
                  </div>
                  <input type="submit" name="Submit" value="Submit" disabled={!this.state.button}/>
                </form>
            </div>
        );
    }
  }

export default Settings