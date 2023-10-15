import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import blogs from "../data/blogs";
import SideBlogCard from "./SideBlogCard";
import HeaderBlog from './HeaderBlog';
import blogContext from "../context/blogs/blogContext"
import blogTitle from '../assets/blogging.png';

const BlogPage = () => {
  const { id } = useParams();
  const context_blogs = useContext(blogContext)
  const { blogs, getBlogById } = context_blogs;
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    getBlogById(id)
      .then((blog) => {
        setBlogPost(blog);
      })
      .catch((error) => {
        console.error('Error fetching blog post:', error);
      });
  }, [id, getBlogById]);

  const selectRandomBlogs = (blogs, currentBlogId, count) => {
    // Filter out the current blog from the available blogs
    const availableBlogs = blogs.filter((blog) => blog._id !== currentBlogId);

    // Shuffle the available blogs randomly
    const shuffledBlogs = availableBlogs.sort(() => 0.5 - Math.random());

    // Return the first 'count' blogs
    return shuffledBlogs.slice(0, count);
  };

  // const { blog,key } = props;
  // const blog = blogs.find((blog) => {
  //   console.log(blog._id);
  //   return blog._id === _id
  // });

  if (!blogPost) {
    return <div>Loading...</div>;
  }


  const randomBlogs = selectRandomBlogs(blogs, blogPost._id, 2);

  return (
    <>
      <HeaderBlog />
      <div className="blog-page">
      <img src={blogTitle} width={40} style={{position:"absolute"}} alt="" />
        <div className="blog-content">
          <div className="main-content">
            <h2>{blogPost.title}</h2>
            <p>{blogPost.content}.</p>
            <div className="conclusion">
              <p style={{textAlign:"start"}}><span style={{color:"#007BFF"}}>Conclusion</span>&nbsp;: {blogPost.inbrief}</p>
            </div>
            <div className="authorBlogpage">
            <h5>Contributed By: <span style={{color:"#007BFF",cursor:"pointer"}}>{blogPost.author}.</span> </h5>
          </div>
          </div>
          
        </div>
        <div className="related-blogs">
          <h2 style={{ textAlign: "center" }}>Related Blogs</h2>
          {randomBlogs.map((relatedBlog) => (
            <SideBlogCard key={relatedBlog.id} blog={relatedBlog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
