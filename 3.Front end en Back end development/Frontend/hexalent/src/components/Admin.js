import React from 'react';

import Nav from './Nav'
import RegisterPromo from './RegisterPromo'
import UserProcuders from './UserProducers'
import UserPromoters from './UserPromoters'

class Admin extends React.Component {
    render() {
        return <div>
        <Nav/>
        <div className="grid">
        <UserProcuders/>
        <UserPromoters/>
        <RegisterPromo/>
    </div>
    </div>
    }
  }

export default Admin