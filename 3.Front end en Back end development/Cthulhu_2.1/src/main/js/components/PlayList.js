import React from 'react';
import axios from 'axios';
import Player from './Player'

class PlayList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentFile: {} };
        this.setCurrentFile = this.setCurrentFile.bind(this);
    }
    setCurrentFile(file)  {
        console.log(file.fileId);
    }
    
    render() {
      return (
                <div className="griditem">
                    <h2>2. PlayList</h2>
                    {this.props.files.map(file =>
                    <div onClick={this.setCurrentFile(file)} key={file.fileId} value={file.fileId}>
                    <Player currentUser={this.props.currentUser} 
                            id={file.fileId} 
                            key={file.fileId} 
                            name={file.filename} />
                    </div>)}
                </div>
      );
    }
};

export default PlayList