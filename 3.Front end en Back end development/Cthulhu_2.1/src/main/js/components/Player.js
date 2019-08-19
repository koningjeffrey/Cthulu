import React from 'react';

class Player extends React.Component {
    
    render() {
      return (
                <div className="UserBlock" onClick={() => {this.props.setCurrentFileId(this.props.value)}}>
                   <p>{this.props.file.filename}</p>
                   <p>{this.props.currentUser.email}</p>
                   <input className="UserButton" type="submit" name="Play" value="Play"/>
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