import React from 'react';
import axios from 'axios';

class UserProducer extends React.Component {
    
    constructor(props)  {
        super(props);
        this.blockProducer = this.blockProducer.bind(this);
        this.unblockProducer = this.unblockProducer.bind(this);
        this.deleteProducer = this.deleteProducer.bind(this);
    }
    blockProducer() {
       const data = new FormData();
                data.append("userId", this.props.producer.userId);
         axios.post(`/api/user/block`, data)
            .then(res => {
                const blockedUser = res.data;
                console.log("User succesfully blocked!" + blockedUser);
          });
    }
    unblockProducer()   {
        const data = new FormData();
            data.append("userId", this.props.producer.userId);
        axios.post(`/api/user/unblock`, data)
                .then(res => {
                    const unblockedUser = res.data;
                    console.log("User succesfully unblocked!" + unblockedUser);
        });
    }
    deleteProducer()    {
        const data = new FormData();
                data.append("userId", this.props.producer.userId);
         axios.post(`/api/user/delete`, data)
            .then(res => {
                const deletedUser = res.data;
                console.log("User succesfully deleted!" + deletedUser);
          });
    }
    render() {
        return (
                <div className="UserBlock">
                   <p>{this.props.producer.email}</p>
                   <input class="UserButton" type="submit" name="Block" value="Block" onClick={this.blockProducer}/>
                   <input class="UserButton" type="submit" name="Unblock" value="Unblock" onClick={this.unblockProducer}/>
                   <input class="UserButton" type="submit" name="Remove" value="Remove" onClick={this.deleteProducer}/>
                </div>
        );
    }
  }

export default UserProducer