import React from 'react'
import "./WriteBlog.css"
const WriteBlog = () => {
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
                                            <input type="text" className="form-control" name="title" placeholder="Title" autoFocus autoCapitalize=''/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="author" placeholder="Author" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <textarea name="content" className="form-control" cols="30" rows="10" placeholder="Content"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <textarea name="content" className="form-control" cols="30" rows="3" placeholder="InBrief Description" ></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="tag" placeholder="Tag" />
                                        </div>
                                    </div>
                                    <form action="upload.php" method="post" className="d-none"enctype="multipart/form-data">
                                        <label for="image">Select an image to upload:</label>
                                        <input type="file" name="image" id="image" />
                                        <input type="submit" value="Upload Image" />
                                    </form>
                                    <button type="submit" className="button-sp btn-primary ">
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
