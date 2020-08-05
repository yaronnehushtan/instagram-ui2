import React from 'react';
import './Spinner.scss';
import instagramLogo from '../../images/instagram-icon.png';

function Spinner(props) {

    return (
        <div className="Spinner">
            <div className="App__loading">
                <img src={instagramLogo} className="mb-0 mt-4 logo" alt="instagram-logo"/>
                <div className="spinner-container">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        </div>

    );
}

export default Spinner;
