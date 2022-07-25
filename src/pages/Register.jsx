import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

// import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';


export default function Register() {

    const validations = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }

        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        else if (/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(values.password) === false) {
            errors.password = 'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character';
        }
        if (values.password2 !== values.password) {
            errors.password2 = 'Passwords must match';
        }
        return errors;
    }



    return (
        <div>
            <h1>Registro</h1>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    password2: ''
                }}
                validate={validations}

                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >

                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched }) => (
                    <Form as={ Col } md='4' onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Username"
                            className="mb-3"
                        >
                            <Form.Control
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </FloatingLabel>
                        {errors.username && touched.username && errors.username}
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email} />
                            </FloatingLabel>
                        {errors.email && touched.email && errors.email}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword1">
                        <FloatingLabel
                                controlId="floatingInput"
                                label="Password"
                                className="mb-3"
                            >
                            <Form.Control
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password} />
                                </FloatingLabel>
                            {errors.password && touched.password && errors.password}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <FloatingLabel
                                controlId="floatingInput"
                                label="Repeat Password"
                                className="mb-3"
                            >
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password2} />
                                </FloatingLabel>
                            {errors.password2 && touched.password2 && errors.password2}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <br/>
                        <Form.Label>Already have an account?
                            <Link to="/login">Login</Link>
                        </Form.Label>
                    </Form>
                )}
            </Formik>
        </div>
    )
}