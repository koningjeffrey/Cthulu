import React from 'react';
import axios from 'axios';

import UserProducer from './UserProducer';

class UserProcuders extends React.Component {
    
    constructor(props)  {
        super(props);
        this.state = {  producers:[] };
        this.getProducers = this.getProducers.bind(this);
    }
    componentDidMount() {
            this.getProducers();
    }
    getProducers() {
	  axios.get(`/api/producers`)
            .then(res => {
                const producers = res.data;
                this.setState({ producers: producers });
          });
    }
    
    render() {
        return (
            <div>
                <div className="griditem">
                    <h2>1. Producers</h2>
                    
                    {this.state.producers.map(producer =>
                    <UserProducer   key={producer.userId}
                                    producer={producer}
                                    updateProducers={this.getProducers}
                    />
                    )}
                </div>
            </div>
        );
    }
  }

export default UserProcuders