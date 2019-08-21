import React from 'react';
import axios from 'axios';

import Comment from './Comment'

class Comments extends React.Component {
    
    constructor(props) {
    super(props);
    this.state={value: "Whats up?", commentFields:"", currentUser:  this.props.currentUser};

    this.handleChange=this.handleChange.bind(this)
    this.addComment=this.addComment.bind(this)
    }

    addComment(e)  {
      e.preventDefault();
      const data = new FormData();
          data.append("commentField", this.commentFiels.current.value);
          data.append('userId', this.props.currentUser.userId);

          axios.post(`/api/comment`, data)
            .then(result => {
                const createComment = result.data;
                this.loginUser();
        });    
    }
    }

    getComments()   {
        axios.get('/api/comments/' + this.props.currentFileId)
            .then(response =>   {
                const comments = response.data;
                this.setState({comments: comments});
        });
    }

    handleChange(e){
      this.setState({value: e.target.value});
    }
    
    render() {
      return  (      
            <div className="griditem">
                <h2>3. Comments</h2>
                <div className="custom-select">
                <select style={{backgroundColor: 'Black', color: 'white', width: '100%'}} onChange={this.handleChange}>
                  <option value="Woow, that sound great">Great</option>
                  <option value="Not bad, keep trying">Mwa</option>
                  <option value="Please, just delete your account.">Bad</option>
                  <option value="This demo is awesome! The Don would like to invite you.">Invite</option>
                </select>
                </div>
                <textarea value={this.state.value} onChange={this.handleChange}>
                  {this.state.value}
                </textarea>
                <input onSubmit={this.addComment} className="UserButton" type="submit" name="Send" value="Send"/>
                <Comment/> 
            </div>
      );
    }
}

export default Comments