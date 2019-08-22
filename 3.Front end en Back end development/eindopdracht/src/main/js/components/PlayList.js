import React from 'react';
import axios from 'axios';
import Player from './Player'

class PlayList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentFileId: 0};
        this.setCurrentFileId = this.setCurrentFileId.bind(this);
    }
    componentDidMount() {
    }
    
    setCurrentFileId(currentFileId)  {
        console.log(currentFileId);
        this.setState({currentFileId: currentFileId});
        this.props.setCurrentFileId(currentFileId);
    }
    
    render() {
      return (
                <div className="griditem">
                    <h2>2. PlayList</h2>
                    {this.props.uploads.map(upload =>
                    
                    <Player currentUser={this.props.currentUser}
                            setCurrentFileId={this.setCurrentFileId}
                            file={upload.file}
                            upload={upload.path}
                            key={upload.file.fileId} />              
                    )}
            
                </div>
      );
    }
};

export default PlayList