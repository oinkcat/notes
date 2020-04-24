import Note from './Note.js';

const SVC_URL = 'http://localhost:3000/api';

/** Get a list of all notes */
export function fetchAllNotes() {
    return fetch(`${SVC_URL}/`)
        .then(resp => resp.json())
        .then(items => {
            return items.map(item => {
                return new Note(item.id, item.title, item.text, item.updated);
            });
    });
}

/** Get a note with specific id */
export function fetchNote(id) {
    return fetch(`${SVC_URL}/${id}`)
        .then(resp => resp.json())
        .then(item => {
            let updateTs = new Date(item.updated);
            return new Note(item.id, item.title, item.text, updateTs);
        });
}

/** Add new note */
export function addNote(text) {
    let newNoteTempObj = new Note(0, null, text, null);
    newNoteTempObj.update();

    return fetch(`${SVC_URL}/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNoteTempObj)
    });
}

/** Update existing note */
export function updateNote(id, text) {
    let noteTempObj = new Note(id, null, text, null);
    noteTempObj.update();

    return fetch(`${SVC_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteTempObj)
    });
}

/** Remove note with given id */
export function removeNote(id) {
    return fetch(`${SVC_URL}/${id}`, {
        method: 'DELETE'
    });
}