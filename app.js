// Server app for Notes

const express = require('express');
const jsonParser = require('body-parser').json();
const db = require('./notes-db');

const app = express();

// GET / - List of all notes
app.get('/api/', (req, res) => {
    const allNotes = db.getAllNotes();
    res.json(allNotes);
});

// GET /:id - Get note by id
app.get('/api/:id', (req, res) => {
    const requestedNote = db.getNote(parseInt(req.params.id));

    if(typeof(requestedNote) != 'undefined') {
        res.json(requestedNote);
    } else {
        res.status(404).end('Note not found!');
    }
});

// PUT /:id - Put new note or replace existing
app.put('/api/:id', jsonParser, (req, res) => {
    const noteId = parseInt(req.params.id);
    console.log(req.body);
    const noteIsNew = noteId <= 0;

    if(noteIsNew) {
        db.addNewNote(req.body);
    } else {
        db.updateNote(noteId, req.body);
    }

    res.end('OK');
});

// DELETE /:id - Remove note
app.delete('/api/:id', (req, res) => {
    const noteId = parseInt(req.params.id);

    db.removeNote(noteId);
    res.end('OK');
});

// Block all other requests
app.use((req, res) => {
    res.status(400);
    res.type('plain');
    res.end('Bad Request');
});

app.listen(8080, () => console.log('Server ready...'));
