import React, {useEffect, useState} from 'react';
import './PostComment.scss'
import Avatar from "../../../common/Avatar/Avatar";
import Spinner from "../../../common/Spinner/Spinner";
import CommentLike from "../../../CommentLike/CommentLike";
import PostLike from "../../../PostLike/PostLike";
import {Link} from "react-router-dom";

function PostComment({commentData}) {

    function getDaysAgo (date) {
        const oneDay = 24 * 60 * 60 * 1000;
        const newDate = new Date(date);
        const today = new Date();
        const diffDays = Math.round(Math.abs((newDate - today) / oneDay));
        return diffDays
    }

    return (
        <div className="PostComment d-flex my-1 p-3 p-md-1 d-flex align-items-center pr-md-3">
            <Link className="" to={'/profile/'+commentData.user._id}>
                <Avatar size="sm" image={commentData.user.avatar}/>
            </Link>
            {/*/!*<div>{commentData.user.username }</div>*!/*/}
            <div className="ml-2 flex-grow-1">
                <p className="mb-0 text-dark"> <span className="font-weight-bolder">{commentData.user.username}</span>   {commentData.content}</p>
                <small className="mb-0 font-weight-lighter">{getDaysAgo(commentData.createdAt)}d</small>
            </div>
            <CommentLike likes={commentData.likes} commentId={commentData._id} />
            {/*<p className="mb-0 ml-3"> {commentData.content}</p>*/}
        </div>
    );
}

export default PostComment;
