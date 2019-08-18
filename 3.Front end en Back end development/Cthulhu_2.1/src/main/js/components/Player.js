import React from 'react';

class Player extends React.Component {
    
    render() {
      return (
                <div className="UserBlock">
                   <p>{this.props.name}</p>
                   <p>{this.props.currentUser.email}</p>
                   <input className="UserButton" type="submit" name="Play" value="Play"/>
                </div>
        );
    }
  };

export default Player