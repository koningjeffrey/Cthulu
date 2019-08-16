import React from 'react';

import Player from './Player'

class PlayList extends React.Component {
    render() {
      return (
                <div className="griditem">
                    <h2>2. PlayList</h2>
                    <Player/> 
                </div>
                    );
    }
  };

export default PlayList