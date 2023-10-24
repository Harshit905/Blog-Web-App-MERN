import React, { useContext, useEffect } from 'react'
import {Link,useLocation,useHistory} from "react-router-dom";
import noteContext from '../context/notes/noteContext'
import './About.css'
const About = () => {
  return (
    <div className='container my-3'>
      <div className="about-page">
        <div className="about-header">
          <h1>About BlogCanvas</h1>
          <p>Your Personal Note-Taking and Blogging Platform</p>
        </div>
        <div className="about-content">
          <h2>What is BlogCanvas?</h2>
          <p>
          BlogCanvas is a versatile platform that combines note-taking and blogging. It allows you to create, manage, and organize your notes, as well as publish and share blog posts with your audience.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>Create an Account: Register and create your account to save notes, publish blog posts, and engage with the community.</li>
            <li>Notes and Blogging: Seamlessly switch between taking notes and writing blog posts using a single account.</li>
            <li>User Authentication: Ensure the security of your data and content with user authentication.</li>
            <li>Customization: Personalize your notes, blog posts, and profile with different colors, themes, and styles.</li>
            <li>Community Interaction: Connect with other users, comment on blog posts, and share your thoughts.</li>
          </ul>

          <h2>About the Platform</h2>
          <p>
            BlogCanvas is developed by a passionate team of developers(Only One Member) dedicated to providing a seamless note-taking and blogging experience. We strive to make it easy for users to express themselves through both notes and blog posts, all in one platform.
          </p>

          <h2>Get Started</h2>
          <p>
            Ready to start using Blogcanvas? Sign up for an account to access note-taking and blogging features. Express yourself, share your knowledge, and connect with a community of like-minded individuals.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions, suggestions, or feedback, feel free to contact our support team at <Link to="/contact">support@BlogCanvas.com</Link>.</p>
        </div>
      </div>
    </div>
  );
};


export default About
