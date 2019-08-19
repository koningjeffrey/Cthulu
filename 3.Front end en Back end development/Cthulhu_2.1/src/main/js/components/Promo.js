import React from 'react';

import Nav from './Nav'
import Footer from './Footer'

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
                    <Footer/>
                </div>
    }
  }

export default Promo