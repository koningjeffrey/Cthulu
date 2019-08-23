import React from 'react';
import axios from 'axios';

import Comment from './Comment'

class Comments extends React.Component {
    
    constructor(props) {
    super(props);
    this.state={value: "Whats up?", comments:[], currentUser: this.props.currentUser, currentFileId: this.props.currentFileId};

    this.handleChange=this.handleChange.bind(this);
    this.addComment=this.addComment.bind(this);
    this.getComments=this.getComments.bind(this);
    }
    //Laadt de lijst met comments gelijk.
    componentDidMount(){
      this.getComments();
    }

    addComment(e)  {
      e.preventDefault();
      const data = new FormData();
          data.append("value", this.state.value);
          data.append('currentFileId', this.props.currentFileId);

          axios.post(`/api/comment`, data)
            .then(result => {
                const createComment = result.data;
                console.log(createComment);
                this.getComments();
        });    
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
                  <option value="Whats up amigo?">Preset..:</option>
                  <option value="Woow, that sound great.">Great</option>
                  <option value="Not bad, keep trying.">Mwa</option>
                  <option value="Please, just delete your account.">Bad</option>
                  <option value="This demo is awesome! The Don would like to invite you.">Invite</option>
                  <option value="Maybe this will help: https://www.youtube.com/watch?v=dQw4w9WgXcQ">Try this!</option>
                </select>
                </div>
                <form onSubmit={this.addComment}>
                <textarea value={this.state.value} onChange={this.handleChange}>
                  {this.state.value}
                </textarea>
                <input className="UserButton" type="submit" name="Send" value="Send"/>
                </form>
                {this.state.comments.map(comment =>
                <Comment 
                  currentUser={this.props.currentUser}
                  comment={comment}
                  key={comment.commentId}/>
                )}  
            </div>
      );
    }
}

export default Comments