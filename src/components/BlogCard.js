// components/BlogCard.js
import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import blogContext from "../context/blogs/blogContext"
import "./SideBlogCard.css"
const BlogCard = ({ blog }) => {
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
        {/* <div className="img-container"></div> */}
        <div className="card-content">
          <h1 style={{ textTransform: "uppercase", fontSize: "1.2rem", color: "#555", fontWeight: "600" }}>
            {blog.title.length > 170 ? `${blog.title.slice(0, 170)}...` : blog.title.slice(0, 170)}
          </h1>
          <p className="excerpt">{blog.content.slice(0, 500)}...</p>
          <p><Link className="readmoreblogbtn" to={`/blog/${blog._id}`} key={blog._id} blog={blog}>Read More</Link></p>
          <div className="author_date" style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", gap: "0" }}>
            <p className="author"><span style={{ color: "#007BFF" }}>Author</span> : <span style={{ cursor: "pointer" }}>{blog.author}</span></p>
            <a style={{ marginLeft: "10px", textDecoration: "none", fontFamily: "-moz-initial", padding: "0", fontSize: "0.8rem", color: "#007BFF" }} href="mailto:example@email.com">ayush@gmail.com</a>
          </div>
          <p className="blog_date">written on : {formatDate(blog.date)}</p>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
