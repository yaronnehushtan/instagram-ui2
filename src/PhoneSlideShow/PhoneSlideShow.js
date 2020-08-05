import React from 'react';
import slideshow1 from "../images/Feed_Android_withoutStories.png";
import slideshow2 from "../images/Profile_Android.png";
import slideshow3 from "../images/Filters_Android.png";
import slideshow4 from "../images/Profile_Business_Android.png";
import './PhoneSlideShow.scss'


function PhoneSlideShow(props) {
    return (
        <div className="PhoneSlideShow" id="phone-container">
            {/*<div className="align-self-center d-none d-xl-block" id="phone-container">*/}
            {/*<img  id="iphone" src={iphone} class="img-fluid" id="iphone" alt="iphone" />*/}
            {/*<div id="temp-container">*/}
            <div id="iphoneSlideShow" className="carousel slide carousel-fade" data-ride="carousel">


                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slideshow1} className="d-block w-100" alt="slideshow1"/>
                    </div>
                    <div className="carousel-item">
                        <img src={slideshow2} className="d-block w-100" alt="slideshow2"/>
                    </div>
                    <div className="carousel-item">
                        <img src={slideshow3} className="d-block w-100" alt="slideshow3"/>
                    </div>
                    <div className="carousel-item">
                        <img src={slideshow4} className="d-block w-100" alt="slideshow4"/>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default PhoneSlideShow;
