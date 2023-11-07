import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import HeaderBlog from "./HeaderBlog";
import blogContext from "../context/blogs/blogContext";
import noNotesImage from "../assets/no-notes-image.png";
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
        <div className="bookmarks-nav d-flex justify-content-center align-items-center">
          <div>
            <div
              style={{
                textAlign: "center",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              <i class="fa-solid fa-bookmark"></i>
              <Link className="bookmarklink" to="/bookmarked-blogs">
                {" "}
                BOOKMARKS
              </Link>
            </div>
            <div
              className="categories d-flex flex-wrap justify-content-center mt-4"
              style={{ border: "1px solid red" }}
            >
              <div
                className="mt-2"
                style={{
                  width: "40%",
                  textAlign: "center ",
                  border: "1px solid red",
                }}
              >
                Bookmark
              </div>
              <div
                className="mt-2"
                style={{
                  width: "40%",
                  textAlign: "center ",
                  border: "1px solid red",
                }}
              >
                Bookmark
              </div>
              <div
                className="mt-2"
                style={{
                  width: "40%",
                  textAlign: "center ",
                  border: "1px solid red",
                }}
              >
                Bookmark
              </div>
              <div
                className="mt-2"
                style={{
                  width: "40%",
                  textAlign: "center ",
                  border: "1px solid red",
                }}
              >
                Bookmark
              </div>
            </div>
          </div>
        </div>
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
