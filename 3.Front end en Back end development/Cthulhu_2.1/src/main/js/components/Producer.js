import React from 'react';

import Nav from './Nav'
import Upload from './Upload'
import PlayList from './PlayList'
import Comments from './Comments'

class Producer extends React.Component {
    
    constructor(props)  {
        super(props);
    }
    
    render() {
        return (
            <div>
            <Nav/>
                <div className="grid">
                    <Upload/>
                    <PlayList/>
                    <Comments/>
                </div>
            </div>
        );
    }
  }

export default Producer