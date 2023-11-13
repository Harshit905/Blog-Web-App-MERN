import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import blogContext from "../context/blogs/blogContext";
import userContext from "../context/users/userContext";

import './Login.css';
const Login = (props) => {
  const context_blogs = useContext(blogContext);
  const context_users = useContext(userContext);
  const { blogs, getAllBlogs, fetchCategories, categories } = context_blogs;
  const { getUsers,users } = context_users;
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let history = useHistory();
  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      getAllBlogs();
      getUsers();
      history.push("/");
      props.showAlert("Logged in Successfully", "success")
    }
    else {

      props.showAlert("Invalid Credentials", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (

    <form onSubmit={handleSubmit}>
      <p className='headinglogsignpage'>Please Signup/Login to continue...</p>
      <div className="login1">
        <img id="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMr_Ky37u_30imoav7-kzi01LCBOh88WP6hu2r3IkXUJaQsWexdA" alt="avatar" />
        <p className='p_login'><b>Member Login</b></p>
        <input type="email" value={credentials.email} onChange={onChange} placeholder="Enter your Email ID" className="login" name="email" id="email_login" autoFocus required /><br /><br />
        <input type="password" value={credentials.password} onChange={onChange} placeholder="Enter Password" className="login" name="password" id="password_login" required /><br /> <br />
        {/* <input type="checkbox" className="login" id="remem" /> <label id="login1">Remember me!</label><br /><br /> */}
        <input type="submit" className="login" id="signin" name="signin" value="Log In" /><br />
        <p className='p_login'>New Here? <Link to="/signup">Sign Up</Link></p>
      </div>
    </form>
  )
}

export default Login
