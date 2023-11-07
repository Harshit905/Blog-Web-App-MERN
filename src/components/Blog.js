import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import BlogCard from "./BlogCard";
import HeaderBlog from "./HeaderBlog";
import blogContext from "../context/blogs/blogContext";
import noNotesImage from "../assets/no-notes-image.png";

const Blog = (props) => {
  const { showAlert } = props;
  const context_blogs = useContext(blogContext);
  const { blogs, getAllBlogs} =
    context_blogs;
  const HandleAlert = () => {
    props.showAlert(
      "Please Login/Signup to continue to Create Your Blog ",
      "info"
    );
  };

 
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
      <HeaderBlog />
     
      <div
        className="blog-list d-flex justify-content-center"
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
        <h2>Blogs to Read</h2>
          <div className="container mx-2">
            {blogs.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {" "}
                <img width={200} src={noNotesImage} alt="No notes" />
                <h2>Sorry, there are no blogs available at the moment. </h2>
                <div>
                  <p>
                    You can be the first to share your thoughts and experiences
                    by&nbsp;
                    {!localStorage.getItem("token") ? (
                      <Link to="/login">writing a blog !</Link>
                    ) : (
                      <Link to="/create-blog">writing a blog !</Link>
                    )}
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
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              showAlert={showAlert}
              blog={blog} 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
