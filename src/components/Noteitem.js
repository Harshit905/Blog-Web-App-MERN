// export default NoteItem
import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import './NoteItem.css'; // Create this CSS file for styling

const NoteItem = (props) => { 
  const { note, updateNote } = props;
  const context = useContext(noteContext) ;
  const { deleteNote } = context;

  // Format the date (assuming 'note.date' is the date property in your note object)
  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <>
    <div className="note-card my-2">
      <div className="note-header">
        <h3 className='note-title'>{note.title}</h3>
        <div className="note-icons">
          <i className="fas fa-edit" onClick={() => { updateNote(note) }}></i>
          <i className="fas fa-trash-alt" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted", "success") }}></i>
        </div>
      </div>
      <p className="note-description">{note.description}</p>
      <p className="note-date">{formatDate(note.date)}</p>
    </div>
      </>
  );
}

export default NoteItem;
