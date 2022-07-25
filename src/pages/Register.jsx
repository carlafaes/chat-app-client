import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';

// import InputGroup from 'react-bootstrap/InputGroup';
// import Col from 'react-bootstrap/Col';


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
            >

                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        {errors.username && touched.username && errors.username}
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email} />
                        </Form.Group>
                        {errors.email && touched.email && errors.email}

                        <Form.Group className="mb-3" controlId="formBasicPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password} />
                            {errors.password && touched.password && errors.password}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password2} />
                            {errors.password2 && touched.password2 && errors.password2}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}