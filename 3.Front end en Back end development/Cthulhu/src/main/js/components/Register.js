import React from 'react';
import axios from 'axios';

class Register extends React.Component {

    constructor(props) {
        super(props);
            this.state = { button: false, message:"" };

    this.addUser = this.addUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.check = this.check.bind(this);
    
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
    
    check(e)    {
        let reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        let reFirstName = /^[a-zA-Z][a-zA-Z .,'-]*$/;
        let reLastName = /^[a-zA-Z][a-zA-Z .,'-]*$/;
        let rePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;
        
        if(e.target.name === "email") {
            if(reEmail.test(this.rEmail.current.value) === false){
                this.setState({ button : false, message : "Enter a valid email adress!" });
            }else {
                this.setState({ message : "" });
            }}
        if(e.target.name === "firstName") {
            if(reFirstName.test(this.rFirstName.current.value) === false) {
                this.setState({ button : false, message : "Enter a valid first name!" });;
            }else {
                this.setState({ message : "" });
            }}
        if(e.target.name === "lastName") {
            if(reLastName.test(this.rLastName.current.value) === false) {
                this.setState({ button : false, message : "Enter a valid last name!" });
            }else {
                this.setState({ message : "" });
            }}
        if(e.target.name === "password") {
            if(rePassword.test(this.rPassword.current.value) === false) {
                this.setState({ button : false, message : "Enter a valid password!\n\
                (Password requires one lower case letter, one upper case letter, \n\
                 one digit, 6-13 length, and no spaces)" });
            }else {
                this.setState({ message : "" });
            }}
        if(reEmail.test(this.rEmail.current.value) === true &&
           reFirstName.test(this.rFirstName.current.value) === true &&
           reLastName.test(this.rLastName.current.value) === true &&
           rePassword.test(this.rPassword.current.value) === true) {
                this.setState({ button : true });
        }
    }

    render() {
      return ( 
      <div className="box">
        <h1>Register to become Hexalent</h1>
        <h2>in search of exellent talent.</h2>
        <form onSubmit={this.addUser}>
            <div className="inputBox">
                <input type="text" ref={this.rEmail} name="email" onBlur={this.check}/>
                <label>E-mail</label>
            </div>
            <div className="inputBox">
                <input type="text" ref={this.rFirstName} name="firstName" onBlur={this.check}/>
                <label>First name</label>
            </div>
            <div className="inputBox">
                <input type="text" ref={this.rLastName} name="lastName" onBlur={this.check}/>
                <label>Last name</label>
            </div>
            <div className="inputBox">
                <input type="text" ref={this.rCountry}/>
                <label>Country</label>
            </div>
            <div className="inputBox">
                <input type="password" ref={this.rPassword} name="password" onBlur={this.check}/>
                <label>Password</label>
            </div>
            <input type="submit" name="Submit" value="Submit" disabled={!this.state.button}/>
        </form>
        <p className="error">{this.state.message}</p>
      </div>
      );
    }
}

export default Register