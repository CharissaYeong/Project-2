import 'bootstrap/dist/css/bootstrap.css';
import { Button, Offcanvas, Stack } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { EntryContext } from '../pages/home';

export default function EditEntry({ name, ...props }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [entryID, setEntryID] = useState(props.entryID);
    const [initialContent, setInitialContent] = useState("");
    const [updated, setUpdated] = useContext(EntryContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/entries/original/getcontent/${localStorage.getItem('userID')}/${entryID}`)
          .then((response) => {
            if (response.data.original && response.data.original.length > 0 && response.data.original[0].entries) {
              setInitialContent(response.data.original[0].entries[0].content);
            } else {
              setInitialContent('');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    name = 'Edit'


    return (
        <>
            <Button variant="dark" size="sm" onClick={handleShow} className="me-2">
                {name}
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="bottom">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Formik
                        initialValues={{ content: initialContent }}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {

                            setTimeout(async () => {
                                try {
                                    await axios.put(`http://localhost:3001/entries/edit/${localStorage.getItem('userID')}/${entryID}`, {
                                        "content": values.content
                                    }).then((response) => {
                                        alert(response.data);
                                    })
                                } catch (error) {
                                    // console.log(error.response.data)
                                    console.log(error.response.data)
                                }
                                setSubmitting(false);
                                resetForm()
                                // props.setUpdated(true)
                                setUpdated(!updated)
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
                                            // type="textarea"
                                            component="textarea" rows="20"
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
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

