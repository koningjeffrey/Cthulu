import React from 'react';

import Comment from './Comment'

class Comments extends React.Component {
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