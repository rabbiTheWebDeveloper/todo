import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from "../../../firebase.init";
import Loading from '../../Loading/Loading';

const Register = () => {
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);


    let displayError;
    if (error) {
        displayError = <h5 className='text-danger text-center '>{error?.message}</h5>
    }
    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        navigate('/home');
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(email, password);
        event.target.reset();
        console.log(name, email, password);

    }
    return (
        <div className='login-background'>
            <div className='container form-container'>
                <h1 className='text-center py-4'>Please Register</h1>
                <Form onSubmit={handleSubmit}>
                    {displayError}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name="name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <p className='text-center'>Already Have An Account? <Link to='/login' >Please Login</Link></p>
                    </Form.Group>
                    <div className='w-100'>
                        <Button variant="primary" type="submit" className='w-75 mx-5'>
                            Register
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
};

export default Register;