import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import BlogItem from './BlogItem';
import HeaderBlog from './HeaderBlog';
import blogContext from "../context/blogs/blogContext"
import noNotesImage from '../assets/no-notes-image.png';
import "./YourBlogs.css"
function YourBlogs(props) {
    const { showAlert } = props;
    const context_user_blogs = useContext(blogContext)
    const { userblogs, getUserBlogs } = context_user_blogs;
    useEffect(() => {
        getUserBlogs()
    }, [])
    return (
        <>
            <div className="blog-list">
                <HeaderBlog />
                <div className='blogs-box'>
                <h2>Your Blogs</h2>
                    <div className="">
                        {userblogs.length === 0 && <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} > <img width={200} src={noNotesImage} alt="No notes" />
                            <h2>Sorry, there are no blogs written by you available. </h2>
                            <div>
                                <p>You can share your thoughts and experiences by &nbsp;

                                    <Link to="/write-blog">writing a blog !</Link>

                                </p>
                            </div>
                        </div>
                        }
                    </div>

                    

                <Link to="/create-blog" className="create-blog-button btn button-sp mb-3">
                    Create A Blog
                </Link>

                    {
                        userblogs.map((blog) => (
                            <BlogItem key={blog.id} blog={blog} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default YourBlogs;
