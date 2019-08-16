import React from 'react';

class Player extends React.Component {
    render() {
      return (
                <div className="UserBlock">
                   <p>Title</p>
                   <p>User</p>
                   <input className="UserButton" type="submit" name="Play" value="Play"/>
                </div>
        );
    }
  };

export default Player