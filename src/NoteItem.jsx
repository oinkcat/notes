import React from 'react';

/** Note list item */
export default class NoteItem extends React.Component {

    noteSelected = () => {
        this.props.onselected(this.props.note);
    };

    noteToRemove = () => {
        this.props.onremove(this.props.note);
    };

    render() {
        return (
            <div className="notes-list__item">
                <div className="notes-list__item-title" onClick={this.noteSelected}>
                    {this.props.note.title}
                </div>
                <div className="notes-list__item-remove" onClick={this.noteToRemove} title="Remove">
                    &times;
                </div>
            </div>
        );
    }
}