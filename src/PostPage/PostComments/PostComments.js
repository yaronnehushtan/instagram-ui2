import React, {useContext, useEffect, useState} from 'react';
import './PostComments.scss'
import config from "../../config";

import CommentCreate from "./CommentCreate/CommentCreate";
import {UserContext} from "../../user-context";
import PostComment from "./PostComment/PostComment";
import {faComment} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PostLike from "../../PostLike/PostLike";
import {func} from "prop-types";

function PostComments(props) {

    const {user} = useContext(UserContext);
    const [commentsList,setCommentsList]= useState([])

    function updateCommentList(newComment){
        setCommentsList([...commentsList,newComment])
    }

    useEffect( ()=>{
        if (!props.postId){
            return
        }
        getComments();

    },[props.postId])

    async function getComments() {
        try {
            const res = await fetch(config.apiUrl+ '/posts/' + props.postId +'/comment', {
                credentials: 'include'
            });
            if (res.status === 400) {
                return null;
            }
            const fetchedComments = await res.json();
            setCommentsList(fetchedComments);
        } catch (e){
            return null;
        }
    }



    return (
        <div className="PostComments d-flex flex-column justify-content-between ">
            <div data-spy="scroll" className="commentsList scroll" id="style-7">
            {commentsList.map( (comment, index) => {
                return <PostComment key={comment._id} commentData={comment}/>
            })}
            </div>
            <div className="pl-3 text-muted d-flex justify-content-start align-items-center">
                <PostLike likes={props.PostLikes} postId={props.postId} />
                <small className="ml-4 mr-2">{commentsList.length}</small>
                <FontAwesomeIcon icon={faComment} className="far my-1 text-dark" />

            </div>
            <CommentCreate  postId={props.postId}   onAddComment={updateCommentList}/>
        </div>
    );
}

export default PostComments;
