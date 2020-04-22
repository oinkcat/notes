import React from 'react';

/** Note */
export default class NoteEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            note: props.note
        }
    }

    getEditingNote() {
        return this.state.note;
    }

    updateText = e => {
        const newText = e.target.value;

        this.setState(prevState => {
            const noteProto = Object.getPrototypeOf(prevState.note);
            let newNote = Object.assign(Object.create(noteProto), prevState.note);
            newNote.text = newText;

            return {
                note: newNote
            };
        });
    }

    render() {
        return (
            <div className="note-edit">
                <div className="note-edit__info">
                    Last edit: {this.props.note.getModifyDate()}
                </div>

                <div className="note-edit__editor">
                    <textarea onChange={this.updateText} value={this.state.note.text}>
                    </textarea>
                </div>
            </div>
        );
    }
}