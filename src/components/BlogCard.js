// components/BlogCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./SideBlogCard.css"
const BlogCard = ({ blog }) => {
  return (

    <div className="blog-card">
      <div class="card">
        <div class="img-container"></div>
        <div class="card-content">
          <h1>{blog.title}</h1>
          <p class="excerpt">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia odio dolorem amet, sunt magnam asperiores exercitationem consequuntur? Molestias asperiores rerum doloremque reiciendis.{blog.content.slice(0, 100)}...</p>
          <Link className="readmoreblogbtn" to={`/blog/${blog.id}`}>Read More</Link>
          <div className="author_date">
          <p class="author">By Jrom <br /> <a href="mailto:example@email.com">ayush@gmail.com</a>  </p>
          </div>
          <p class="blog_date">written on : Date</p>
        
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
