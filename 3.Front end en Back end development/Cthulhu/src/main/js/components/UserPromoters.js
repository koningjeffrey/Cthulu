import React from 'react';
import axios from 'axios';

import UserPromo from './UserPromo';

class UserPromoters extends React.Component {
    
    constructor(props)  {
        super(props);
        this.state = {  promoters:[] };
        this.getPromoters = this.getPromoters.bind(this);
    }
    componentDidMount() {
            this.getPromoters();
    }
    getPromoters() {
	  axios.get(`/api/promoters`)
            .then(res => {
                const promoters = res.data;
                this.setState({ promoters: promoters });
          });
    }
    
    render() {
        return (
            <div>
                <div className="griditem">
                    <h2>2. Promoters</h2>
                    
                    {this.state.promoters.map(promoter =>
                    <UserPromo  key={promoter.userId}
                                promoter={promoter}
                                updatePromoters={this.getPromoters}
                    />
                    )}
                </div>
            </div>
        );        
    }
  }

export default UserPromoters