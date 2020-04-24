import React from 'react';

/** Toolbar button */
function ToolButton(props) {
  return (
    <h2 onClick={props.onclick}>
      <a title={props.title}>
        {props.children}
      </a>
    </h2>
  );
}

/** Page header */
export default function Header(props) {
  const viewingList = props.note === null;

  return (
      <div className="App-header">
        <div>
          <h2>
            {viewingList ? "Notes" : props.note.title}
          </h2>
        </div>
        <div className="toolbar">
          { viewingList ? (
            <ToolButton title="New note" onclick={props.onNewNote}>+</ToolButton>
          ) : (
            <React.Fragment>
              <ToolButton title="Save" onclick={props.onSave}>&#10515;</ToolButton>
              <ToolButton title="Close" onclick={props.onClose}>&#10799;</ToolButton>
            </React.Fragment>
          )}
        </div>
      </div>
  );
}