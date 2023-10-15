import React from 'react'
import { Link } from "react-router-dom";
import "./HeaderBlog.css"
const SideBlogCard = ({ blog }) => {
  return (
    
    <div className="side-blog-card">
      <div className="side-card">
        <div className="side-img-container"></div>
        <div className="side-card-content">
          <h1 style={{fontSize:"1.1rem",paddingBottom:"7px"}}>{blog.title.slice(0, 30)}</h1>
          <p className="side-excerpt">{blog.content.slice(0, 160)}...</p>
          <Link className="side-readmoreblogbtn" to={`/blog/${blog._id}`}>Read More</Link>
          <p className="side-author">By {blog.author} </p>       
        </div>
      </div>
    </div>
  )
}

export default SideBlogCard
