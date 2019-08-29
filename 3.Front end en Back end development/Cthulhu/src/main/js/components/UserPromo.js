import React from 'react';
import axios from 'axios';

class UserPromo extends React.Component {
    
    constructor(props)  {
        super(props);
        this.deletePromoter = this.deletePromoter.bind(this);
    }
    deletePromoter()    {
        const data = new FormData();
                data.append("userId", this.props.promoter.userId);
         axios.post(`/api/user/delete`, data)
            .then(res => {
                const deletedUser = res.data;
                console.log("User succesfully deleted!" + deletedUser);
                this.props.updatePromoters();
          });
    }
    
    render() {
        return (
            <div className="UserBlock">
                <p>{this.props.promoter.email}</p>
                <input type="submit" name="Remove" value="Remove" onClick={this.deletePromoter}/>
            </div>
        );        
    }
  }

export default UserPromo