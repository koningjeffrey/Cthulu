import React from 'react';
import axios from 'axios';

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
        
        this.setValue=this.setValue.bind(this);
    }
    
    setValue(value)  {
        console.log(this.props.currentFileId);
        axios.get('/api/fileValue/' + this.props.file.fileId +'/'+ value)
            .then(response =>   {
                console.log("File liked/Disliked!"+response);
             });
    }
    
    render() {
        return (
                <div className="UserBlock" onClick={() => {this.props.setCurrentFileId(this.props.file.fileId)}}>
                    <b>
                        <p className="title">{this.props.file.title}</p>
                    </b>
                    <p className="title">
                        <audio controls src={this.props.upload}>
                        Your browser does not support the audio element.
                        </audio>
                    </p>
                    {this.props.currentUser.userRole === 0 &&
                    <p>Rating:</p>}
                    {this.props.currentUser.userRole === 1 &&
                    <p>Rate this file:</p>}
                    {this.props.file.fileValue === 0 && this.props.currentUser.userRole === 0 &&
                    <p>No rating yet</p>}
                    {this.props.file.fileValue === 1 && this.props.currentUser.userRole === 0 &&
                        <img src="Dislike.png" alt="Dislike"/>}
                    {this.props.file.fileValue === 2 && this.props.currentUser.userRole === 0 &&
                        <img src="Like.png" alt="Like"/>}
                    {this.props.currentUser.userRole === 1 &&
                        <img src="Like.png" alt="Like" onClick={() => {this.setValue(2)}}/>}
                    {this.props.currentUser.userRole === 1 &&
                        <img src="Dislike.png" alt="Dislike" onClick={ () => {this.setValue(1)}}/>}
                </div>
        );
    }
  };

export default Player