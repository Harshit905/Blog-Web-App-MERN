import React, { useState, useEffect } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const host = "http://localhost:5000";

  const [users, setUsers] = useState([]);

  // Get all users
  const getUsers = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token'),
        }
      });

      if (response.ok) {
        const json = await response.json();
        setUsers(json);
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUsers();
    }
  }, []);

  return (
    <UserContext.Provider value={{ users, getUsers }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
