import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Formik, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from "../utils/routes/APIRoutes";

//utils
import {messageError, message,toastOptions} from "../utils/messagesToast/messages";

//style
import s from '../utils/style/Register.module.css';
// import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';


export default function Register() {
    const [envio,setEnvio] = useState(false);
    const navigate=useNavigate();

    const toastOptions= {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const message = () => {
        toast.success('Registro exitoso!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const messageError = () => {
        toast.error('Algo ha salido mal! :(', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

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


    const handleSubmit = async(values, { setSubmitting }) => {
        
            const { data } = await axios.post(registerRoute, values);
            console.log(data);
            if(data.status === false){
                toast.error(data.message, toastOptions);
                messageError()
                setEnvio(false);
                setSubmitting(false);
            }
            else{
                message();
                setEnvio(true);
                localStorage.setItem('token-chatapp-user', JSON.stringify(data.user));
                setSubmitting(false);
                navigate('/login');
            }
                console.log(JSON.stringify(values, null, 2));
                
    }

    return (
        <div>
            <center>
                <h1>Registro</h1>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        password2: ''
                    }}
                    validate={validations}

                    onSubmit={handleSubmit}
                >

                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched }) => (
                        <form onSubmit={handleSubmit}>
                            <FloatingLabel
                                controlId="floatingInputUsername"
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
                            <p className={s.errors_msg}>
                                {errors.username && touched.username && errors.username}
                            </p>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail">
                                <FloatingLabel
                                    controlId="floatingInputEmail"
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
                                <p className={s.errors_msg}>
                                    {errors.email && touched.email && errors.email}
                                </p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword1">
                                <FloatingLabel
                                    controlId="floatingInputPassword"
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
                                <p className={s.errors_msg}>
                                    {errors.password && touched.password && errors.password}
                                </p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                <FloatingLabel
                                    controlId="floatingInputPassword2"
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
                                <p className={s.errors_msg}>
                                    {errors.password2 && touched.password2 && errors.password2}
                                </p>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <br />
                            <Form.Label>Already have an account?
                                <Link to="/login">Login</Link>
                            </Form.Label>
                        </form>
                    )}
                </Formik>
            </center>
            <ToastContainer
                theme='dark'
            />
        </div>
    )
}