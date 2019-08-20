import React from 'react';
import axios from 'axios';

import Nav from './Nav'
import Comments from './Comments'
import PlayerPromo from './PlayerPromo'

class Promo extends React.Component {
    
    constructor(props)  {
        super(props);
        this.state = {  files: [], comments: [], currentFile: {}, currentUser:  {}, 
                currentUserId: 0, currentFileId: 0};
        this.loadUser = this.loadUser.bind(this);
        this.getFiles = this.getFiles.bind(this);
    }
    componentDidMount() {
            this.loadUser();
    }
    
    loadUser()  {
        this.setState({currentUser: this.props.currentUser, currentUserId: this.props.currentUser.userId});
        this.getFiles();
    }
    
    getFiles() {
	  axios.get(`/api/files/all`)
            .then(res => {
                const files = res.data;
                this.setState({ files: files });
          });
    }
    
    render() {
        return (
            <div>
                <Nav/>
                <div className="grid">
                    <PlayerPromo files={this.state.files}/>
                    <Comments id="item2"/>
                </div>
            </div>
            );
    }
  }

export default Promo