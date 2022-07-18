import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './Notes.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';

const Notes = () => {
    const [user] = useAuthState(auth);
    const [myNotes, setMyNotes] = useState([]);
    useEffect(() => {
        const email = user.email;
        const url = `https://evening-garden-68596.herokuapp.com/user?email=${email}`;

        fetch(url)
            .then(res => res.json())
            .then(data => setMyNotes(data))
    }, [myNotes, user.email])


    const removeNote = (id) => {
        const decision = window.confirm("Do You Really Want To Remove?");
        if (decision) {
            const url = `https://evening-garden-68596.herokuapp.com/note/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const restNotes = myNotes.filter(note => note._id !== id);
                        setMyNotes(restNotes);
                        toast("Note Deleted!");
                    }
                })
        }
    }

    const completeNote = id => {
        const decision = window.confirm("Have You Really Completed The Task?");
        if (decision) {
            const updateInfo = { textDecoration: 'line-through' };

            const url = `https://evening-garden-68596.herokuapp.com/updateDecoration/${id}`;
            fetch(url, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateInfo)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('success', data);
                    toast("Marked as Completed");
                })
        }
    }


    return (
        <div className='notes-container py-5'>
            {
                myNotes.map(note => <Card className='card-container my-3' key={note._id}>
                    <Card.Body className='d-flex justify-content-between align-items-center'>
                        <div>
                            <Card.Title style={{ textDecorationLine: `${note.textDecoration}` }}>{note.title}</Card.Title>
                            <Card.Text style={{ textDecorationLine: `${note.textDecoration}` }}>{note.description}</Card.Text>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div onClick={() => completeNote(note._id)}>
                                <Button variant="outline-info">Complete</Button>
                            </div>
                            <div onClick={() => removeNote(note._id)}>
                                <FontAwesomeIcon icon={faTrashCan} className='icon' />
                            </div>
                        </div>
                    </Card.Body>
                </Card>)
            }
        </div>
    );
};

export default Notes;