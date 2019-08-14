import React from 'react';
import UserPromo from './UserPromo';

class UserPromoters extends React.Component {
    render() {
        return <div>
                    <div className="griditem">
                        <h2>2. Promoters</h2>
                        <UserPromo/>
                        <UserPromo/>
                        <UserPromo/>
                        <UserPromo/>
                        <UserPromo/>
                        <UserPromo/>
                    </div>
                </div>
                
    }
  }

export default UserPromoters