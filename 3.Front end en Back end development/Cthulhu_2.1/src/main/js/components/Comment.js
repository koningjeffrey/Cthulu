import React from 'react'


class Comment extends React.Component{
    render(){
        return (
            <div className="comment">
                <p><b>{this.props.currentUser.email}</b></p>
                <p>{this.props.comment.commentField}</p>
            </div>
        );
    }
}

export default Comment