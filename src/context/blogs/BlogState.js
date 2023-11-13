import React, { useState } from "react";
import BlogContext from "./blogContext";

const BlogState = (props) => {
  const blogsInitial = [];
  const [bookmarkSet, setBookmark] = useState(false);
  const [blogs, setBlogs] = useState(blogsInitial);
  const [Bookmarkedblogs, setBookmarkedblogs] = useState(blogsInitial);
  const [userblogs, setuserBlogs] = useState(blogsInitial);
  const [userblogsById, setuserBlogsById] = useState(blogsInitial);
  const [categories, setCategories] = useState([]);
  const [likes, setLiked] = useState(false);
  const host = "http://localhost:5000";
  //get all blogs

  const getAllBlogs = async () => {
    // API Call to fetch all blogs
    const response = await fetch(`${host}/api/blogs/fetchallblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json);
    setBlogs(json.reverse());
  };

  // Get user all Blogs
  const getUserBlogs = async () => {
    // API Call
    const response = await fetch(`${host}/api/blogs/fetchuserblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json)
    setuserBlogs(json.reverse());
  };
  const getBlogsByUserId = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/blogs/blogs-by-user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const json = await response.json();
    // console.log(json)
    setuserBlogsById(json.reverse());
  };

  //get blog by id
  const getBlogById = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/blogs/readblog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json)
    return json;
  };

  const fetchBookmarkedBlogs = async () => {
    // API Call
    const response = await fetch(`${host}/api/blogs/bookmarked-blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    // console.log(json)
    setBookmarkedblogs(json);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${host}/api/blogs/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },

      })
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const bookmark = async (id) => {
    try {
      const response = await fetch(`${host}/api/blogs/bookmark/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        // Handle success as needed
        console.log("Blog bookmarked successfully.");
        setBookmark(true);
        // You can also update the state or perform other actions here.
      } else {
        const errorData = await response.json();
        console.error("Error bookmarking the blog:", errorData);
        // Handle the error as needed, such as displaying an error message.
      }
    } catch (error) {
      console.error("API call failed:", error);
      // Handle the error as needed, such as displaying an error message.
    }
  };

  const unbookmark = async (id) => {
    try {
      const response = await fetch(`${host}/api/blogs/unbookmark/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        // Handle success as needed
        console.log("Blog unbookmarked successfully.");
        const updatedBookmarkedBlogs = Bookmarkedblogs.filter((blog) => blog._id !== id);
        setBookmarkedblogs(updatedBookmarkedBlogs)
        // You can also update the state or perform other actions here.
      } else {
        const errorData = await response.json();
        console.error("Error unbookmarking the blog:", errorData);
        // Handle the error as needed, such as displaying an error message.
      }
    } catch (error) {
      console.error("API call failed:", error);
      // Handle the error as needed, such as displaying an error message.
    }
  };
  const likeBlog = async (blogId) => {
    try {
      const response = await fetch(`${host}/api/blogs/${blogId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token"),
        },
        // body: JSON.stringify({}),
      });

      if (response.status === 200) {
        setLiked(!likes);
        getAllBlogs();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addBlog = async (title, content, tag, inbrief, author, category) => {
    try {
      const response = await fetch(`${host}/api/blogs/addblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          content,
          tag,
          inbrief,
          author,
          category,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
      } else {
        const blog = await response.json();
        console.log("Blog added:", blog);
        setBlogs((blogs) => [blog, ...blogs]);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`${host}/api/blogs/deleteblog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        // Remove the deleted blog from the state
        const json = await response.json();
        const newBlogs = userblogs.filter((blog) => {
          return blog._id !== id;
        });
        setuserBlogs(newBlogs);
        console.log("Blog deleted successfully.");

        // Display a success message to the user
        // props.showAlert("Blog deleted successfully", "success");
      } else {
        const errorData = await response.json();
        console.error("Error deleting the blog:", errorData);

        // Display an error message to the user
        // props.showAlert("Error deleting the blog", "error");
      }
    } catch (error) {
      console.error("API call failed:", error);

      // Display an error message to the user
      // props.showAlert("API call failed", "error");
    }
  };

  const editBlog = async (id, title, content, tag, author, inbrief, category, date) => {
    try {
      const response = await fetch(`${host}/api/blogs/updateblog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, content, tag, author, inbrief, category, date }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();

        // Assuming 'success' is a property of the response JSON
        return { success: true, data: updatedBlog };
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return { success: false, error: errorData };
      }
    } catch (error) {
      console.error("API call failed:", error);
      return { success: false, error };
    }
  };

  return (
    <BlogContext.Provider
      value={{
        userblogs,
        blogs,
        Bookmarkedblogs,
        categories,
        likes,
        userblogsById,
        addBlog,
        deleteBlog,
        editBlog,
        getAllBlogs,
        getUserBlogs,
        getBlogById,
        fetchBookmarkedBlogs,
        bookmark,
        unbookmark,
        fetchCategories,
        likeBlog,
        getBlogsByUserId
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
