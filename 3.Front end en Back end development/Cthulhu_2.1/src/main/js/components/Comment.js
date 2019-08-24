import React from 'react'
import axios from 'axios';

class Comment extends React.Component{
    
    constructor(props) {
        super(props);
    this.state={ user:{} };
    this.getUser = this.getUser.bind(this);
    }
    componentDidMount(){
      this.getUser();
    }
    
    getUser()   {
        axios.get('/api/getUser/' + this.props.comment.userId)
            .then(response =>   {
                const user = response.data;
                this.setState({user: user});
        });
    }
   
    render(){
        return (
            <div className="comment">
                <b><p className="name">{this.state.user.email}</p></b>
                {this.state.user.userRole === 0 &&
                <p className="role">Producer</p>}
                {this.state.user.userRole === 1 &&
                <p className="role">Promoter</p>}
                <p>{this.props.comment.commentField}</p>
            </div>
        );
    }
}

export default Comment