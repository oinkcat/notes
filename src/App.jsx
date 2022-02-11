import React, { Component } from 'react';
import Header from './Header';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import Footer from './Footer';
import Loader from './Loader';
import EmptyMessage from './EmptyMessage';
import Note from './Note';
import * as Client from './NotesClient';

/** Application main controller */
class App extends Component {
  static VIEW_LIST = 'list';
  static VIEW_CONTENT = 'note';

  constructor() {
    super();

    this.state = {
      loading: true,
      view: App.VIEW_LIST,
      notes: [],
      selectedNote: null
    };

    this.editorRef = React.createRef();
  }

  componentDidMount() {
    this.reloadNotes();
  }

  /** Reload all notes from server */
  reloadNotes() {
    this.setState({ loading: true });

    Client.fetchAllNotes().then(loadedNotes => {
      this.setState({
        notes: loadedNotes,
        loading: false
      });
    });
  }

  /**Note for editing was selected */
  noteSelected = (note) => {
    Client.fetchNote(note.id).then(loadedNote => {
      this.openNoteForEditing(loadedNote);
    });
  };

  /** Create new note and open editing view */
  createNewNote = () => this.openNoteForEditing(Note.NewNote());

  openNoteForEditing(selectedNote) {
    this.setState({
      view: App.VIEW_CONTENT,
      selectedNote: selectedNote
    });
  }

  /** Remove note from list */
  removeNote = (note) => {
    Client.removeNote(note.id);
    this.reloadNotes();
  };

  /** Close editing view */
  closeNoteView = () => {
    this.setState({
      view: App.VIEW_LIST,
      selectedNote: null
    });
  }

  /** Save newly created note */
  saveNote = () => {
    const noteToSave = this.editorRef.current.getEditingNote();

    if(noteToSave.text.trim().length <= 0) {
      return;
    }

    let savePromise;
    if(noteToSave.id === null) {
      savePromise = Client.addNote(noteToSave.text);
    } else {
      savePromise = Client.updateNote(noteToSave.id, noteToSave.text);
    }

    savePromise.then(() => {
      this.setState({
        view: App.VIEW_LIST,
        selectedNote: null
      });
  
      this.reloadNotes();
    });
  }

  renderAppViews() {
    return (
      <React.Fragment>
        { this.state.view === App.VIEW_LIST && (
            (this.state.notes.length > 0)
              ? <NotesList
                  notes={this.state.notes} 
                  noteClicked={this.noteSelected} 
                  noteRemoved={this.removeNote} />
              : <EmptyMessage />
            )
           }
    
        { this.state.view === App.VIEW_CONTENT && 
          <NoteEditor
            note={this.state.selectedNote}
            ref={this.editorRef} /> }
        </React.Fragment>
    );
  }

  render() {
    return (
      <div className="App">
        <Header 
          note={this.state.selectedNote}
          onNewNote={this.createNewNote}
          onClose={this.closeNoteView}
          onSave={this.saveNote}
        />

        <div className="content">
          { this.state.loading ? <Loader /> : this.renderAppViews() }
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
