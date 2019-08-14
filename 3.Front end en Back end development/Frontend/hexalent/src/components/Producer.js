import React from 'react';

import Nav from './Nav'
import Upload from './Upload'
import Player from './Player'
import Comments from './Comments'

class Producer extends React.Component {
    render() {
        return <div>
        <Nav/>
        <div className="grid">
            <Upload/>
            <Player/>
            <Comments/>
        </div>
    </div>
    }
  }

export default Producer