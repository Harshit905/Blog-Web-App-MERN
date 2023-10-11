import React from 'react'
import { Link } from "react-router-dom";
import "./HeaderBlog.css"
const SideBlogCard = ({ blog }) => {
  return (
    
    <div className="side-blog-card">
      <div class="side-card">
        <div class="side-img-container"></div>
        <div class="side-card-content">
          <h1>{blog.title}</h1>
          <p class="side-excerpt">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia odio dolorem amet, sunt magnam asperiores exercitationem {blog.content.slice(0, 100)}...</p>
          <Link className="side-readmoreblogbtn" to={`/blog/${blog.id}`}>Read More</Link>
          <p class="side-author">By Jrom </p>       
        </div>
      </div>
    </div>
  )
}

export default SideBlogCard
