import React from 'react';
import { Formik, Field, Form } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { Stack, Modal } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
// import { useCookies } from 'react-cookie'
import YupPassword from 'yup-password'
YupPassword(Yup)

const Login = () => {
    // const [_, setCookies ] = useCookies(["access_token"]);
    const navigate = useNavigate()

    return (
        <Formik
            initialValues={{ email: '', password: '' }}

            onSubmit={async (values, { setSubmitting, resetForm }) => {

                setTimeout(async () => {
                    try {
                        const user = await axios.post("http://localhost:3001/login", {
                            "email": values.email,
                            "password": values.password
                        }) .then((response) => {
                            // setCookies("access_token", response.data.token)
                            window.localStorage.setItem("userID", response.data.userID)
                            // console.log(response.status)
                            alert('Logged in sucessfully!');
                            navigate("/Home")
                          })
                    }   catch (error) {
                        alert(error.response.data)
                    }
                    setSubmitting(false);
                    resetForm()
                }, 1000);
            }}


            validationSchema={Yup.object({
                email: Yup.string()
                    .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Email format is incorrect')
                    .required('Email is required'),
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
                                type="password"
                                placeholder="Example_Password123!" />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <Modal.Footer>
                            <div className='req_status'></div>
                            <div className="form-group align-self-end">
                                <button type="submit" className="btn btn-dark" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Submit"}</button>
                            </div>
                        </Modal.Footer>
                    </Stack>
                </Form>

            )
            }
        </Formik >
    );
};

export default Login;