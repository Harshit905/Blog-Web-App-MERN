import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import userContext from "../context/users/userContext"
import blogContext from "../context/blogs/blogContext";

import './Navbar.css';
const Navbar = (props) => {


  const context_blogs = useContext(blogContext);
  const { blogs, getAllBlogs,fetchCategories,categories,getBlogsByUserId } = context_blogs;
  const context_for_user = useContext(userContext)
  const { users, getUsers,getUserByUserId } = context_for_user;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
        getUsers()
        getAllBlogs();
    }
    else {
        history.push("/login")
        getAllBlogs()
    }

}, [])
  

  const togglerClick = () => {
    setIsNavOpen(!isNavOpen);
  };
  const HandleAlert = () => {
    togglerClick();
    props.showAlert("Please Login/Signup to continue to Dashboard", "info");
  }

  let history = useHistory();

  const handleLogout = () => {
   togglerClick()
    localStorage.removeItem('token');
    getAllBlogs()
    history.push('/login')
  }

  let location = useLocation();

  const openBox = () => {
    setIsInfoBoxOpen(true);
  }

  const closeBox = () => {
    setIsInfoBoxOpen(false);
    getUserByUserId(users._id)
  }

  

  return (
    <header className={`header-area ${isNavOpen ? 'nav-open' : ''}`}>
      <div className="navbar-area">
        <div className="container-fluid">
          <nav className={`site-navbar ${isNavOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="site-logo">BlogCanvas</Link>
            <ul className={`site-nav ${isNavOpen ? 'open' : ''}`}>
              {
                !localStorage.getItem('token') ? 
                  <li>
                    <Link to="/login" onClick={HandleAlert} className={`${location.pathname === "/" ? "active-nav" : ""}`} ><i className="fa-solid fa-house-user"></i> Dashboard</Link>
                  </li> : <li>
                    <Link to="/" onClick={togglerClick} className={`${location.pathname === "/" ? "active-nav" : ""}`} ><i className="fa-solid fa-house-user"></i> Dashboard</Link>
                  </li>
              }
              <li>
                <Link to="/about" onClick={togglerClick} className={`${location.pathname === "/about" ? "active-nav" : ""}`}><i className="fa fa-file" ></i>  About</Link>
              </li>
              <li><Link  to="/blogs" onClick={togglerClick} className={`${location.pathname==="/blogs"?"active-nav":""}`}><i class="fa-solid fa-book-journal-whills"></i> Blogs</Link></li>
              <li>
                <Link to="/contact" onClick={togglerClick} className={`${location.pathname === "/contact" ? "active-nav" : ""}`}><i className="fa fa-envelope" ></i>  Contact</Link>
              </li>
              <li>
                {
                  !localStorage.getItem('token') ?
                    <form className='from-for-log-sign-nav mx-2'>
                      <Link onClick={togglerClick} className={`${location.pathname === "/" ? "active-nav mx-1 logsign-nav" : "mx-1 logsign-nav"}`} to="/login" ><button className='button-sp btn btn-primary'><i className="fa fa-sign-in"></i> Login</button></Link>
                      <Link onClick={togglerClick} className={`${location.pathname === "/" ? "active-nav mx-1 logsign-nav" : "mx-1 logsign-nav"}`} to="/signup"><button className='button-sp btn btn-primary'><i className="fa-solid fa-user-plus"></i>&nbsp;SignUp</button></Link>
                    </form> : <div className='from-for-log-sign-nav mx-2' >
                      <button className='userButton btn btn-primary mx-1 ' onClick={openBox} >U</button>
                     <Link  onClick={togglerClick} className="mobile_user_btn" to="/aboutuser"><button className='button-sp btn btn-primary mx-1'>User</button></Link> 
                      <button onClick={handleLogout} className='button-sp btn btn-primary mx-1 '>Logout</button>
                    </div>}
              </li>
            </ul>

            <div className={`${isInfoBoxOpen ? "active" : "non-active"}`} id="infoBox">
              <span className="close-icon" onClick={closeBox} ><i  className="fas fa-times"></i></span>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMr_Ky37u_30imoav7-kzi01LCBOh88WP6hu2r3IkXUJaQsWexdA" alt="avatar" />
              <p className='name_user'>{users.name}</p>
              <p className='email_user'>{users.email}</p>
              <hr/>
              <Link className="get_info_user"  onClick={closeBox} to={`/aboutuser/${users._id}`} >Get Your Info</Link>
            </div>


            <button className={`nav-toggler ${isNavOpen ? 'toggler-open' : ''}`} onClick={togglerClick}>
              <span></span>
            </button>
          </nav>
        </div>
      </div>

    </header>
  )
}

export default Navbar;

