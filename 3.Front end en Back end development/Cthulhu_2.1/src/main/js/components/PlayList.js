import React from 'react';
import axios from 'axios';
import Player from './Player'

class PlayList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentFileId: 0 };
        this.setCurrentFileId = this.setCurrentFileId.bind(this);
    }
    setCurrentFileId(currentFileId)  {
        console.log(currentFileId);
        this.setState({currentFileId: currentFileId});
        this.props.setCurrentFileId(this.state.currentFileId);
    }
    
    render() {
      return (
                <div className="griditem">
                    <h2>2. PlayList</h2>
                    
                    {this.props.files.map(file =>
                    
                    <Player currentUser={this.props.currentUser}
                            setCurrentFileId={this.setCurrentFileId}
                            file={file}
                            key={file.fileId} 
                            value={file.fileId}/>              
                    )}
            
                </div>
      );
    }
};

export default PlayList