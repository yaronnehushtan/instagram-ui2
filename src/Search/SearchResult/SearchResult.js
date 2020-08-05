import React from 'react';
import Avatar from "../../common/Avatar/Avatar";
import './SearchResult.scss'
import {Link} from "react-router-dom";

function SearchResult(props) {
    return (

        <Link className="nav-link col-10 col-sm-5 col-md-3 SearchResult d-flex align-items-center  p-1 m-2 border" to={'/profile/'+props.userData._id}>
            <div className="mr-3">
                <Avatar size="md" image={props.userData.avatar} />
            </div>
            <div className="">
                <p className="m-0">{props.userData.username}</p>
                <small>bio goes here</small>
            </div>
        </Link>

    );
}

export default SearchResult;
