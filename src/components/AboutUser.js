import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import userContext from "../context/users/userContext"
import blogContext from "../context/blogs/blogContext"
import './AboutUser.css'
import aboutimg from '../assets/aboutimg.gif';
import { useSpring, animated } from 'react-spring';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const AboutUser = (props) => {
  const {id}=useParams();
  const context_for_user = useContext(userContext);
  const context_blogs = useContext(blogContext);
  const {  users,getUserByUserId ,userByUserId } = context_for_user;
  const {userblogsById, getBlogsByUserId } = context_blogs;
  let history = useHistory();
  useEffect(() => {
    getBlogsByUserId(users._id);
    if (localStorage.getItem('token')) {
      getBlogsByUserId(id)
      getUserByUserId(id)
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
    <>


      {/* <p className="graduation"><i className="fas fa-graduation-cap"></i>Pursuing Graduation from {userByUserId.university}</p>
          <p className="major"><i className="fas fa-laptop"></i> Studied {users.degree} in {userByUserId.major}</p>
        */}

      <div class="container user-container" style={{ border: "1px solid red" }}>
      {userByUserId._id ===users._id && <i className="fas fa-edit"></i>}

        <div class="row user-icons" style={{ border: "1px solid red" }}>
          <div class="col-lg-4 col-md-6 user-img-container" style={{ border: "1px solid red" }}>
            <img src={aboutimg} alt="User Image" class="user-image img-fluid" />
          </div>
          <div class="col-lg-8 col-md-6" style={{ border: "1px solid red", padding: "0" }}>
            <div class="user-info" style={{ border: "1px solid red" }}>
              <div style={{ border: "1px solid red" }}>
                <h3 style={{ color: "#0048a7" }}>{userByUserId.name}</h3>
                <h3 style={{color:"#0048a7"}}>{userByUserId._id}</h3>
                <p><i className="fas fa-user"></i> {userByUserId.registration}</p>
                <p><i className="fas fa-envelope"></i> {userByUserId.email}</p>
                <div className='d-flex' style={{ border: "1px solid red" }}>
                  <input type="checkbox" />
                  <p class="user-blogs" >Followers : {userByUserId && userByUserId.followers ? userByUserId.followers.length : 0}</p>
                  <p class="user-blogs" >Followings : {userByUserId && userByUserId.followings ? userByUserId.followings.length : 0} </p>
                  <Link  to={`/blogs-by-user/${id}`}>
                    <p className="user-blogs">Blogs: {userByUserId && userblogsById ? userblogsById.length : 0}</p>
                  </Link>
                </div>
              </div>

            </div>
            <div class="user-about" style={{ border: "1px solid red" }}>
              <h4 style={{ textAlign: "center" }}>About</h4>
              <p>{userByUserId.about_yourself}</p>
            </div>
            <div class="user-about" style={{ border: "1px solid red" }}>
              <h5><i className="fas fa-code"></i> My Major Skills</h5>
              <p>{userByUserId.skills}</p>
            </div>
            <ul>
              <li><a href="#" target="_blank">
                <i class="fab fa-facebook" tabIndex="0"></i>
              </a></li>
              <li><a href="#" target="_blank">
                <i class="fab fa-instagram" tabIndex="0"></i>
              </a></li>
              <li><a href={userByUserId.github} target="_blank">
                <i class="fab fa-github" tabIndex="0"></i>
              </a></li>
              <li><a href="#" target="_blank">
                <i class=" fab fa-brands fa-twitter" tabIndex="0"></i>
              </a></li>
            </ul>
          </div> 
        </div>
        <p className='date_about' style={{ padding: "0", margin: "0", textAlign: "end", fontStyle: "italic", fontSize: "0.6rem" }}>Joined NoteCanvas on {formatDate(userByUserId.date)}</p>
      </div>

    </>
  )
}

export default AboutUser
