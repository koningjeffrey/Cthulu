import React from 'react'


class Comment extends React.Component{
    render(){
        return (
            <div className="comment">
                <p>{this.props.currentUser.email}</p>
                {this.props.currentUser.userRole === 0 &&
                <p className="producerName">Producer</p>}
                {this.props.currentUser.userRole === 1 &&
                <p className="promoName">Promoter</p>}
                <p>{this.props.comment.commentField}</p>
            </div>
        );
    }
}

export default Comment