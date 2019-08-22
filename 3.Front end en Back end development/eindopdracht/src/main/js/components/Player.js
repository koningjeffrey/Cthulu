import React from 'react';
import axios from 'axios';

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
    }
    
    render() {
      return (
                <div className="UserBlock" onClick={() => {this.props.setCurrentFileId(this.props.file.fileId)}}>
                   <p>{this.props.file.title}</p>
                   <audio controls src={this.props.upload}></audio>
                    <p>Rating:</p>
                    {this.props.file.fileValue === 0 &&
                    <p>No rating yet</p>}
                    {this.props.file.fileValue === 1 &&
                    <img src="Dislike.png" alt="Dislike"/>}
                    {this.props.file.fileValue === 2 &&
                    <img src="Like.png" alt="Like"/>}
                </div>
        );
    }
  };

export default Player