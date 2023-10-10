// components/BlogCard.js
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      <p>{blog.content.slice(0, 100)}...</p>
      <Link to={`/blog/${blog.id}`}>Read More</Link>
    </div>
  );
};

export default BlogCard;
