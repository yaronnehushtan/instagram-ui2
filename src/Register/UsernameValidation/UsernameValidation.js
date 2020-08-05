import React from 'react';
import './UsernameValidation.scss'
import {faCheckCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function UsernameValidation(props) {


    return (
        <div className="UsernameValidation">
            { props.sign==='success' ? <FontAwesomeIcon icon={faCheckCircle} className="success"/> : <FontAwesomeIcon icon={faTimes} className="failure"/>  }
        </div>
    );
}

export default UsernameValidation;
