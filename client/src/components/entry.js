import 'bootstrap/dist/css/bootstrap.css';
import { Button, Offcanvas, Stack } from 'react-bootstrap';
// import Newplot from './newplot';
import React, { useState, useEffect, useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { EntryContext } from '../pages/home';

export default function Entry({ ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userID, setuserID] = useState("");
  const [storyID, setstoryID] = useState("");
  const [updated, setUpdated] = useContext(EntryContext);

  useEffect(() => {
    setuserID(localStorage.getItem('userID'));
    setstoryID(1);
  }, []);

  const type = 'plot'

  const name = 'New Plot'

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <Newplot /> */}
          <Formik
            initialValues={{ userID: '', story_id: '', type: '', content: '' }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {

              setTimeout(async () => {
                // alert('Registered sucessfully!' + JSON.stringify(values, null, 2));
                try {
                  await axios.post("http://localhost:3001/newplot", {
                    "userID": userID,
                    "story_id": storyID,
                    "type": type,
                    "content": values.content
                  }).then((response) => {
                    alert(response.data);
                    setUpdated(!updated)
                  })
                } catch (error) {
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

