import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { RegisterSchema } from './register.schema';
import './Register.scss'
import { useHistory } from 'react-router-dom';
import config from '../config/index';

import instagramLogo from '../images/instagram-logo.png';
import PhoneSlideShow from "../PhoneSlideShow/PhoneSlideShow";
import UsernameValidation from "./UsernameValidation/UsernameValidation";


function Register(props) {
    const history = useHistory();
    const [showError,setError] = useState(false);
    const [username, setUsername] = React.useState("");


    const submit = async (values) => {  
        setError(false)
        const res = await fetch(config.apiUrl + '/users', {
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if (res.status === 201 ){ //redirect to Sign in
            history.push('/login');
        } else if (res.status === 409) { //send error massage
            setError(true)
        } else {
            console.log('unknown error');
            
        }
        return res
    };

    return (
        <div className="Register">
            <div class="row justify-content-center">
                <div class="col-6 col-md-7 col-lg-6 d-none d-md-flex pl-0 pr-0">
                    <PhoneSlideShow />
                    {/*disapear in sm*/}
                </div>
                <div class="col-10 col-xs-9 col-md-5 col-xl-4 p-0 mb-5 mb-md-0">
                    <div className="form-container  px-3">
                        <div class="text-center">
                            <img src={instagramLogo} class="mt-3 mb-3" alt="instagram-logo" id="logo"/>
                            <p class="font-weight-bold mb-0">Sign up to see photos and videos from your friends.</p>


                        </div>
                        <Formik
                            initialValues={{username:'', password:'',email:'',agreeToTerms: false}}
                            validationSchema={RegisterSchema}
                            onSubmit={submit}>

                            {({ errors, touched, isSubmitting }) => (  //() instead of {} cause in js6 we want to return all the Form  col-4 offset-7 validate={validateUsername}

                                <Form className="p-3">
                                    <div className="form-group">
                                    {showError &&    <div className="alert alert-danger">
                                            Email or username already exists
                                        </div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">User Name:</label>
                                        <div className="d-flex align-items-center">
                                        <Field type="text" className="form-control" id="username" name="username" placeholder="2-16 characters" aria-describedby="UserNameHelp" />
                                        { errors.username && <UsernameValidation sign={errors.username==='username is invalid' ? 'fail' : 'success'}/>}
                                        </div>
                                        {/* onChange={checkUsername} value={username} */}
                                        {errors.username && touched.username && <small className="text-danger pl-2">{errors.username}</small>}
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="email">Email Address:</label>
                                        <Field type="email" className="form-control" id="email" name="email" placeholder="email address..." aria-describedby="emailHelp"/>
                                        {errors.email && touched.email && <small className="text-danger pl-2">{errors.email}</small>}
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field type="password" className="form-control" id="password" name="password" placeholder="6-16 characters"/>
                                        {errors.password && touched.password && <small className="text-danger pl-2">{errors.password}</small>}
                                    </div>
                                    <div class="form-group form-check">
                                        <Field type="checkbox" className="form-check-input" id="agreeToTerms" name="agreeToTerms"/>
                                        <label className="form-check-label" htmlFor="agreeToTerms">Agree to terms?</label>
                                        <div>
                                            {errors.agreeToTerms && touched.agreeToTerms && <small className="text-danger">{errors.agreeToTerms}</small>}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary animated-button victoria-two w-100" disabled={isSubmitting}>Submit</button>
                                </Form>

                            )}

                        </Formik>
                        {/* <p class="text-center"><small>By signing up, you agree to our Terms . Learn how we collect, use and share your data in our Data Policy and how we use cookies and similar technology in our Cookies Policy .</small></p> */}
                    </div>
                    <div class="mt-2 p-2 form-container text-center mb-3">
                        <p class="m-2">Have an account? <a href="/login">Log in</a></p>
                    </div>
                </div>


            </div>
           
            
        </div>
    );
}






// function validateUsername(value) {
//     let error;
//     console.log(value);
//     if (value === 'admin') {
//         error = 'Nice try!';
//         console.log(error);
//
//     }
//     return error;
// }



export default Register;
