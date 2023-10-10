import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import userContext from "../context/users/userContext"
import './AboutUser.css'
import aboutimg from '../assets/aboutimg.gif';
const AboutUser = (props) => {
  const context_for_user = useContext(userContext)
  const { users, getUsers } = context_for_user;

  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('token')) {
        getUsers()
    }
    else {
        history.push("/login")
    }

}, [])


const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(undefined, options);
};


  return (
    <div className='aboutuser-body'>
      {/* <h1>This is about user page.</h1>
      <p>{users.name}</p>
      <p>{users.email}</p>
      <p>{users.password}</p>
      <p>{users.date}</p>
      <p>{users.university}</p>
      <p>{users.degree}</p>
      <p>{users.major}</p>
      <p>{users.registration}</p>
      <p>{users.github}</p>
      <p>{users.skills}</p>
      <p>{users.about_yourself}</p> */}


      <div className="about-card">
      <div className="card-header">
        <img className="profile-image" src={aboutimg} alt="Profile" />
      </div>
      <div className="card-body">
        <h1 className="name">{users.name}</h1>
          <p className="email"><i className="fas fa-envelope"></i> {users.email}</p>
          <p className="graduation"><i className="fas fa-graduation-cap"></i>Pursuing Graduation from {users.university}</p>
          <p className="student-id"><i className="fas fa-user"></i> Student ID: {users.registration}</p>
          <p className="github"><i className="fab fa-github"></i> GitHub: <a className="github-link" href={users.github}>https://github.com/Harshit905</a></p>
          <p className="major"><i className="fas fa-laptop"></i> Studied {users.degree} in {users.major}</p>
          <p className="skills"><i className="fas fa-code"></i> {users.skills}</p>
          <h1 className="name">About</h1>
          <p className="about_yourself">{users.about_yourself}</p>
          <p className='date_about'>Joined NoteCanvas on {formatDate(users.date)}</p>
      </div>
      
    </div>

    </div>
  )
}

export default AboutUser
