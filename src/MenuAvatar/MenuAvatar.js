import React, {useContext} from 'react';
import './MenuAvatar.scss'
import {UserContext} from "../user-context";
import avatarDeafult from './avatar.png';
import Avatar from "../common/Avatar/Avatar";
import config from "../config";
import {Link} from "react-router-dom";


function MenuAvatar(props) {

    const {user}= useContext(UserContext)

    return (
        <div className="MenuAvatar " >
            <Link className="nav-link " to={'/profile/'+user._id}>
                <Avatar size="md" image={user.avatar} />
            </Link>

            {/*<div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
            {/*    <a className="dropdown-item" href="#">Action</a>*/}
            {/*    <a className="dropdown-item" href="#">Another action</a>*/}
            {/*    <div className="dropdown-divider"></div>*/}
            {/*    <a className="dropdown-item" href="#">Something else here</a>*/}
            {/*</div>*/}

            {/*//in case we didnt sign in so there is no user*/}
        </div>
    );
}

export default MenuAvatar;
