import React from 'react';

import Nav from './Nav'
import RegisterPromo from './RegisterPromo'
import UserProducers from './UserProducers'
import UserPromoters from './UserPromoters'

class Admin extends React.Component {
    render() {
        return (
            <div>
            <Nav {...this.props}/>
            <div className="grid">
                <UserProducers/>
                <UserPromoters/>
                <RegisterPromo/>
            </div>
            </div>
        );
    }
  }

export default Admin