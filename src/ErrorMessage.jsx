import React from 'react';

export default function ErrorMessage() {
    return (
        <div className="message-container">
            <div className="message">
                <img src={process.env.PUBLIC_URL + 'error.png'} alt="Error" />
                <p>An error occurred</p>
            </div>
        </div>
    );
}