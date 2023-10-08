import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Signup.css';
import './Contact.css';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ 
    name: "",
    email: "", 
    password: "", 
    about_yourself: "",
    university:"",
    degree:"",
    major:"",
    registration:"",
    github:"",
    skills:""
  })
  let history = useHistory();
  const handleSubmit = async (e) => {
    const { name, email, password,university,degree,major,registration,skills,github,about_yourself } = credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password,university,degree,major,registration,github,skills,about_yourself })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      history.push("/");
      props.showAlert("Account Created Successfully", "success")
    }
    else {
      props.showAlert("Email/Registration Already Exists", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <form onSubmit={handleSubmit}>
      <p className='headinglogsignpage'>Please Signup/Login to continue to NoteCanvas</p>
      <div className="signup1">
        <div>
          <img id="avatar_signin" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMr_Ky37u_30imoav7-kzi01LCBOh88WP6hu2r3IkXUJaQsWexdA" alt="avatar" />
          <p className='p_login'><b>Member Signup</b></p>
        </div>
        <div className="input_div_signup" >
          <input type="name" value={credentials.name} onChange={onChange} placeholder="Enter your Name" className="login" name="name" id="name_signup" autoFocus required />
          <input type="email" value={credentials.email} onChange={onChange} placeholder="Enter your Email ID" className="login" name="email" id="email_signup" required />
          <input type="password" value={credentials.password} onChange={onChange} placeholder="Create Password For your Account" className="login" name="password" id="password_signup" minLength={5} required />
        </div>
        <hr />
        <p className='p_login'><b>Education Details</b></p>
        <div className='edu_div_signup'>
          {/* <input type="name" value={credentials.name} onChange={onChange} placeholder="Enter your Name" className="login" name="name" id="name_signup" autoFocus required />
          <input type="email" value={credentials.email} onChange={onChange} placeholder="Enter your Email ID" className="login" name="email" id="email_signup" required /> */}
          {/* <label htmlFor="university">University:</label> */}
          <input className='edu_details_input' value={credentials.university} type="text" id="university" onChange={onChange} name="university" placeholder='Enter University Name' required />

          {/* <label htmlFor="degree">Degree:</label> */}
          <input className='edu_details_input' value={credentials.degree} type="text" id="degree" onChange={onChange} name="degree" placeholder='Enter Degree Name' required />

          {/* <label htmlFor="major">Major:</label> */}
          <input className='edu_details_input' value={credentials.major} type="text" id="major" onChange={onChange} name="major" placeholder='Enter Major' required />

          {/* <label htmlFor="graduation-year">Graduation Year:</label> */}
          <input className='edu_details_input' value={credentials.registration} type="text" id="Registration_no" onChange={onChange} name="registration" placeholder='Enter Your Registration Number' required />
          
          <input className='edu_details_input' value={credentials.github} type="text" id="github" onChange={onChange} name="github" placeholder='Enter Your Github Profile Link' />
          
          <input className='edu_details_input' value={credentials.skills} type="text" id="skills" onChange={onChange} name="skills" placeholder='Enter Your Proficiency(Skills)' />
        </div>
        <hr />
        <p className='p_login' ><b>About Yourself</b></p>
        <div>
        <div className='signup-div-about'>
          <div className="input">
            <i className="fa-regular fa-message"></i>
            <textarea
            onChange={onChange}
            value={credentials.about_yourself}
              name="about_yourself"
              cols="30"
              rows="10"
              placeholder="About Yourself"
              style={{ resize: 'none' }}
           required ></textarea>
          </div>
          </div>
        </div>
        <br /> <br />
        <input type="submit" className="login" id="signin" name="signin" value="Sign Up" /><br />
        <p className='p_login'>Already Have Account?<Link to="/login"> Login</Link></p>
      </div>
    </form>
  )
}

export default Signup
