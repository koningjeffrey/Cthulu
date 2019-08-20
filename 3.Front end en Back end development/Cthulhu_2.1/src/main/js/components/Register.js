import React from 'react';
import axios from 'axios';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };

class Register extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                firstName: null,
                lastName: null,
                email: null,
                password: null,
                formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            }
            };

    this.addUser = this.addUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    
    this.rFirstName = React.createRef();
    this.rLastName = React.createRef();
    this.rEmail = React.createRef();
    this.rPassword = React.createRef();
    this.rCountry = React.createRef();
    
    }

    handleSubmit(e){
        e.preventDefault();
    
        if (formValid(this.state)) {
          console.log(`
            --SUBMITTING--
            First Name: ${this.state.firstName}
            Last Name: ${this.state.lastName}
            Email: ${this.state.email}
            Password: ${this.state.password}
          `);
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    
      handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
          case "firstName":
            formErrors.firstName =
              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          case "lastName":
            formErrors.lastName =
              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characaters required" : "";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

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
        const { formErrors } = this.state;

      return  <div className="box">
      <h1>Register to become Hexalent</h1>
      <h2>in search of exellent talent.</h2>
      <form onSubmit={this.addUser}>
      <div className="inputBox">
              <input type="text" name="email" onChange={this.onChange} ref={this.rEmail}/>
              <label>E-mail</label>
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
          </div>
          <div className="inputBox">
              <input type="text" name="firstName" onChange={this.onChange} ref={this.rFirstName}/>
              <label>First name</label>
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
          </div>
          <div className="inputBox">
              <input type="text" name="lastName" onChange={this.onChange} ref={this.rLastName}/>
              <label>Last name</label>
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
          </div>
          <div className="inputBox">
              <input type="text" name="Country" onChange={this.onChange} ref={this.rCountry}/>
              <label>Country</label>
          </div>
          <div className="inputBox">
              <input type="password" name="password" onChange={this.onChange} ref={this.rPassword}/>
              <label>Password</label>
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
          </div>
          <input type="submit" name="Submit" value="Submit"/>
      </form>
  </div>;
    }
  }

export default Register