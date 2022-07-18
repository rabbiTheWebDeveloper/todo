import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Loading/Loading';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    let displayError;
    if (error) {
        displayError = <h5 className='text-danger text-center '>{error?.message}</h5>
    }
    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        navigate(from, { replace: true });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        signInWithEmailAndPassword(email, password);
        event.target.reset();

        console.log(email, password);

    }


    return (
        <div className='register-background'>
            <div className='container form-container'>
                <h1 className='text-center py-4'>Please Login</h1>
                {displayError}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <p className='text-center'>Don't Have An Account? <Link to='/register' >Please Register</Link></p>
                    </Form.Group>
                    <div className='w-100'>
                        <Button variant="primary" type="submit" className='w-75 mx-5'>
                            Login
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
};

export default Login;