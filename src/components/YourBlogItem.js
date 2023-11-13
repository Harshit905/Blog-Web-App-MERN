import React, { useContext } from "react";
import { Link } from "react-router-dom";
import blogContext from "../context/blogs/blogContext";
import userContext from "../context/users/userContext";
import "./SideBlogCard.css";
const YourBlogItem = (props) => {
  const context_blogs = useContext(blogContext);
  const { editBlog, deleteBlog } = context_blogs;
  const { blog, updateBlog } = props;
  const context_users = useContext(userContext);
  const { users } = context_users;
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-card">
      <div className="card">
        {/* <div className="img-container"></div> */}
        <div className="card-content">
          <div className="blog-edit-del-icons">
            <h1>
              {blog.title.length > 170
                ? `${blog.title.slice(0, 150)}...`
                : blog.title.slice(0, 170)}
            </h1>
            <div className="icons-blogs">
              <i
                className="fas fa-edit"
                onClick={() => {
                  updateBlog(blog);
                }}
              ></i>
              <i
                className="fas fa-trash-alt"
                onClick={() => {
                  deleteBlog(blog._id);
                  props.showAlert("Blog Deleted", "success");
                }}
              ></i>
            </div>
          </div>
          <p className="excerpt">{blog.inbrief.slice(0, 500)}...</p>
          <p>
            <Link
              className="readmoreblogbtn"
              to={`/blog/${blog._id}`}
              key={blog._id}
              blog={blog}
            >
              Read More
            </Link>
          </p>
          <div className="author_date">
            <p className="author">
              <span style={{ color: "#007BFF" }}>Author</span> :{" "}
              <span style={{ cursor: "pointer" ,color:" #b9b9d6"}}>{blog.author}</span>
            </p>
          </div>
          <p className="blog_date">written on : {formatDate(blog.date)}</p>
        </div>
      </div>
    </div>
  );
};

export default YourBlogItem;
