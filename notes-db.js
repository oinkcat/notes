// Notes database

const sqlite3 = require('sqlite3');

const DB_FILENAME = 'notes.db';
let notesDb = null;

/** Open notes database or create if not exists */
function openOrCreateDataBase() {
    notesDb = new sqlite3.Database(DB_FILENAME);

    notesDb.get("SELECT 1 FROM sqlite_master WHERE tbl_name = 'notes'", (err, row) => {
        if(!row) {
            notesDb.run(`CREATE TABLE notes (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            title text(64),
                            content text(4096),
                            modify_date text(64))`);
        }
    });
}

/** Get list that contains all notes */
function getNotesList() {
    return new Promise((resolve, reject) => {
        notesDb.all('SELECT * FROM notes', (err, rows) => {
            if(!err) {
                let notes = rows.map(r => createNoteFromDbRow(r));
                resolve(notes);
            } else {
                reject(err);
            }
        });
    });
}

/** Get particular note by it's identifier */
function getNoteById(id) {
    return new Promise((resolve, reject) => {
        notesDb.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
            if(!err) {
                if(row) {
                    let note = createNoteFromDbRow(row);
                    resolve(note);
                } else {
                    resolve(undefined);
                }
            } else {
                reject(err);
            }
        });
    });
}

function createNoteFromDbRow(row) {
    return {
        id: row['id'],
        title: row['title'],
        text: row['content'],
        updated: new Date(row['modify_date'])
    };
}

/** Store new note */
function appendNewNote(noteData) {
    return new Promise((resolve, _) => {
        let note = createNoteFromDTO(noteData);

        notesDb.run(`INSERT INTO notes (title, content, modify_date) 
                        VALUES (?, ?, ?)`, [
                            note.title,
                            note.text,
                            note.updated
                        ], _ => resolve());
    });
}

/** Update note info */
function updateExistingNote(id, noteData) {
    return new Promise((resolve, _) => {
        let note = createNoteFromDTO(noteData);

        notesDb.run(`UPDATE notes SET
                        title = ?,
                        content = ?,
                        modify_date = ?
                        WHERE id = ?`, [
                            note.title,
                            note.text,
                            note.updated,
                            id
                        ], _ => resolve());
    });
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
    return new Promise((resolve, _) => {
        notesDb.run('DELETE FROM notes WHERE id = ?', [id], _ => resolve());
    });
}

openOrCreateDataBase();

module.exports = {
    getAllNotes: getNotesList,
    getNote: getNoteById,
    addNewNote: appendNewNote,
    updateNote: updateExistingNote,
    removeNote: removeNoteById
};