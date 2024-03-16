import React from 'react';

export default function EmptyMessage() {
    return (
        <div className="message">
        <img src={process.env.PUBLIC_URL + 'notes-empty.png+'} alt="No notes" />
            <p>No notes to show</p>
        </div>
    );
}