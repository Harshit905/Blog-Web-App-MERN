import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import HeaderBlog from './HeaderBlog';
import blogContext from "../context/blogs/blogContext"
import noNotesImage from '../assets/no-notes-image.png';
import "./YourBlogs.css"
import YourBlogItem from './YourBlogItem';
function YourBlogs(props) {
    const { showAlert } = props;

    const ref = useRef(null)
    const refClose = useRef(null)

    const context_user_blogs = useContext(blogContext)
    const { userblogs, getUserBlogs,editBlog,deleteBlog } = context_user_blogs;

    const [blog, setBlog] = useState({ id: "", etitle: "", econtent: "", etag: "",eauthor:"",einbrief:"" })
    useEffect(() => {
        getUserBlogs()
    }, [])

    const updateBlog = (currentBlog) => {
        ref.current.click()
        setBlog({ id: currentBlog._id, etitle: currentBlog.title, econtent: currentBlog.content, etag: currentBlog.tag, eauthor: currentBlog.author, einbrief: currentBlog.inbrief })
    }
    const handleClick = (e) => {
        editBlog(blog.id, blog.etitle, blog.econtent, blog.etag, blog.eauthor, blog.einbrief)
        refClose.current.click();
        props.showAlert("Blog Updated", "success")
    }

    const onChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }
    
    return (
        <>
            <div className="blog-list">
                <HeaderBlog />
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className=" modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content modal-design">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Blog</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={blog.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Content</label>
                                        <textarea type="text" className="form-control" id="edescription" name="edescription" value={blog.econtent} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={blog.etag} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="author" className="form-label">Author</label>
                                        <input type="text" className="form-control" id="eauthor" name="eauthor" value={blog.eauthor} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inbrief" className="form-label">InBrief</label>
                                        <input type="text" className="form-control" id="inbrief" name="inbrief" value={blog.einbrief} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="button-sp btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={blog.etitle.length < 5 || blog.econtent.length < 5} onClick={handleClick} type="button" className="button-sp btn btn-primary">Update Blog</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='blogs-box'>
                <h2>Your Blogs</h2>
                    <div className="">
                        {userblogs.length === 0 && <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} > <img width={200} src={noNotesImage} alt="No notes" />
                            <h2>Sorry, there are no blogs written by you available. </h2>
                            <div>
                                <p>You can share your thoughts and experiences by &nbsp;

                                    <Link to="/create-blog">writing a blog !</Link>

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
                            <YourBlogItem key={blog.id} updateBlog={updateBlog} showAlert={props.showAlert} blog={blog} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default YourBlogs;
