//Pagina met lijst van notificaties.
import React from 'react';

import Nav from './Nav'
import Notification from './Notification'

class Notifications extends React.Component {
    render() {
      return <div>
      <Nav/>
      <div className="FlexMiddle">
      <div className="Notification">
      <h1>Notifications</h1>

  </div>
  </div>
  </div>;
    }
  }

export default Notifications