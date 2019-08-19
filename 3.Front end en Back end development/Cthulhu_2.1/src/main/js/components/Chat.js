import React from 'react';

import Nav from './Nav'
import Notification from './Notification'

class Chat extends React.Component {
    render() {
      return <div>
                <Nav/>
                    <div className="FlexMiddle">
                        <div className="Notification">
                            <h1>Notifications</h1>
                            <Notification/>
                            <Notification/>
                            <Notification/>
                            <Notification/>
                            <Notification/>
                            <Notification/>
                            <Notification/>
                            <Notification/>
                            <Notification/>
                            <Notification/>
                            <Notification/>
                            <Notification/>
                        </div>
                    </div>
                </div>;
    }
  }

export default Chat