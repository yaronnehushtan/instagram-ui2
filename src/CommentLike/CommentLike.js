import React, {useContext, useEffect, useState} from 'react';
import './CommentLike.scss';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import config from '../config/index';
import {UserContext} from "../user-context";

function CommentLike(props) {

    const {user} = useContext(UserContext);
    const [ likes, setLikes ] = useState(props.likes);
    const [ isLikedByUser, setIsLikedByUser ] = useState(isUserLiked());

    function isUserLiked() {
        return props.likes.includes(user._id);
    }

    async function like ()  {
        const url = config.apiUrl+'/comments/' + props.commentId + '/likes';

        const res = await fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            credentials:"include",
            body: JSON.stringify({_id: user._id})
        });
        return res.json()
    }

    const unlike = async () => {;
        const url = config.apiUrl + '/comments/' + props.commentId + '/likes/' + user._id;

        const res = await fetch(url, {
            method: 'DELETE',
            credentials:"include",
        });
        return res.json()
    }

    async function setLikeUnlike(hasUserlikes) {
        console.log('enter to like/unlike   float-right')
        try {
            const postLikesArr = hasUserlikes ? await like() : await unlike();
            setLikes(postLikesArr);
            setIsLikedByUser(hasUserlikes);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="CommentLike d-flex align-items-center " onClick={() => setLikeUnlike(!isLikedByUser)} >
            <small className="mr-2" >{likes.length}</small>
            <FontAwesomeIcon icon={faHeart} className={isLikedByUser ? "liked" : "unlike" }/>
        </div>
    );
}

export default CommentLike;
