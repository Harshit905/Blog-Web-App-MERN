import React, { useState, useEffect } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const host = "http://localhost:5000";

  const [users, setUsers] = useState([]);
  const [userByUserId, setUserByUserId] = useState([]);

  // Get logged in user's data
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
        console.log(users);
        setUsers(json);
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  //get user by user id
  const getUserByUserId = async (id) => { 
    try {
      const response = await fetch(`${host}/api/users/userByUserId/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const json = await response.json();
        setUserByUserId(json);
        console.log("userdd:",json);  // Corrected logging
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
    <UserContext.Provider value={{ users, getUsers,userByUserId,getUserByUserId }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
