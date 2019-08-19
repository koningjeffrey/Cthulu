import React from 'react';
import Player from './Player'

class PlayerPromo extends React.Component {
    render() {
      return  <div className="griditem" id="item1">
                <h2>2. Listen and comment</h2>
                    <div className="player"></div>
                    <div className="comments"></div>
                </div>;
    }
  }

export default PlayerPromo