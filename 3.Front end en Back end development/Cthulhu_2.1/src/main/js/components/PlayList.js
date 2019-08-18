import React from 'react';
import axios from 'axios';
import Player from './Player'

class PlayList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentFile: {} };
        this.setCurrentFile = this.setCurrentFile.bind(this);
    }
    setCurrentFile()  {
        console.log(this.props.id);
            axios.get('/api/file/' + this.props.id)
                .then(response =>   {
                    const file = response.data;
                    this.setState({currentFile: file});
            });
    }
    
    render() {
      return (
                <div className="griditem">
                    <h2>2. PlayList</h2>
                    {this.props.files.map(file => 
                    <Player currentUser={this.props.currentUser} id={file.fileId} key={file.fileId} name={file.filename} onClick={this.setCurrentFile}/>)}
                </div>
      );
    }
};

export default PlayList