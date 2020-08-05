import React from 'react';
import './Avatar.scss'
import avatarDeafult from "./avatar.png";
import PropTypes from 'prop-types';
import config from "../../config";

function Avatar(props) {
    const size = props.size || 'sm';
    const image= props.image || avatarDeafult;
    const className = 'Avatar--' + size;



    return (

            <img
                className={'Avatar ' + className}
                src={image!==avatarDeafult ? config.apiUrl+'/avatars/'+image : image}
                alt={image} />
    );
}

Avatar.propTypes = {
    size : PropTypes.oneOf(['xs','sm','md', 'lg'])
}

export default Avatar;
