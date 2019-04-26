import React, { Component } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Caption from '../../components/Caption/Caption';
import Source from '../../components/Sources/Source';
import Credit from '../../components/Sources/Credit';
import Comment from '../../components/CommentItem/CommentItem';
import CommentButton from '../../components/CommentButton/CommentButton';
import './style.css';

import closeButton from '../../img/closeButton.svg';

class CommentSidebar extends Component {

    render () {
        return (
            <div className="fixedDiv">
            <div className="commentSidebarContainer">
            <img src={closeButton} alt="closeButton" className="closeButton" onClick={this.props.closeComments}/>
                <div className="commentSidebar">
                    <div className="centeredDiv">
                        <div className="creatorDiv">
                            <div className="blogLink" onClick="">
                                <Avatar className="creatorAvatar"/>
                                <p className="blogName">props.blogName</p>
                            </div>
                            <div className="pContent">
                                <Caption/>
                                <Source/>
                                <Credit/>
                            </div>
                        </div>
                        <div className="commentsDiv">
                           <Comment/>
                        </div>
                        <div className="inputCommentDiv">
                            <div className="blogLink" onClick="">
                                <Avatar className="commentorAvator"/>
                                <p className="activeBlogName">props.activeBlogName</p>
                            </div>
                            <textarea className="commentInput"/>
                            <button className="addComment" onClick="">
                                <p className="comment">ADD COMMENT</p>
                                <CommentButton className="commentButton"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}

export default CommentSidebar;