""" Notes database """
# -*- coding: utf-8 -*-

import sqlite3
import datetime
from contextlib import contextmanager

DB_PATH = "./notes.db"

class Note:
    """ Note data """

    @staticmethod
    def from_dto(dto):
        """ Create note from Data Transfer Object """

        return Note(dto['id'], dto['title'], dto['text'], dto['date'])
    
    @staticmethod
    def from_tuple(items):
        """ Create note from data tuple """

        return Note(items[0], items[1], items[2], items[3])

    def __init__(self, id, title, text, updated):
        self.id = id
        self.title = title
        self.text = text
        self.updated = updated

    def to_dto(self):
        """ Convert to Data Transfer Object """

        return {
            'id': self.id,
            'title': self.title,
            'text': self.text,
            'updated': self.updated
        }
    
    def to_tuple(self):
        """ Convert to tuple """

        return (self.id, self.title, self.text, self.updated)
    
    def __repr__(self):
        return 'Note: {0}, {1}'.format(self.id, self.title)
    
class NotesDatabase():
    """ Notes database access """
    
    def __init__(self, path=DB_PATH):
        self.db = sqlite3.Connection(path)

    def open(self):
        """ Open or create database """

        cur = self.db.execute("SELECT 1 FROM sqlite_master WHERE tbl_name = 'notes'")
        
        if cur.fetchone() is None:
            self.db.execute('CREATE TABLE notes ('
                                'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                                'title text(64), '
                                'content text(4096), '
                                'modify_date text(64))')
        cur.close()

    def get_note_by_id(self, id):
        """ Return single note """

        cur = self.db.execute('SELECT * FROM notes WHERE id = ?', (id,))
        row = cur.fetchone()

        if row is not None:
            return Note.from_tuple(row)
        else:
            return None

    def get_notes_list(self):
        """ Return all notes """

        cur = self.db.execute('SELECT * FROM notes')
        all_notes = [Note.from_tuple(t) for t in cur.fetchall()]
        cur.close()

        return all_notes
    
    def append_new_note(self, note):
        """ Add new note to database """

        self.db.execute('INSERT INTO notes (title, content, modify_date) ' 
                        'VALUES (?, ?, ?)',
                        (note.to_tuple()[1:]))
        self.db.commit()
        
    def update_note(self, id, note):
        """ Update existing note data """

        note_tuple = note.to_tuple()
        self.db.execute('UPDATE notes SET '
                            'title = ?, '
                            'content = ?, '
                            'modify_date = ? '
                            'WHERE id = ?',
                        (*note_tuple[1:], note_tuple[0]))
        self.db.commit()
    
    def remove_note_by_id(self, id):
        """ Remove note from database """

        self.db.execute('DELETE FROM notes WHERE id = ?', (id,))
        self.db.commit()

    def close(self):
        """ Close database """

        self.db.commit()
        self.db.close()
    
@contextmanager
def open_db(path=DB_PATH):
    """ Open database using context manager """

    db = NotesDatabase(path)

    try:
        db.open()
        yield db
    finally:
        db.close()

if __name__ == '__main__':
    print('Notes database test')

    with open_db('../notes.db') as notes_db:

        num_notes_orig = len(notes_db.get_notes_list())

        # Add note
        notes_db.append_new_note(Note(None, 
                                    'Test note', 
                                    'Sample text!', 
                                    '01.02.2024 12:15'))
        
        new_list = notes_db.get_notes_list()
        num_notes_after_append = len(new_list)
        assert num_notes_after_append > num_notes_orig

        print('Added note with id: {0}'.format(new_list[-1].id))

        # Remove note
        note_to_remove = new_list[-1]
        notes_db.remove_note_by_id(note_to_remove.id)
        num_notes_after_remove = len(notes_db.get_notes_list())
        assert num_notes_after_remove < num_notes_after_append

        print('Removed note with id: {0}'.format(note_to_remove.id))

    print('Success!')