import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { Button, Stack, Modal } from 'react-bootstrap';

import YupPassword from 'yup-password'
YupPassword(Yup)

const Login_form = () => {

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    alert('Registered sucessfully!' + JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 1000);
            }}

            validationSchema={Yup.object({
                email: Yup.string()
                    .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Is not in correct format')
                    .required('Email is required'),
                password: Yup.string()
                    .max(30, 'Password should be between 8-30 characters in length')
                    .required('Password is required')
                    .min(
                        8,
                        'Password must contain at least one uppercase, lowercase, number and special character'
                    )
                    .minLowercase(1, 'Password must contain at least one lower case letter')
                    .minUppercase(1, 'Password must contain at least one upper case letter')
                    .minNumbers(1, 'Password must contain at least one number')
                    .minSymbols(1, 'Password must contain at least one special character'),
            })}

        >
            {(formik, isSubmitting) => (
                <Form>
                    <Stack gap={3}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <Field name="email" className={(formik.touched.email && formik.errors.email) ? 'form-control is-invalid' : 'form-control'}
                                type="email" placeholder="name@example.com" />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" className={(formik.touched.password && formik.errors.password) ? 'form-control is-invalid' : 'form-control'}
                                type="text"
                                placeholder="Example_Password123!" />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <Modal.Footer>
                            <div className="form-group align-self-end">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Submit"}</button>
                            </div>
                        </Modal.Footer>
                    </Stack>
                </Form>

            )
            }
        </Formik >
    );
};

export default Login_form;