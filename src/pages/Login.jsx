import React, { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from "../utils/routes/APIRoutes";

//utils
import { messageError, message, toastOptions } from "../utils/messagesToast/messages";

//style
import s from '../utils/style/Register.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function Login() {
    const [envio, setEnvio] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token-chatapp-user')){
            navigate('/setAvatar');
            
        }
        else{
            navigate('/login');
        }
    },[]);

    const validations = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'El correo electronico es requerido';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Correo electronico invalido';
        }

        if (!values.password) {
            errors.password = 'La contraseña es requerida';
        }
       
        return errors;
    }


    const handleSubmit = async (values, { setSubmitting }) => {

        try {
            const { data } = await axios.post(loginRoute, values);
            console.log(data);
            if (data.status === true) {
                console.log('funciono')
                message();
                setEnvio(true);
                localStorage.setItem('token-chatapp-user', JSON.stringify(data.user));
                setSubmitting(false);
                navigate('/setAvatar');
            }
            if (data.status === false) {
                toast.error(data.message, toastOptions);
                setEnvio(false);
            }
        }
        catch (err) {
            console.log(err);
            messageError()
            setEnvio(false);
        }
    }

    return (
        <div className={s.container}>
            <center>
            <Card sx={{minWidth:275, maxWidth:900}}>
                <CardContent>

                <h1>Iniciar sesion</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
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

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <br />
                            <Form.Label>Aun no tienes una cuenta?
                                <Link to="/register"> Registrate</Link>
                            </Form.Label>
                        </form>
                    )}
                </Formik>
                </CardContent>
            </Card>
            </center>
            <ToastContainer
                theme='dark'
            />
        </div>
    )
}