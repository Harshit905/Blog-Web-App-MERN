import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderBlog from "./HeaderBlog";
import blogContext from "../context/blogs/blogContext";




const LeftSideNav = (props) => {
  const context_blogs = useContext(blogContext);
  const { categories } = context_blogs;
  const HandleAlert = () => {
    props.showAlert(
      "Please Login/Signup to continue to Create Your Blog ",
      "info"
    );
  };
  return (
    <div className="bookmarks-nav d-flex justify-content-center align-items-center">
      <div>
        <div className="sidelinks">
          <div
            style={{
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            <i class="fa-solid fa-bookmark"></i>
            {!localStorage.getItem("token") ? (
              <Link
                to="/login"
                onClick={HandleAlert}
                className="bookmarklink"
              >
                &nbsp;&nbsp;BOOKMARKS
              </Link>
            ) : (
              <Link to="/bookmarked-blogs" className="bookmarklink">
                &nbsp;&nbsp;BOOKMARKS
              </Link>
            )}
          </div>
          <div
            style={{
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            <i class="fa-solid fa-pen"></i>
            {!localStorage.getItem("token") ? (
              <Link
                to="/login"
                onClick={HandleAlert}
                className="bookmarklink"
              >
                &nbsp;CREATE YOUR BLOGS
              </Link>
            ) : (
              <Link to="/create-blog" className="bookmarklink">
                &nbsp;CREATE YOUR BLOGS
              </Link>
            )}
          </div>
          <div
            style={{
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            <i class="fa-brands fa-blogger-b"></i>
            {!localStorage.getItem("token") ? (
              <Link
                to="/login"
                onClick={HandleAlert}
                className="bookmarklink"
              >
                &nbsp;&nbsp;BLOGS BY YOU
              </Link>
            ) : (
              <Link to="/blogs-dashboard" className="bookmarklink">
                &nbsp;&nbsp;BLOGS BY YOU
              </Link>
            )}
          </div>
          <div
            style={{
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            <i class="fa-regular fa-clipboard"></i>
            {!localStorage.getItem("token") ? (
              <Link
                to="/login"
                onClick={HandleAlert}
                className="bookmarklink"
              >
                &nbsp;&nbsp;NOTES BY YOU
              </Link>
            ) : (
              <Link to="/notes-dashboard" className="bookmarklink">
                &nbsp;&nbsp;NOTES BY YOU
              </Link>
            )}
          </div>
        </div>


        <div className="categories d-flex flex-wrap mt-5" style={{ border: "1px solid red" }} >
        <div className="headingPopularCategories">
            <h4><span id="span1">Popular</span><span id="span2">Categories</span></h4>
          </div>
        <div className="categories d-flex flex-wrap justify-content-center" style={{ border: "1px solid red" }} >
          
          {categories.map((category, index) => (
            <div key={index} className="mt-2" style={{ width: "40%", textAlign: "center ", border: "1px solid red",marginRight:"1rem" }}>
              {category}
            </div>
          ))}
        </div>
</div>
      </div>
    </div>
  )
}

export default LeftSideNav
