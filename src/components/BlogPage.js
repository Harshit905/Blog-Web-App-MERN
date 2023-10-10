// components/BlogPage.js
import React from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blogs";

const BlogPage = () => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === Number(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="blog-page">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogPage;
