// components/BlogCard.js
import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
const BlogCard = (props) => {
  let location = useLocation();
  const { blog, showAlert } = props;
  const context_blogs = useContext(blogContext);
  const context_users = useContext(userContext);
  const { blogs, getAllBlogs, bookmark, unbookmark, fetchCategories, categories, likes, likeBlog, getBlogsByUserId } = context_blogs;
  const { users, getUserByUserId, userByUserId } = context_users;
  const [liked, setLiked] = useState(false);
  const [bookmarkSet, setBookmark] = useState(false);

  console.log(users.bookmarks.includes(blog._id))

  const HandleAlert = (msg) => {
    props.showAlert(msg, "success");
  };
  const handleLikeClick = async () => {
    // console.log(likes)
    likeBlog(blog._id);
    getBlogsByUserId(blog.user);
    setLiked(!liked);
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const calculateTimeToRead = (content, wordsPerMinute) => {
    const wordCount = content.split(/\s+/).length;
    const minutesToRead = Math.ceil(wordCount / wordsPerMinute);
    return minutesToRead;
  };
  useEffect(() => {
    if (blog.likes.includes(users._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    if (users.bookmarks.includes(blog._id)) {
      setBookmark(true);
    } else {
      setBookmark(false);
    }
    fetchCategories();
    getUserByUserId(blog.user)
  }, [blog.likes, users._id, users.bookmarks, blog._id]);


  return (
    <div className="blog-card">
      <div className="card">
        {/* <div className="img-container"></div> */}
        <div className="card-content">
          <div className="blog-edit-del-icons">
            <div>
              <h1>
                {blog.title.length > 170
                  ? `${blog.title.slice(0, 150)}...`
                  : blog.title.slice(0, 170)}
              </h1>
            </div>
            <div>
              {location.pathname === "/bookmarked-blogs" ? (
                <MdOutlineBookmark
                  onClick={() => {
                    unbookmark(blog._id);
                    HandleAlert("Unbookmarked");
                  }}
                  className="bookmark-icon"
                />
              ) : (
                <MdOutlineBookmarkAdd
                  onClick={() => {
                    bookmark(blog._id);
                    HandleAlert("Bookmarked");
                  }}
                  className="bookmark-icon"
                />
              )}
            </div>
          </div>
          <div className="blog-metadata d-flex justify-content-start align-items-center">
            <div className="readtime">
              <p>
                <span><svg style={{ width: "13px" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> {calculateTimeToRead(blog.content, 200)}</span> min Read
              </p>
            </div>
            <div style={{ textTransform: "uppercase" }} className="categoryOfBlog">
              {blog.category}
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
              <span >
                <Link className="LinktoUser" to={`/aboutuser/${blog.user}`} >{blog.author}</Link>
              </span>
            </p>

            <p>{users ? (
              <div style={{ display: "inline-block" }} onClick={handleLikeClick}>
                {!liked ? <i class="fa-solid heart fa-heart" style={{ color: "#5078be" }}></i> : <i class="fa-solid heart fa-heart" style={{ color: "red" }}></i>}
              </div>
            ) : (
              <p>Log in to like this blog</p>
            )} : {blog.likes.length}</p> {/* Display the number of likes */} {/* <a style={{ marginLeft: "10px", textDecoration: "none", fontFamily: "-moz-initial", padding: "0", fontSize: "0.8rem", color: "#007BFF" }} href="mailto:example@email.com">{users.email}</a> */}
          </div>
          <p className="blog_date"><svg style={{
            width
              : "15px"
          }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg> : {formatDate(blog.date)}</p>

        </div>
      </div>
    </div>
  );
};
export default BlogCard;
