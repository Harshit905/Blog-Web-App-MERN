// components/BlogCard.js
import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import blogContext from "../context/blogs/blogContext"
import "./SideBlogCard.css"
const BlogItem = ({ blog }) => {
  const context_blogs = useContext(blogContext)
  const { blogs, getAllBlogs } = context_blogs;

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-card">
      <div className="card">
        <div className="img-container"></div>
        <div className="card-content">
          <h1 style={{ textTransform: "uppercase", fontSize: "1.3rem", color: "#555" }}>{blog.title}</h1>
          <p className="excerpt">{blog.content.slice(0, 200)}...</p>
          <p><Link className="readmoreblogbtn" to={`/blog/${blog._id}`} key={blog._id} blog={blog}>Read More</Link></p>
          <div className="author_date">
            <p className="author"><span style={{color:"#007BFF"}}>Author</span> : <span style={{cursor:"pointer"}}>{blog.author}</span><br /> <a href="mailto:example@email.com">ayush@gmail.com</a>  </p>
          </div>
          <p className="blog_date">written on : {formatDate(blog.date)}</p>
        </div>
      </div>
    </div>
  );
};
export default BlogItem;