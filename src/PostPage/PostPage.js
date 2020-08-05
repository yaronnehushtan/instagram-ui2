import React, {useEffect, useState} from 'react';
import './PostPage.scss'
import {Link, useParams} from "react-router-dom";
import Avatar from "../common/Avatar/Avatar";
import config from "../config";
import PostLike from "../PostLike/PostLike";
import Spinner from "../common/Spinner/Spinner";
import PostComments from "./PostComments/PostComments";

function PostPage(props) {

    const { id } = useParams();
    const [post, setPost]= useState()
    const [isLoading, setLoading] = useState(true);


    useEffect( ()=>{
        if (!id) {
            return
        }
        getPostData();
    },[id])

    async function getPostData() {
        try {
            const res = await fetch(config.apiUrl + '/posts/' + id, {
                credentials: 'include'
            });
            if (res.status === 401) {
                return null;
            }
            const fetchedPost = await res.json();
            setPost(fetchedPost);
            setLoading(false);
            console.log(fetchedPost)
        } catch (e){
            return null;
        }
    }

    function getEditedDate (date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const newDate = new Date(date);
        return monthNames[newDate.getMonth()] + " " + newDate.getDate();
    }


    return (
        <div className="PostPage border mb-4">
            {isLoading ? <Spinner /> :  <div className="row justify-content-center">

                <div className="col-12 col-md-7 postPage-left pr-0 mb-3 ">
                    <div className="image-container mb-2">
                        <img src={config.apiUrl+ '/posts/' + post.image} className="card-img-top post-image" alt="..."/>
                    </div>

                        {/*<PostLike likes={post.likes} postId={post._id} />*/}

                    <div className="px-4 mt-3">
                        <p className="mt-3">{post.description}</p>
                        <small className="text-muted mt-2">{getEditedDate(post.createdAt)}</small>
                    </div>

                </div>

                <div className="col-12 col-md-5 ">
                    <div className="d-flex avatar-container pl-2 pb-2 pt-0 align-items-center border-bottom my-2">
                        <Link className="" to={'/profile/'+ post.user._id}>
                            <Avatar size="md" image={post.user.avatar}/>
                        </Link>
                            <p className="mt-0 mb-0 ml-3">{post.user.username}</p>

                    </div>
                    {/*<div className="comments-container mt-2">*/}
                    <PostComments postId={post._id} PostLikes={post.likes}/>
                    {/*</div>*/}

                </div>



            </div> }



            {
            // <div className="card pb-3">
            //     <div className="p-2">
            //         {/*<Link className="" to={'/profile/'+post.user._id}>*/}
            //         {/*    <Avatar size="sm" image={post.user.avatar} />*/}
            //         {/*</Link>*/}
            //         {/*<small className="float-right text-muted">{getEditedDate(post.createdAt)}</small>*/}
            //
            //     </div>
            //
            //         <div className="image-container">
            //             <img src={config.apiUrl+ '/posts/' + post.image} className="card-img-top post-image" alt="..."/>
            //         </div>
            //
            //
            //     <div className="card-body pt-2">
            //         <CommentLike likes={post.likes} postId={post._id} />
            //         <p className="card-text mt-4">{post.description}</p>
            //     </div>
            // </div>
            }

        </div>
    );
}

export default PostPage;
