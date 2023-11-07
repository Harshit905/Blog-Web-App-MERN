import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import blogContext from "../context/blogs/blogContext"
import "./WriteBlog.css"

const WriteBlog = (props) => {
    const context_user_blogs = useContext(blogContext)
    const { addBlog } = context_user_blogs;
    const [desc, setDesc] = useState({content:""});
    const [blog, setBlog] = useState({ title: "", tag: "", author: "", inbrief: "" , category:""})

   
    const onChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }
    const editorChange = (e) => {
        setDesc(e)
      }
      const handleClick = async (e) => {
        e.preventDefault();
        console.log(desc)
        const { title, tag, inbrief, author,category } = blog;
        console.log(title)
       const p= await addBlog(title, desc, tag, inbrief, author,category);
       console.log(p)
        setBlog({ title: "", tag: "", author: "", inbrief: "" ,category:""});
        setDesc({content:""});
        props.showAlert("Blog Collected", "success")
    }
    return (
        <div>
            <div className="container" >
                <div className="row " style={{ display: "flex", justifyContent: "center" }}>
                    <div className="col-md-7 col-md-offset-1" style={{ padding: "20px" }}>
                        <div className="panel panel-default">
                            <div className="panel-heading"><h4>Add Blog</h4></div>

                            <div className="panel-body">
                                <form className="form-horizontal" role="form" method="POST">
                                    <div className="form-group">
                                        <div className="col-md-12">
                                             <input type="text" className="form-control" name="title" placeholder="Title of the Blog(min: 10 characters)" value={blog.title} onChange={onChange} minLength={10} required autoFocus />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="author" placeholder="Name of Author (min: 2 characters)" value={blog.author} onChange={onChange} required minLength={2} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="category" placeholder="Category (min: 5 characters)" value={blog.category} onChange={onChange} minLength={5} required />
                                        </div>
                                    </div>

                                    
                                    <div className="form-group">
                                        <div className="col-md-12">
                                        <ReactQuill theme="snow" name="content" modules={WriteBlog.modules} className="form-control" cols="30" rows="10" placeholder="Content of Blog (min: 150 characters)" value={desc} onChange={editorChange} required />
                                            {/* <textarea name="content" className="form-control" cols="30" rows="10" placeholder="Content of Blog (min: 100 characters)" value={blog.content} onChange={onChange} minLength={100} required></textarea> */}
                                        </div>
                                    </div>




                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <textarea name="inbrief" className="form-control" cols="30" rows="3" placeholder="InBrief Description of Blog (min: 100 characters)" value={blog.inbrief} onChange={onChange} minLength={20} required ></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="tag" placeholder="Tags (min: 5 characters)" value={blog.tag} onChange={onChange} minLength={5} required />
                                        </div>
                                    </div>
                                    {/* <div action="upload.php" method="post" className="d-none"enctype="multipart/form-data">
                                        <label for="image">Select an image to upload:</label>
                                        <input type="file" name="image" id="image" />
                                        <input type="submit" value="Upload Image" />
                                    </div> */}
                                    <button disabled={blog.title.length < 10  || blog.inbrief.length < 20 || blog.author.length < 2 || blog.tag.length < 5} onClick={handleClick} type="submit" className="button-sp btn-primary ">
                                        <i className="fa fa-btn fa-user"></i> Publish
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Link to="/blogs-dashboard" className="create-blog-button btn btn-primary button-sp mb-3">
                Go to Your Blogs
            </Link>
        </div>
    )
}
WriteBlog.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  }
export default WriteBlog
