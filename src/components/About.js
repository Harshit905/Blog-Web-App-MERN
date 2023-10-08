import React, { useContext, useEffect } from 'react'
import {Link,useLocation,useHistory} from "react-router-dom";
import noteContext from '../context/notes/noteContext'
import './About.css'
const About = () => {
  
  return (
    <div className='container my-3'>
      
    <div className="about-page">
      <div className="about-header">
        <h1>About NoteCanvas</h1>
        <p>Your Personal Note-Taking App</p>
      </div>
      <div className="about-content">
        <h2>What is NoteCanvas?</h2>
        <p>
          NoteCanvas is a user-friendly note-taking application that allows you to create, manage, and organize your notes effortlessly.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>Create an Account: Register and create your own account to save your notes securely.</li>
          <li>CRUD Operations: Perform Create, Read, Update, and Delete (CRUD) operations on your notes with ease.</li>
          <li>Customization: Personalize your notes with different colors, tags, and more.</li>
          <li>Responsive Design: Enjoy a seamless experience on both desktop and mobile devices.</li>
        </ul>

        <h2>About the Author</h2>
        <p>
          NoteCanvas is developed by <strong>Harshit Dubey</strong>, who is currently pursuing a B.Tech in Information Technology from <a href="https://www.nitsri.ac.in/" target="_blank" rel="noopener noreferrer">NIT Srinagar</a>. Harshit aspires to become a full-stack engineer, and this project is a testament to his passion for web development.
        </p>

        <h2>Get Started</h2>
        <p>Ready to start using NoteCanvas? Simply sign up for an account, and you'll be able to access your notes from anywhere, anytime.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions, suggestions, or feedback, feel free to contact our support team at <Link to="/contact" >support@notecanvas.com</Link>.</p>
      </div>
    </div>
    </div>
  )
}

export default About
