// Server app for Notes
const SERVER_PORT = 8080;
const STATIC_DIR = 'build';

const express = require('express');
const jsonParser = require('body-parser').json();
const db = require('./notes-db');

const app = express();

// Static content
app.use(express.static(`${__dirname}/${STATIC_DIR}`));

// GET / - List of all notes
app.get('/api/', async (_, res) => {
    const allNotes = await db.getAllNotes();
    res.json(allNotes);
});

// GET /:id - Get note by id
app.get('/api/:id', async (req, res) => {
    const requestedNote = await db.getNote(parseInt(req.params.id));

    if(typeof(requestedNote) != 'undefined') {
        res.json(requestedNote);
    } else {
        res.status(404).end('Note not found!');
    }
});

// POST / - Save new note
app.post('/api/', jsonParser, async (req, res) => {
    await db.addNewNote(req.body);

    res.end('OK');
});

// PUT /:id - Update existing note
app.put('/api/:id', jsonParser, async (req, res) => {
    const noteId = parseInt(req.params.id);
    await db.updateNote(noteId, req.body);

    res.end('OK');
});

// DELETE /:id - Remove note
app.delete('/api/:id', async (req, res) => {
    const noteId = parseInt(req.params.id);

    await db.removeNote(noteId);
    res.end('OK');
});

// Block all other requests
app.use((req, res) => {
    res.status(400);
    res.type('plain');
    res.end('Bad Request');
});

app.listen(SERVER_PORT, () => {
    console.log(`App ready on port ${SERVER_PORT}`);
});
