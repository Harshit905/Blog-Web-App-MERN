import React from 'react'
import './Contact.css'; 

const Contact = () => {
  return (
    <>
         <section className="contact-container">
      <div className="contact-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 8.467 8.467"
          height="32"
          width="32"
        >
          {/* SVG path here */}
        </svg>
      </div>
      <form className="contact-form">
        <div className="heading">
          <h2>CONTACT US</h2>
          <p>feel free to reach out to us, we'd love to hear from you!</p>
        </div>
        <div className="input">
          <i className="fa-regular fa-user"></i>
          <input name="username" type="text" placeholder="Username" />
        </div>
        <div className="input">
          <i className="fa-regular fa-envelope"></i>
          <input name="email" type="email" placeholder="Email" />
        </div>
        <div className="input">
          <i className="fa-regular fa-message"></i>
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Message"
            style={{ resize: 'none' }}
          ></textarea>
        </div>
        <input className="button ghost" type="button" value="Submit" />
      </form>
      <div className="contact-info">
        <h3 className="heading">OUR INFORMATIONS</h3>
        <ul className="contacts">
          <li>
            <i className="fa-solid fa-location-dot"></i>
            JE-31, Jhelum Ext, NIT Srinagar, Srinagar(190006)
          </li>
          <li>
            <i className="fa-solid fa-envelope"></i>
            harshit.2020bite048@nitsri.ac.in
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>
            9462331968
          </li>
          <li>
          <i className="fa fa-whatsapp" aria-hidden="true"></i>
            7275171968
          </li>
        </ul>
        <div className="social-links"></div>
      </div>
    </section>

    </>
  )
}

export default Contact
