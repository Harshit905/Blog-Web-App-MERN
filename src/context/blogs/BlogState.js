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

    // Get user all Blogs
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
        setBlogs(json.reverse())
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
    // Add a Blog
    const addBlog = async (title, content, tag, date, inbrief, author) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/blogs/addblog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, content, tag, date, inbrief, author })
        });

        const blog = await response.json();
        console.log(blog)

        setBlogs(blogs => [blog, ...blogs]);
    }
   


    // Delete a Blog
    const deleteBlog = async (id) => {
        // console.log("delete "+id)
        const response = await fetch(`${host}/api/blogs/deleteblog/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
            }
        });
        const json = await response.json();
        const newBlogs = blogs.filter((blog) => { return blog._id !== id });
        setBlogs(newBlogs);
    }

    const editBlog = async (id, title, content, tag, date, author, inbrief) => {
        const response = await fetch(`${host}/api/blogs/updateblog/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, content, tag, date, author, inbrief })
        });
        const json = await response.json();

        setBlogs((prevBlogs) => {
            return prevBlogs.map((blog) => {
                if (blog._id === id) {
                    return {
                        ...blog,
                        title, content, tag, date, author, inbrief
                    };
                } else {
                    return blog;
                }
            });
        });
    };


    return (
        <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, editBlog, getAllBlogs,getUserBlogs,getBlogById }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState;
