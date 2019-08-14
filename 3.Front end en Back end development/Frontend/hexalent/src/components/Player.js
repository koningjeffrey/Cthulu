import React from 'react';

class Player extends React.Component {
    render() {
      return  <div className="griditem">
                <h2>2. Listen and comment</h2>
                <div className="UserBlock">
                   <p>Title</p>
                   <p>User</p>
                   <input class="UserButton" type="submit" name="Play" value="Play"/>
                </div>
                <div className="UserBlock">
                   <p>Title</p>
                   <p>User</p>
                   <input class="UserButton" type="submit" name="Play" value="Play"/>
                </div>
                <div className="UserBlock">
                   <p>Title</p>
                   <p>User</p>
                   <input class="UserButton" type="submit" name="Play" value="Play"/>
                </div>
                <div className="UserBlock">
                   <p>Title</p>
                   <p>User</p>
                   <input class="UserButton" type="submit" name="Play" value="Play"/>
                </div>
                </div>;
    }
  }

export default Player