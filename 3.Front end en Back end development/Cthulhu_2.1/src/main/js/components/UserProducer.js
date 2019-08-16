import React from 'react';

class UserProcuder extends React.Component {
    render() {
        return <div className="UserBlock">
                   <p>UserName</p>
                   <input class="UserButton" type="submit" name="Block" value="Block"/>
                   <input class="UserButton" type="submit" name="Remove" value="Remove"/>
                </div>
                
    }
  }

export default UserProcuder