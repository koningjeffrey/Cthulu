import React from 'react';
import UserProcuder from './UserProducer';

class UserProcuders extends React.Component {
    render() {
        return <div>
                    <div className="griditem">
                        <h2>1. Producers</h2>
                        <UserProcuder/>
                        <UserProcuder/>
                        <UserProcuder/>
                        <UserProcuder/>
                    </div>
                </div>
                
    }
  }

export default UserProcuders