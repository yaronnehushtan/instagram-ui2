import React, {useContext, useEffect, useState} from 'react';
import Avatar from "../../common/Avatar/Avatar";
import {useHistory} from "react-router-dom";
import config from "../../config";
import {UserContext} from "../../user-context";

function ProfileUser(props) {
    const history = useHistory();
    const [profile,setProfile] = useState({});
    const {user} = useContext(UserContext)

    useEffect( ()=>{
        getUserData();
    },[props.userId])

    async function getUserData() {
        try {
            const fetchedUser = await ( await fetch(config.apiUrl + '/users/' + props.userId, {
                credentials: 'include'
            })).json()
            // const fetchedUser = await res.json();
            setProfile(fetchedUser)

        } catch (e){
            return null;
        }
    }


    return (
        <div className="ProfileUser">
            <div className="row d-flex flex-column justify-content-center align-items-center flex-md-row d-md-flex justify-content-md-center align-items-md-center border-bottom pb-4">
                <div className="d-flex justify-content-center mb-2 mr-md-5">
                    <Avatar size="lg" image={profile.avatar}/>
                </div>
                <div className="">
                    <div className="d-flex align-items-center justify-content-end justify-content-md-between mb-2">
                        <h1 className="">{profile.username}</h1>
                        {profile._id===user._id ?  <button className="btn btn-primary ml-2" onClick={()=>{history.push('/edit-profile');}}>Edit profile</button> : null}
                    </div>
                    <div className="font-weight-bold mt-1">
                        <span className="mr-5">{props.postsNum} posts</span>
                        <span className="mr-5">0 followers</span>
                        <span className="">0 following</span>
                    </div>
                    <p className="bio mt-3 mb-0">{profile.bio}</p>
                </div>
            </div>

        </div>
    );
}

export default ProfileUser;

{/*<div className="col-3">*/}



{/*<svg aria-label="Direct" className="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22">*/}
{/*    <path*/}
{/*        d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>*/}
{/*</svg>*/}
