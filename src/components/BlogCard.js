// components/BlogCard.js
import React, { useContext, useState } from "react";
import { Link,useHistory, useLocation } from "react-router-dom";
import blogContext from "../context/blogs/blogContext";
import userContext from "../context/users/userContext";
import "./SideBlogCard.css";

//icons
import { BsBookmarks, BsLink45Deg, BsFillBookmarksFill } from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiOutlineShareAlt,
  AiOutlineHeart,
  AiOutlineLike,
  AiFillLike,
} from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { VscComment } from "react-icons/vsc";
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
const BlogCard = (props) => {
  let location = useLocation();
  const [bookmarkSet, setBookmark] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const { blog, showAlert } = props;
  const context_blogs = useContext(blogContext);
  const { blogs, getAllBlogs, bookmark, unbookmark } = context_blogs;
  const context_users = useContext(userContext);
  const { users } = context_users;

  // console.log(Bookmarkedblogs)
  const HandleAlert = (msg) => {
    props.showAlert(msg, "success");
  };
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const calculateTimeToRead=(content, wordsPerMinute) =>{
    const wordCount = content.split(/\s+/).length;
    const minutesToRead = Math.ceil(wordCount / wordsPerMinute);
    return minutesToRead;
  }

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
            <div className="blog-metadata d-flex justify-content-start align-items-center">
                <div className="readtime"><p>Read</p></div>
                <div style={{textTransform:"uppercase"}} className="categoryOfBlog"></div>
            </div>
            <div>
            {
              location.pathname === "/bookmarked-blogs" ?
              <MdOutlineBookmark
                onClick={() => 
                {unbookmark(blog._id)
                HandleAlert("Unbookmarked")
                }}
                className="bookmark-icon"
              />:
               <MdOutlineBookmarkAdd
                onClick={() => {
                bookmark(blog._id);
                HandleAlert("Bookmarked")
                }
                }
                className="bookmark-icon"
              />
            }
             
              
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
          <div
            className="author_date"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "0",
            }}
          >
            <p className="author">
              <span style={{ color: "#007BFF" }}>Author</span> :{" "}
              <span style={{ cursor: "pointer", color: "#b9b9d6" }}>
                {blog.author}
              </span>
            </p>
            {/* <a style={{ marginLeft: "10px", textDecoration: "none", fontFamily: "-moz-initial", padding: "0", fontSize: "0.8rem", color: "#007BFF" }} href="mailto:example@email.com">{users.email}</a> */}
          </div>
          <p className="blog_date">written on : {formatDate(blog.date)}</p>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
