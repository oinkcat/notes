import React from 'react';

export default function Loader() {
    return (
        <div className="message">
            <img src={process.env.PUBLIC_URL + 'loading.gif'} alt="Loading" />
            <p>Loading notes list...</p>
        </div>
    );
}