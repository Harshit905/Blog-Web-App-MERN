import React, { useState } from "react";
import BlogContext from "./blogContext";

const BlogState = (props) => { 
    const blogsInitial = []
    const host = "http://localhost:5000"
    //get all blogs
    
    const getAllBlogs = async () => {
        // API Call to fetch all blogs
        const response = await fetch(`${host}/api/blogs/fetchallblogs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        // console.log(json);
        setBlogs(json.reverse());
    }

    // G,l̥et user all Blogs
    const getUserBlogs = async () => {
        // API Call 
        const response = await fetch(`${host}/api/blogs/fetchuserblogs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
            }
        });
        const json = await response.json()
        // console.log(json)
        setuserBlogs(json.reverse())
    }

     //get blog by id
     const getBlogById = async (id) => {
        // API Call 
        const response = await fetch(`${host}/api/blogs/readblog/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        // console.log(json)
        return json;
    }
 
    const [blogs, setBlogs] = useState(blogsInitial);
    const [userblogs, setuserBlogs] = useState(blogsInitial);

    const addBlog = async (title, content, tag, inbrief, author) => {
        try {
            const response = await fetch(`${host}/api/blogs/addblog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, content, tag, inbrief, author })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData);
            } else {
                const blog = await response.json();
                console.log("Blog added:", blog);
                setBlogs(blogs => [blog, ...blogs]);
            }
        } catch (error) {
            console.error("API call failed:", error);
        }
    };
  
    const deleteBlog = async (id) => {
        try {
            const response = await fetch(`${host}/api/blogs/deleteblog/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token'),
                }
            });
    
            if (response.ok) {
                // Remove the deleted blog from the state
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
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

    const editBlog = async (id, title, content, tag, author, inbrief, date) => {
        try {
            const response = await fetch(`${host}/api/blogs/updateblog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, content, tag, author, inbrief, date })
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
        <BlogContext.Provider value={{ userblogs,blogs, addBlog, deleteBlog, editBlog, getAllBlogs,getUserBlogs,getBlogById }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState;
