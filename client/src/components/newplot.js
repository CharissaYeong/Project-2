import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { Stack, Modal } from 'react-bootstrap';
import axios from 'axios'


const Newplot = () => {
    const [objectID, setobjectID] = useState("");
    const [storyID, setstoryID] = useState("");
    const [likes, setLikes] = useState("");
    
    // const [content, setContent] = useState([]);

    const date = new Date()
    const type = 'plot'

    useEffect(() => {
        setobjectID(localStorage.getItem('userID'));
        setstoryID(1);
        setLikes(0);
      }, []);
  
    return (
        <Formik
            initialValues={{ oid: '', story_id: '', datetime: '', likes: '', type: '', content: ''}}
            onSubmit={async (values, { setSubmitting, resetForm }) => {

                setTimeout(async () => {
                    // alert('Registered sucessfully!' + JSON.stringify(values, null, 2));
                    try {
                        await axios.post("http://localhost:3001/newplot", {
                            "oid": objectID,
                            "story_id": storyID,
                            "datetime": date,
                            "likes": likes,
                            "type": type,
                            "content": values.content
                        }) .then((response) => {
                            console.log(response.data)
                            alert(response.data);
                          })
                    }   catch (error) {
                        // console.log(error.response.data)
                        alert(error.response.data)
                    }
                    setSubmitting(false);
                    resetForm()
                }, 1000);
            }}

            validationSchema={Yup.object({
                // type: Yup.string()
                //     .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Incorrect email format')
                //     .required('Email is required'),
                content: Yup.string()
                    .min(200, 'Entry should be at least 200 characters')
                    .max(1000, 'Entry should not be longer than 1000 characters')
                    .matches(/^[A-Z][^!?]*[.!?](\s+[A-Z][^!?]*[.!?])*$/, 'Entry should only contain complete sentences')
                    .required('Please write your entry.')
            })}

        >
            {(formik, isSubmitting) => (
                <Form>
                    <Stack gap={3}>
                        <div className="form-group">
                            <label htmlFor="content">Plot Content</label>
                            <Field name="content" 
                            className={(formik.touched.content && formik.errors.content) ? 'form-control is-invalid' : 'form-control'}
                                type="textarea"
                                placeholder="Entry should be 200-1000 characters and written as complete sentences, avoid abbreviations like a.w.o.l"

                                />
                            {formik.touched.content && formik.errors.content ? (
                                <div className="invalid-feedback">{formik.errors.content}</div>
                            ) : null}
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" className={(formik.touched.username && formik.errors.username) ? 'form-control is-invalid' : 'form-control'}
                                type="text" placeholder="Username will be visible to others" />
                            {formik.touched.username && formik.errors.username ? (
                                <div className="invalid-feedback">{formik.errors.username}</div>
                            ) : null}
                        </div> */}

                        {/* <Modal.Footer> */}
                        {/* <hr></hr> */}
                            <div className="form-group align-self-end">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Submit"}</button>
                            </div>
                        {/* </Modal.Footer> */}
                    </Stack>
                </Form>
            )
            }
        </Formik >
    );
};

export default Newplot;