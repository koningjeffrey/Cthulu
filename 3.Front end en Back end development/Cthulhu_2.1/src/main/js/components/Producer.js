import React from 'react';
import axios from 'axios';

import Nav from './Nav'
import Upload from './Upload'
import PlayList from './PlayList'
import Comments from './Comments'

class Producer extends React.Component {
    
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
	  axios.get(`/api/files/` + this.props.currentUser.userId)
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
                    <Upload currentUser={this.state.currentUser} addFile={this.getFiles}/>
                    <PlayList {...this.props} files={this.state.files} />
                    <Comments/>
                </div>
            </div>
        );
    }
  }

export default Producer