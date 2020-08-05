import React, { useContext } from 'react';
import './Menu.scss'
import { Link } from "react-router-dom";
import logo from '../images/Instagram-logo3.png';
import { UserContext } from '../user-context';
import  {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHome,faPlusSquare, faCompass, faHeart, faSearch} from '@fortawesome/free-solid-svg-icons';

import MenuAvatar from "../MenuAvatar/MenuAvatar";


function Menu(props) {


    const {user}= useContext(UserContext)

    return (


      <nav className="navbar justify-content-between
       w-100 border-bottom border-top d-flex space-between Menu">
        <div className="col-12 col-sm-2 col-md-2 d-flex justify-content-center justify-content-md-start">
          <Link className="navbar-brand" to="/">
              <div className="header-logo"></div>
          </Link>
        </div>
        {/*<div className="col-3">*/}
        {/*    <form className="form">*/}
        {/*        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>*/}
        {/*    </form>*/}
        {/*</div>*/}

        <div  className="col-12 col-sm-9">
            <ul className="navbar-nav d-flex flex-row mr-auto justify-content-center justify-content-md-end">

                <li className="nav-item active">
                    <Link className="nav-link ml-0" to="/">
                        <FontAwesomeIcon icon={faHome} />
                        <span className="sr-only">(current)</span>
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/post/create">
                        <FontAwesomeIcon icon={faPlusSquare} />
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/search">
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/">
                        <FontAwesomeIcon icon={faCompass} />
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/">
                        <FontAwesomeIcon icon={faHeart} />
                    </Link>
                </li>
                <li>
                    <MenuAvatar/>
                </li>

                {/*<li className="nav-item dropdown">*/}
                {/*    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"*/}
                {/*       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                {/*        Dropdown*/}
                {/*    </a>*/}
                {/*    <div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                {/*        <a className="dropdown-item" href="#">Action</a>*/}
                {/*        <a className="dropdown-item" href="#">Another action</a>*/}
                {/*        <div className="dropdown-divider"></div>*/}
                {/*        <a className="dropdown-item" href="#">Something else here</a>*/}
                {/*    </div>*/}
                {/*</li>*/}


            </ul>
        </div>

          {/* <div className="form-inline my-2 my-lg-0 color text-white"> */}
            {/* if we are conected dont show register and login--> if we dont have user - presenr */}
            {/* <Link to="/register" className="nav-link">Register</Link>
            <Link to="/login" className="nav-link">log In</Link>
          </div> */}
        {/*</div>*/}
      </nav>
    );
}

export default Menu;
