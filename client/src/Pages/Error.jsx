import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8d7da',
        color: '#721c24',
        textAlign: 'center',
        padding: '2rem'
    }}>
        <h1>Oops! Something went wrong.</h1>
        <p>
            We're sorry, but an unexpected error has occurred.<br />
            Please try refreshing the page or go back to the homepage.
        </p>
        <Link to="/" style={{
            marginTop: '1rem',
            padding: '0.5rem 1.5rem',
            background: '#721c24',
            color: '#fff',
            borderRadius: '4px',
            textDecoration: 'none'
        }}>
            Go Home
        </Link>
    </div>
);

export default Error;