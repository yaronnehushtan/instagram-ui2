import React, {useEffect, useState} from 'react';
import './Post.scss'
import config from "../../config";
import avatarDeafult from './avatar.png';
import PostLike from "../../PostLike/PostLike";
import Avatar from "../Avatar/Avatar";
import {Link} from "react-router-dom";



function Post(props) {

    function getEditedDate (date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const newDate = new Date(date);
        return monthNames[newDate.getMonth()] + " " + newDate.getDate();
    }


    return (
        <div className="Post col-12 col-md-5 col-lg-4 p-4" >
            <div className="card pb-3">
                <div className="p-2">
                    <Link className="" to={'/profile/'+props.postData.user._id}>
                        <Avatar size="xs" image={props.postData.user.avatar} />
                    </Link>
                        <small className="float-right text-muted">{getEditedDate(props.postData.createdAt)}</small>

                </div>
                <Link className="" to={'/post/'+props.postData._id}>
                    <div className="image-container">
                        <img src={config.apiUrl+ '/posts/' + props.postData.image} className="card-img-top post-image" alt="..."/>
                    </div>
                </Link>

                    <div className="card-body pt-2">
                        <PostLike likes={props.postData.likes} postId={props.postData._id} />
                        <p className="card-text mt-4">{props.postData.description}</p>
                    </div>
            </div>
        </div>
    );
}

export default Post;
