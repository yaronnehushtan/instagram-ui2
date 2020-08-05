import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import './PostCreate.scss'
import { PostCreateSchema } from './PostCreate.schema';
import config from "../config";
import {useHistory} from "react-router-dom";
import {UserContext} from "../user-context";
import instagramLogo from "../images/instagram-icon.png";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import uploadTemp from "./upload-to-instagram3.jpeg";


function PostCreate(props) {
    const history = useHistory();
    const [uploadPost,setUploadPost]= useState();
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [currentImage,setCurrentImage] = useState('')


    const buildFormData = (values) =>{

        const data = new FormData();  //loop on all "values" object and append each of the values to Formdata. append need to get key and value
        for (const key in values) {
            data.append(key, values[key]);
        }

        return data;
    }

    const submit = async (values) => {

        const data = buildFormData(values);

        const res = await fetch(config.apiUrl+ '/posts', {
            method: 'PUT',
            credentials:'include',
            body: data
        });
        if (res.status === 201 ){
            const temp = await res.json();
            setCurrentImage(temp.image)
            history.push('/')
        } else if (res.status === 400) { //send error massage
            console.log('No');
        } else {
            console.log('unknown error');

        }
        setUploadPost(res);
        return res
    
    }


    return (
        <div className="PostCreate row mb-5">
            <div className="col-10 offset-1 offset-md-3 col-md-6 offset-xl-4 col-xl-4 form-container">
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <img src={instagramLogo} className="" alt="instagram-logo" id="logo"/>
                    <h2 className="pt-1">Create Post!</h2>
                </div>
                <Formik
                    initialValues={{image:'', description:''}}
                    validationSchema={PostCreateSchema}
                    onSubmit={submit}>

                    {({ isSubmitting , setFieldValue }) => (  //() instead of {} cause in js6 we want to return all the Form

                        <Form className="mt-4 p-3">
                            <div className="form-group">
                                <label htmlFor="image">Image:</label>
                                {/*<Field type="file" className="form-control" id="image" name="image"aria-describedby="imageHelp"/>   Formik cant handle file-> we use input instead*/}
                                <input type="file"
                                       className="form-control"
                                       id="image"
                                       name="image"
                                       onChange={(e)=>{
                                        setFieldValue('image', e.currentTarget.files[0]);
                                        }}/>

                            </div>
                            <div className="image-upload">
                                {/*<img src={config.apiUrl+ '/posts/' + props.postData.image} className="card-img-top post-image" alt="..."/>*/}
                            </div>
                            <div class="form-group">
                                <label htmlFor="description">Description</label>
                                <Field as="textarea" className="form-control" id="description" name="description"/>

                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>Submit</button>
                        </Form>
                    )}

                </Formik>
            </div>
            {/*<div className="image-container">*/}
            {/*    <img src={config.apiUrl+ '/posts/' + currentImage} className="card-img-top post-image" alt="..."/>*/}
            {/*</div>*/}
            {/*<div className="col-5">*/}
            {/*    <ReactCrop src={currentImage==='' ? uploadTemp : config.apiUrl+ '/posts/' + currentImage} crop={crop} onChange={newCrop => setCrop(newCrop)} />*/}
            {/*</div>*/}



        </div>

    );
}

export default PostCreate;
