import React, {useContext, useEffect, useState} from 'react';
import './CommentCreate.scss'
import {Field, Form, Formik} from "formik";
import {CommentCreateSchema} from "./CommentCreate.schema";
import {useHistory} from "react-router-dom";
import config from "../../../config";
import Avatar from "../../../common/Avatar/Avatar";
import {UserContext} from "../../../user-context";
import {func} from "prop-types";

function CommentCreate(props) {

    const history = useHistory();
    const {user} = useContext(UserContext)
    const [input, setInput] = useState('')

    const submit = async (values, {resetForm}) => {
        resetForm(values)

        const res = await fetch(config.apiUrl+ '/posts/' + props.postId + '/comment', {
            method: 'PUT',
            credentials:'include',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)


        });
        if (res.status === 201 ){
            const fetchedComment = await res.json()
            props.onAddComment(fetchedComment)
            history.push(`/post/${props.postId}`)

        } else if (res.status === 400) { //send error massage
            console.log('No');
        } else {
            console.log('unknown error');

        }
        return res

    }


    return (
        <div className="CommentCreate">
            <Formik
                initialValues={{content: ''}}
                validationSchema={CommentCreateSchema}
                onSubmit={submit}>

                {({errors, touched, isSubmitting, values}) => (

                    <Form className="">
                        {/*<div className="">*/}
                            {/*<label htmlFor="your comment...">Your comment...</label>*/}

                            <div className="d-flex align-items-center justify-content-between border-top py-2 pl-2">
                                <Avatar size="xs" image={user.avatar}/>
                                <Field type="text" className=" w-75 text-muted no-border form-control" id="content" name="content"
                                       aria-describedby="contentHelp" placeholder="Add a comment...">

                                </Field>
                                {errors.content==='comment is too long' && <small className="text-danger pl-2">{errors.content}</small>}
                                <button type="submit" className="btn text-primary no-border"
                                        disabled={ values.content.length===0 ? true : false}>Post
                                </button>
                            {/*</div>*/}


                            {/*{errors.content && touched.content &&*/}
                            {/*<small className="text-danger pl-2">{errors.username}</small>}*/}
                        </div>


                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CommentCreate;
