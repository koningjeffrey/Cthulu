import React from 'react';
import axios from 'axios';

import Comment from './Comment'

class Comments extends React.Component {
    
    constructor(props) {
    super(props);
    }
    
    getComments()   {
        axios.get('/api/comments/' + this.props.currentFileId)
            .then(response =>   {
                const comments = response.data;
                this.setState({comments: comments});
        });
    }
    
    render() {
      return  (      
            <div className="griditem">
                <h2>3. Comments</h2>
                <textarea>
                  Whats up?
                </textarea>
                <input onSubmit={this.addComment} className="UserButton" type="submit" name="Send" value="Send"/>
                <Comment/> 
            </div>
      );
    }
}

export default Comments