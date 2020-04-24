// Simple notes database

let nextId = 1;
const notes = [];

/** Generate sample list of notes */
function generateTestNotes() {
    const NUM_NOTES = 10;

    const ts = new Date();

    while(nextId <= NUM_NOTES) {
        const newNote = {
            id: nextId,
            title: `Note #${nextId}`,
            text: 'Sample content',
            updated: ts
        };
        notes.push(newNote);

        nextId++;
    }
}

/** Get list that contains all notes */
function getNotesList() {
    return notes;
}

/** Get particular note by it's identifier */
function getNoteById(id) {
    return notes.find(n => n.id === id);
}

/** Store new note */
function appendNewNote(noteData) {
    let newNote = createNoteFromDTO(noteData);
    newNote.id = nextId;
    notes.push(newNote);

    nextId++;
}

/** Update note info */
function updateExistingNote(id, noteData) {
    let noteToUpdateIdx = notes.findIndex(n => n.id === id);

    if(noteToUpdateIdx > -1) {
        let newNote = createNoteFromDTO(noteData);
        newNote.id = id;
        notes.splice(noteToUpdateIdx, 1, newNote);
    }
}

function createNoteFromDTO(dto) {
    return {
        id: dto.id,
        title: dto.title,
        text: dto.text,
        updated: dto.date
    };
}

/** Remove existing note with given id */
function removeNoteById(id) {
    let noteToRemoveIdx = notes.findIndex(n => n.id === id);

    if(noteToRemoveIdx > -1) {
        notes.splice(noteToRemoveIdx, 1);
    }
}

generateTestNotes();

module.exports = {
    getAllNotes: getNotesList,
    getNote: getNoteById,
    addNewNote: appendNewNote,
    updateNote: updateExistingNote,
    removeNote: removeNoteById
};