import React from 'react';
import { Link} from 'react-router-dom';
import { history } from 'react-router-dom';
import axios from 'axios';


class Login extends React.Component {
    
    constructor(props) {
        super(props);
            this.state = {  currentUser:  null, currentUserId: 0,
                            currentUserRole: 0 };

            this.saveLocalStorage = this.saveLocalStorage.bind(this);
            this.loadLocalStorage = this.loadLocalStorage.bind(this);

            this.loginUser = this.loginUser.bind(this);

            this.lEmail = React.createRef();
            this.lPassword = React.createRef();
	}
        
        componentDidMount() {
            this.loadLocalStorage();
        }
        
        saveLocalStorage() {
            localStorage.setItem('email', this.lEmail.current.value);
            localStorage.setItem('password', this.lPassword.current.value);
        }
        
        loadLocalStorage() {
            this.lEmail.current.value = localStorage.getItem('email');
            this.lPassword.current.value = localStorage.getItem('password');
        }
        
        loginUser(e)   {
            e.preventDefault();
            const data = new FormData();
                data.append("email", this.lEmail.current.value);
                data.append("password", this.lPassword.current.value);
                
            axios.post(`/api/login`, data)
                    .then(result => {
                        const user = result.data;
                        this.setState({currentUser: user, currentUserRole: user.userRole, currentUserId: user.userId});
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
      return  (
            <div className="box">
              <img src="Hexalent_logo_white.png" alt="Logo"/>
              <form onSubmit={this.loginUser}>
                  <div className="inputBox">
                      <input type="text" name="email" ref={this.lEmail}/>
                      <label>Email</label>
                  </div>
                  <div className="inputBox">
                      <input type="password" name="password" ref={this.lPassword}/>
                      <label>Password</label>
                  </div>
                  <input type="submit" name="submit" value="Login User"/>
                  <div className="regfor">
                    <Link to='/Register'>Register account</Link>
                  </div>  
              </form>
            </div>
        );
    }
}

export default Login