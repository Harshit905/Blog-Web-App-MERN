import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json.reverse())
  }





  const [notes, setNotes] = useState(notesInitial);



  // Add a Note
  const addNote = async (title, description, tag,date) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag,date })
    });

    const note = await response.json();
    console.log(note)
    
    // setNotes(notes.concat(note))
    setNotes(notes => [note, ...notes]);
    // setNotes(notes => [note, ...notes.reverse()]);
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // console.log("delete "+id)
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      }
    });
    const json = await response.json();
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }
 
  const editNote = async (id, title, description, tag,date) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag,date })
    });
    const json = await response.json();

    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            title,
            description,
            tag,
            date,
          };
        } else {
          return note;
        }
      });
    });
  };


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {/* // <NoteContext.Provider value={{ notes }}> */}
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
