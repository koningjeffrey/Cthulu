import React from 'react'


class Comment extends React.Component{
    render(){
        return (
            <div className="comment">
                <p>{this.props.currentUser.email}</p>
                <p>{this.props.comment.commentField}</p>
            </div>
        );
    }
}

export default Comment