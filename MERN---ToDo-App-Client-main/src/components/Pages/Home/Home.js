import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Footer from '../../Shared/Footer/Footer';
import NavMenu from '../../Shared/NavMenu/NavMenu';
import Notes from '../Notes/Notes';
import './Home.css';

const Home = () => {
    const [user] = useAuthState(auth);
    console.log(user);

    const handleSubmit = event => {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.note.value;

        event.target.reset();

        const note = { title: title, description: description, email: user.email, textDecoration: 'none' };

        fetch('https://evening-garden-68596.herokuapp.com/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(note)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast("Note Added Successfully!");
            })
    }


    return (
        <div className='home-container'>
            <NavMenu></NavMenu>
            <div className='home'>
                <h1 className=''><strong> Soft It Care T O D O</strong></h1>
                <div className='input-fields'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Note Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Enter Note Title"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="floatingTextarea2">
                            <Form.Label>Note Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name='note'
                                placeholder="Type your Note..."

                            />
                        </Form.Group>
                        <Button variant="outline-info" className='mx-5' type="submit">ADD TASK</Button>
                    </Form>
                </div>
            </div>
            <div className='HR'></div>

            <Notes></Notes>

            <Footer></Footer>
        </div>
    );
};

export default Home;