import React from 'react';
import axios from 'axios';

import Nav from './Nav'
import Comments from './Comments'
import PlayerPromo from './PlayerPromo'

class Promo extends React.Component {
    
    constructor(props)  {
        super(props);
        this.state = {  uploads: [], comments: [], currentUser:  {}, 
                        currentUserId: 0, currentFileId: 0};
        this.loadUser = this.loadUser.bind(this);
        this.setCurrentFileId = this.setCurrentFileId.bind(this);
        this.getUploads = this.getUploads.bind(this);
    }
    componentDidMount() {
            this.loadUser();
    }
    
    loadUser()  {
        this.setState({currentUser: this.props.currentUser, currentUserId: this.props.currentUser.userId});
        this.getUploads();
    }
    
    setCurrentFileId(currentFileId)  {
        this.setState({currentFileId: currentFileId});
    }
    
    getUploads() {
	  axios.get(`/api/uploads/all`)
            .then(res => {
                const uploads = res.data;
                this.setState({uploads:uploads});
          });
    }
    
    render() {
        return (
            <div>
                <Nav {...this.props}/>
                <div className="grid">
                    <PlayerPromo {...this.props}    uploads={this.state.uploads} 
                                                    currentFileId={this.state.currentFileId} 
                                                    setCurrentFileId={this.setCurrentFileId}/>
                    <Comments {...this.props}       currentUser={this.state.currentUser} 
                                                    currentFileId={this.state.currentFileId}/>
                </div>
            </div>
            );
    }
  }

export default Promo