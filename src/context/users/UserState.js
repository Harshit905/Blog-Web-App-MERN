import React, { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const host = "http://localhost:5000"
const usersInitial = []
const [users, setUsers] = useState(usersInitial);
  // Get all users
  const getUsers = async () => {
    // API Call 
    // http://localhost:5000/api/auth/getuser
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      }
    });
    const json = await response.json()
    console.log(json)
    setUsers(json)
  }


  return (
    <UserContext.Provider value={{ users,  getUsers }}>
      {/* // <NoteContext.Provider value={{ notes }}> */}
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;
