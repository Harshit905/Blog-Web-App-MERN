import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import HeaderBlog from "./HeaderBlog";
import blogContext from "../context/blogs/blogContext";
import noNotesImage from "../assets/no-notes-image.png";
import LeftSideNav from "./LeftSideNav";
const BookmarkedBlogs = (props) => {
  const { showAlert } = props;
  const context_blogs = useContext(blogContext);
  const { Bookmarkedblogs, fetchBookmarkedBlogs } = context_blogs;

  const HandleAlert = () => {
    props.showAlert(
      "Please Login/Signup to continue to Create Your Blog ",
      "info"
    );
  };
  
  console.log(BookmarkedBlogs)
  useEffect(() => {
    fetchBookmarkedBlogs();
  }, []);
  return (
    <>
      <HeaderBlog />
      
      <div
        className="blog-list d-flex "
        style={{ border: "1px solid red" }}
      >
        <LeftSideNav/>
        <div className="blogs-box">
        <h2 >Your Bookmarks</h2>
          <div className="container mx-2">
            {Bookmarkedblogs.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {" "}
                <img width={200} src={noNotesImage} alt="No notes" />
                <h2 style={{textAlign:"center"}}>
                  Sorry, there are no Bookmarked blogs available at the moment.{" "}
                </h2>
                <div>
                  <p style={{color:"white"}}>
                    You can bookmark the blogs by clicking on bookmark icon on
                    upper right corner of &nbsp;
                    <Link to="/blogs"> Blog Card</Link>
                  </p>
                </div>
              </div>
            )}
          </div>
          {!localStorage.getItem("token") ? (
            <Link
              to="/login"
              onClick={HandleAlert}
              className="create-blog-button btn btn-primary button-sp mb-3"
            >
              Create Your Blog
            </Link>
          ) : (
            <Link
              to="/create-blog"
              className="create-blog-button btn btn-primary button-sp mb-3"
            >
              Create Your Blog
            </Link>
          )}
          {Bookmarkedblogs.map((blog) =>
              <BlogCard key={blog._id} showAlert={showAlert} blog={blog} />
          )}
        </div>
      </div>
    </>
  );
};

export default BookmarkedBlogs;
