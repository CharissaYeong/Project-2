import 'bootstrap/dist/css/bootstrap.css';
import { Button, Offcanvas, Stack } from 'react-bootstrap';
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
  const [updated, setUpdated] = useContext(EntryContext);

  useEffect(() => {
    setuserID(localStorage.getItem('userID'));
  }, []);

  // const type = 'act1'
  const name = 'New Entry'
  const { storyID } = props;

  return (
    <>
      <Button variant="dark" onClick={handleShow} className="me-2" id='new_btn'>
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Entry</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='entry_form'>
          <Formik
            initialValues={{ userID: '', story_id: '', type: '', content: ''}}
            onSubmit={async (values, { setSubmitting, resetForm }) => {

              setTimeout(async () => {
                try {
                  await axios.post(`${process.env.REACT_APP_BASE_URL}/newplot`, {
                    "userID": userID,
                    "story_id": storyID,
                    "type": values.type,
                    "content": values.content
                  }).then((response) => {
                    alert(response.data);
                    setUpdated(!updated)
                  })
                } catch (error) {
                  alert(error.response.data)
                }
                setSubmitting(false);
                resetForm()
              }, 0);
            }}

            validationSchema={Yup.object({
              content: Yup.string()
                .min(100, 'Entry should be at least 100 characters')
                .max(2500, 'Entry should no longer than 2500 characters')
                .matches(/^[A-Z][^!?]*[.!?](\s+[A-Z][^!?]*[.!?])*$/, 'Entry should be written in complete sentences.')
                .required('Please write your entry.'),
              type: Yup.string()
              .required('Entry type is required')
            })}

          >
            {(formik, isSubmitting) => (
              <Form>
                <Stack gap={3}>
                  <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <Field
                      name="type"
                      component="select"
                      className={
                        formik.touched.type && formik.errors.type
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      as="select"
                    >
                      <option value="">Click to select entry type</option>
                      <option value="Opening">Opening</option>
                      <option value="Conflict">Conflict</option>
                      <option value="Climax">Climax</option>
                      <option value="Resolution">Resolution</option>
                      <option value="Ending">Ending</option>
                    </Field>
                    {formik.touched.type && formik.errors.type ? (
                      <div className="invalid-feedback">{formik.errors.type}</div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <Field name="content"
                      // className={(formik.touched.content && formik.errors.content) ? 'form-control is-invalid' : 'form-control'}
                      className={`form-control ${formik.touched.content && formik.errors.content ? 'is-invalid' : ''} entry-textarea`}
                      // type="textarea"
                      component="textarea"
                      placeholder="Entry should be 100-2500 characters long and written in complete sentences."
                    />
                    {formik.touched.content && formik.errors.content ? (
                      <div className="invalid-feedback">{formik.errors.content}</div>
                    ) : null}
                  </div>
                  <div className="form-group align-self-end">
                    <button type="submit" className="btn btn-dark" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Submit"}</button>
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

