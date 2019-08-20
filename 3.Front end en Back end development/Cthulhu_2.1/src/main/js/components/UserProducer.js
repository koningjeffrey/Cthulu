import React from 'react';
import axios from 'axios';

class UserProducer extends React.Component {
    
    constructor(props)  {
        super(props);
        this.blockProducer = this.blockProducer.bind(this);
        this.deleteProducer = this.deleteProducer.bind(this);
    }
    blockProducer() {
        console.log("W.I.P.");
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
                   <input class="UserButton" type="submit" name="Remove" value="Remove" onClick={this.deleteProducer}/>
                </div>
        );
    }
  }

export default UserProducer