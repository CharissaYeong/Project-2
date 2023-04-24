import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { Stack } from 'react-bootstrap';
import axios from 'axios'


const Newplot = () => {
    const [userID, setuserID] = useState("");
    const [storyID, setstoryID] = useState("");

    const type = 'plot'

    useEffect(() => {
        setuserID(localStorage.getItem('userID'));
        setstoryID(1);
      }, []);
  
    return (
        <Formik
            initialValues={{ userID: '', story_id: '', type: '', content: ''}}
            onSubmit={async (values, { setSubmitting, resetForm }) => {

                setTimeout(async () => {
                    // alert('Registered sucessfully!' + JSON.stringify(values, null, 2));
                    try {
                        await axios.post(`${process.env.REACT_APP_BASE_URL}/newplot`, {
                            "userID": userID,
                            "story_id": storyID,
                            "type": type,
                            "content": values.content
                        }) .then((response) => {
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
                content: Yup.string()
                    .min(100, 'Entry should be at least 100 characters')
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
                            <div className="form-group align-self-end">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Submit"}</button>
                            </div>
                    </Stack>
                </Form>
            )
            }
        </Formik >
    );
};

export default Newplot;