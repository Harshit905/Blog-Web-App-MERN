import React,{ useState,useContext } from 'react'
import blogContext from "../context/blogs/blogContext"
import "./WriteBlog.css"

const WriteBlog = (props) => { 
    const context_user_blogs = useContext(blogContext)
    const { addBlog } = context_user_blogs;
    const [blog, setBlog] = useState({ title: "", content: "", tag: "",author:"",inbrief:"" })
    
    const handleClick = (e)=>{
        e.preventDefault();
        addBlog(blog.title, blog.content, blog.tag, blog.author, blog.inbrief);
        setBlog({ title: "", content: "", tag: "", author:"", inbrief:"" });
        props.showAlert("Blog Collected","success")
    }
    const onChange = (e)=>{
        setBlog({...blog, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <div className="container" >
                <div className="row " style={{  display: "flex", justifyContent: "center" }}>
                    <div className="col-md-7 col-md-offset-1" style={{ padding: "20px" }}>
                        <div className="panel panel-default">
                            <div className="panel-heading"><h4>Add Post</h4></div>

                            <div className="panel-body">
                                <form className="form-horizontal" role="form" method="POST">
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="title" placeholder="Title of the Blog" value={blog.title} onChange={onChange} minLength={10} required autoFocus />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="author" placeholder="Name of Author" value={blog.author} onChange={onChange} required minLength={2}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <textarea name="content" className="form-control" cols="30" rows="10" placeholder="Content of Blog" value={blog.content} onChange={onChange} minLength={80} required></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <textarea name="inbrief" className="form-control" cols="30" rows="3" placeholder="InBrief Description of Blog" value={blog.inbrief} onChange={onChange} minLength={20} required ></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="tag" placeholder="Tag" value={blog.tag} onChange={onChange} minLength={5} required />
                                        </div>
                                    </div>
                                    {/* <div action="upload.php" method="post" className="d-none"enctype="multipart/form-data">
                                        <label for="image">Select an image to upload:</label>
                                        <input type="file" name="image" id="image" />
                                        <input type="submit" value="Upload Image" />
                                    </div> */}
                                    <button disabled={blog.title.length<10 || blog.content.length<80|| blog.inbrief.length<20|| blog.author.length<2|| blog.tag.length<5} onClick={handleClick} type="submit" className="button-sp btn-primary ">
                                        <i className="fa fa-btn fa-user"></i> Publish
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WriteBlog
