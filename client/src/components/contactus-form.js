import React from 'react';
import { Formik, Field, Form } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as Yup from 'yup';

const ContactUsForm = () => {

    return (
        <Formik
            initialValues={{ name: '', email: '', subject: '', content: '' }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 1000);
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Name is required'),
                subject: Yup.string()
                    .required('Subject is required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required'),
            })}
        >
            {(formik, isSubmitting) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Field name="name" className={(formik.touched.name && formik.errors.name) ? 'form-control is-invalid' : 'form-control'} type="text" />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="invalid-feedback">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <Field name="email" className={(formik.touched.email && formik.errors.email) ? 'form-control is-invalid' : 'form-control'} type="email" />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <Field name="subject" className={(formik.touched.subject && formik.errors.subject) ? 'form-control is-invalid' : 'form-control'} type="text" />
                        {formik.touched.subject && formik.errors.subject ? (
                            <div className="invalid-feedback">{formik.errors.subject}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <Field name="content" className="form-control" as="textarea" rows={3} cols={10} />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Submit"}</button>
                    </div>

                </Form>
            )
            }
        </Formik >
    );
};

export default ContactUsForm;