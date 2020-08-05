import React, {useContext, useState} from 'react';
import './EditProfile.scss'
import {Field, Form, Formik} from "formik";
import {useHistory} from "react-router-dom";
import config from "../config";
import {UserProfileEditSchema} from "./UserProfileEdit.schema";
import {UserContext} from "../user-context";
import Avatar from "../common/Avatar/Avatar";

function EditProfile(props) {

    const {user, setUser} = useContext(UserContext);
    const history = useHistory();
    const [uploadAvatar,setUploadAvatar]= useState();
    // const [submitted, setSubmitted] = useState(false);

    const buildFormData = (values) =>{
        const data = new FormData();
        for (const key in values) {
            data.append(key, values[key]);
        }
        return data;
    }

    const submit = async (values) => {

        const data = buildFormData(values);


        const res = await fetch(config.apiUrl+ '/users/' + user._id, {
            method: 'Post',
            credentials:'include',
            body: data
        });

        if (res.status === 200 ){
            console.log('in edit profile- 200')
            const newUser = await res.json()
            // setSubmitted(true)
            setUser({...user, avatar: newUser.avatar})

            history.push(`/profile/${user._id}`)

        } else if (res.status === 401) { //send error massage
            console.log('in edit profile- 401')
        } else {
            console.log('unknown error');

        }
        setUploadAvatar(res);
        return res

    }


    return (
        <div className="EditProfile">
            <div className="col-10 offset-1 col-md-6 offset-md-3 col-xl-4 offset-xl-4 form-container mb-4">
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <h2 className="pt-1">Edit profile</h2>
                </div>
                <Formik
                    initialValues={{avatar: user.avatar, bio: user.bio}}
                    validationSchema={UserProfileEditSchema}
                    onSubmit={submit}>

                    {({isSubmitting, setFieldValue}) => (  //() instead of {} cause in js6 we want to return all the Form

                        <Form className="mt-4 p-3">
                            <div className="form-group">
                                <label htmlFor="avatar">Profile photo:</label>
                                {/*<Field type="file" className="form-control" id="image" name="image"aria-describedby="imageHelp"/>   Formik cant handle file-> we use input instead*/}
                                <input type="file"
                                       className="form-control"
                                       id="avatar"
                                       name="avatar"
                                       onChange={(e) => {
                                           setFieldValue('avatar', e.currentTarget.files[0]);
                                       }}/>

                            </div>
                            <div className="avatar-upload">

                                {/*<img src={config.apiUrl+ '/posts/' + props.postData.image} className="card-img-top post-image" alt="..."/>*/}
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Bio</label>
                                <Field as="textarea" className="form-control" id="bio" name="bio" />

                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>Edit
                            </button>
                        </Form>
                    )}

                </Formik>
            </div>

        </div>
    );
}

export default EditProfile;
