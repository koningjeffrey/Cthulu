import React from 'react';

import Nav from './Nav'

import Comments from './Comments'
import PlayerPromo from './PlayerPromo'

class Promo extends React.Component {
    render() {
        return <div>
                    <Nav/>
                    <div className="grid">
                        <PlayerPromo/>
                        <Comments id="item2"/>
                    </div>
                </div>
    }
  }

export default Promo