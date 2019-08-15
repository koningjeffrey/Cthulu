import React from 'react';

import Comment from './Comment'

class Comments extends React.Component {
    render() {
      return        <div className="griditem">
                        <h2>3. Comments</h2>
                        <textarea>
                          Whats up?
                        </textarea>
                        <div className="sendRate">
                        <input className="UserButton" type="submit" name="Send" value="Send"/>
                        <p>Rating:</p>
                        <img src="Dislike.png" alt="Dislike"/>
                        <img src="Like.png" alt="Like"/>
                        </div>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                    </div>;
    }
  }

export default Comments