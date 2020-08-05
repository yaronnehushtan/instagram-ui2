import React, {  useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { LoginSchema } from './Login.schema';
import './Login.scss'

import instagramLogo from '../images/instagram-logo.png';
import { UserContext } from '../user-context';
import { useHistory, Link } from 'react-router-dom';
import PhoneSlideShow from "../PhoneSlideShow/PhoneSlideShow";
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {config} from "@fortawesome/fontawesome-svg-core";


//ndd to chang all logIn to login 


function Login(props) {

    const {setUser} = useContext(UserContext)

    const [signinSuccess,setsigninSuccess] = useState(true);







    
    const [signinFailed,setsigninFailed] = useState(false);
    const [isPasswordShown,setIsPasswordShown] = useState(false);


    const history = useHistory();

    const submit = async (values) => { 
    
    
        const res = await fetch(config.apiUrl + '/users/login', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            credentials:"include",
            body: JSON.stringify(values)
        });
    
        if (res.status === 200 ){
            console.log('Yes');
            setsigninSuccess(false);
            setsigninFailed(false);

            const loggedUser = await res.json();
            setUser(loggedUser)

            setTimeout(()=> history.push('/'),600)
            
            
        } else if (res.status === 401) { //send error massage
            console.log('No');
            setsigninSuccess(false);
            setsigninFailed(true);
        } else {
            console.log('unknown error');
            
        }
        return res

    }


    const togglePassword= () => {
        setIsPasswordShown(!isPasswordShown);
    }
    


    return (
        <div className="Login">
            { signinSuccess && <div class="alert alert-success " role="alert">
                You signed in successfully!
            </div>}

            <div class="row justify-content-center">
                <div className="col-6 col-md-7 col-lg-6 d-none d-md-flex pl-0 pr-0">
                    <PhoneSlideShow/>
                    {/*disapear in sm*/}
                </div>
                <div class="col-10 col-xs-9 col-md-5 col-xl-4 p-0  mb-5 mb-md-0">
                    <div className="form-container  px-3">
                        <div className="text-center">
                            <img src={instagramLogo} className="m-3" alt="instagram-logo" id="logo"/>
                        </div>
                        <Formik
                            initialValues={{username: '', email: ''}}
                            validationSchema={LoginSchema}
                            onSubmit={submit}>

                            {({errors, touched, isSubmitting}) => (  //() instead of {} cause in js6 we want to return all the Form

                                <Form className="mt-2 p-4">
                                    {/* <div className="form-group">
                            {showError &&    <div className="alert alert-danger">
                                    Email or username already exists
                                </div>}
                            </div> */}
                                    <div className="form-group">
                                        <label htmlFor="username">User Name:</label>

                                        <div className="d-flex align-items-center">
                                            <Field type="text" className="form-control" id="username" name="username"
                                                   aria-describedby="UserNameHelp"/>

                                        </div>

                                        {errors.username && touched.username &&
                                        <small className="text-danger pl-2">{errors.username}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>

                                        <div className="input-group mb-3">
                                            <Field type={isPasswordShown ? "text" : "password" } className="form-control" id="password" name="password"/>
                                            <div  className="input-group-append input-group-text" onClick={togglePassword}>
                                                    {/*<div className="input-group-text"*/}
                                                    {isPasswordShown ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/> }
                                                    {/*</div>*/}
                                            </div>
                                        </div>

                                        {errors.password && touched.password &&
                                        <small className="text-danger pl-2">{errors.password}</small>}
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100"
                                            disabled={isSubmitting}>Submit
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        <p className="text-center mb-4"><a href="#"><small>forgot password?</small></a></p>
                    </div>


                    <div class="p-2 form-container text-center mt-3">
                        <p class="m-2">Don't have an account? <Link to="/register">Sign Up</Link></p>
                    </div>

                    { signinFailed && <div class="alert alert-danger" role="alert">
                        Check username & Password and try again
                    </div>}
                </div>
            </div>

        </div>
    );
}

export default Login;
