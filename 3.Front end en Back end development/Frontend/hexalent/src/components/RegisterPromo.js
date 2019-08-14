import React from 'react';

class RegisterPromo extends React.Component {
    render() {
      return  <div className="griditem">
          <h2>3. Add promo</h2>
      <form>
      <div className="inputBox">
              <input type="text" ref={this.email}/>
              <label>E-mail</label>
          </div>
          <div className="inputBox">
              <input type="text" ref={this.firstName}/>
              <label>First name</label>
          </div>
          <div className="inputBox">
              <input type="text" ref={this.lastName}/>
              <label>Last name</label>
          </div>
          <div className="inputBox">
              <input type="text" ref={this.country}/>
              <label>Country</label>
          </div>
          <div className="inputBox">
              <input type="password" ref={this.password}/>
              <label>Password</label>
          </div>
          <input type="submit" name="Submit" value="Submit"/>
      </form>
  </div>;
    }
  }

export default RegisterPromo