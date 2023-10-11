import React from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blogs";
import SideBlogCard from "./SideBlogCard";
import HeaderBlog from './HeaderBlog';

const selectRandomBlogs = (blogs, currentBlogId, count) => {
  // Filter out the current blog from the available blogs
  const availableBlogs = blogs.filter((blog) => blog.id !== currentBlogId);

  // Shuffle the available blogs randomly
  const shuffledBlogs = availableBlogs.sort(() => 0.5 - Math.random());

  // Return the first 'count' blogs
  return shuffledBlogs.slice(0, count);
};

const BlogPage = () => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === Number(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const randomBlogs = selectRandomBlogs(blogs, blog.id, 3);

  return (
    <>
    <HeaderBlog/>
    <div className="blog-page">
      <div className="blog-content">
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
      </div>
      <div className="related-blogs">
        <h3>Related Blogs</h3>
        {randomBlogs.map((relatedBlog) => (
          <SideBlogCard key={relatedBlog.id} blog={relatedBlog} />
        ))}
      </div>
    </div>
    </>
  );
};

export default BlogPage;
