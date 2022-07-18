import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import auth from '../../../firebase.init';
import CustomLink from './CustomLink/CustomLink';
import './NavMenu.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading';

const NavMenu = () => {
    const navigate = useNavigate()

    const [user, loading, error] = useAuthState(auth);

    let displayError;
    if (error) {
        displayError = <h5 className='text-danger text-center '>{error.message}</h5>
    }
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='container'>
            <Navbar bg="transparent" expand="lg" className='navbar-sticky'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="ms-auto menu">
                        {
                            user?.email || user?.displayName ? (
                                <>
                                    <CustomLink to="/home" className='nav-link header-title'>Home</CustomLink>

                                    <button className='logout-btn' onClick={() => signOut(auth)}>Logout</button>
                                </>
                            ) : (
                                navigate('/login')
                            )
                        }


                    </Nav>
                </Navbar.Collapse>

            </Navbar>
            {displayError}
        </div>
    );
};

export default NavMenu;