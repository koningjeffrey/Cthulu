import React from 'react';

class RegisterPromo extends React.Component {
    
    
    render() {
      return  (
        <div className="griditem">
          <h2>3. Add promo</h2>
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
        </div>
      );
    }
}

export default RegisterPromo