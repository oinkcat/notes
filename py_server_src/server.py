""" Notes web service """
# -*- coding: utf-8 -*-

import bottle
import database

CONTENT_ROOT = './build/'

@bottle.get('/api/')
def get_all_notes():
    """ List of all notes """

    with database.open_db() as db:
        bottle.response.content_type = 'application/json'
        all_notes = db.get_notes_list()
        return bottle.json_dumps([note.to_dto() for note in all_notes])
    
@bottle.get('/api/<id>')
def get_note(id):
    """ Get note by id """

    with database.open_db () as db:
        note = db.get_note_by_id(int(id))

        if note is not None:
            bottle.response.content_type = 'application/json'
            return bottle.json_dumps(note.to_dto())
        else:
            bottle.response.status = 404
    
@bottle.post('/api')
@bottle.post('/api/')
def post_new_note():
    """ Save new note """

    with database.open_db() as db:
        note_dto = bottle.request.json
        db.append_new_note(database.Note.from_dto(note_dto))

    return 'OK'

@bottle.put('/api/<id>')
def update_note(id):
    """ Update existing note data """

    with database.open_db() as db:
        note_dto = bottle.request.json
        db.update_note(int(id), database.Note.from_dto(note_dto))

    return 'OK'

@bottle.delete('/api/<id>')
def remove_note(id):
    """ Remove existing note """

    with database.open_db() as db:
        db.remove_note_by_id(int(id))

    return 'OK'

@bottle.get('/')
def get_index():
    """ Get index file """

    return bottle.static_file('index.html', root=CONTENT_ROOT)

@bottle.get('/<path_to_file:path>')
def get_static_file(path_to_file):
    """ Get static file """

    return bottle.static_file(path_to_file, root=CONTENT_ROOT)

bottle.run(host='0.0.0.0', port=8080)