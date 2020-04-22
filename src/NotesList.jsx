import React from 'react';
import NoteItem from './NoteItem';

/** List with notes */
export default class NotesList extends React.Component {

    render() {
        const clickCallback = this.props.noteClicked;
        const removeCallback = this.props.noteRemoved;

        return (
            <div className="notes-list">
                {this.props.notes.map((note, i) => { 
                    return (
                        <NoteItem 
                            key={i} 
                            note={note} 
                            onselected={clickCallback} 
                            onremove={removeCallback} />
                    );
                })}
            </div>
        );
    }
}