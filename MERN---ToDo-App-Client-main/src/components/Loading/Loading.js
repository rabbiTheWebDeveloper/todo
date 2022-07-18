import React from 'react';
import './Loading.css';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div className='loading-background'>
            <Spinner animation="border" role="status" className='spinner'>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loading;