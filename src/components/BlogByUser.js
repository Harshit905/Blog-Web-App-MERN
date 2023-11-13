import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderBlog from './HeaderBlog';
import blogContext from '../context/blogs/blogContext';
import userContext from '../context/users/userContext';
import noNotesImage from '../assets/no-notes-image.png';
import './YourBlogs.css';
import LeftSideNav from './LeftSideNav';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import BlogCard from './BlogCard';

function BlogByUser(props) {
  const { id } = useParams();
  const { showAlert } = props;
  const context_blogs = useContext(blogContext);
  const context_users = useContext(userContext); // Fix the context reference here
  const { userblogsById, getBlogsByUserId } = context_blogs;
  const { userByUserId, getUserByUserId } = context_users;

  const HandleAlert = () => {
    props.showAlert('Please Login/Signup to continue to Create Your Blog ', 'info');
  };

  useEffect(() => {
    getBlogsByUserId(id);
    getUserByUserId(id);
  }, [id]);
  return (
    <>
      <HeaderBlog />
      <div className="blog-list d-flex justify-content-center" style={{ border: '1px solid red' }}>
        <LeftSideNav />
        <div className="blogs-box">
          {userByUserId ? (
            <>
            <h2>Blogs by  <Link to={`/aboutuser/${id}`} > {userByUserId.name}</Link></h2>
              <div className="">
                {userblogsById.length === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {' '}
                    <img width={200} src={noNotesImage} alt="No notes" />
                    <h2>Sorry, there are no blogs written by {userByUserId.name} available. </h2>
                    <div>
                      <p>
                        You can share your thoughts and experiences by &nbsp;
                        <Link to="/create-blog">writing a blog !</Link>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/create-blog" className="create-blog-button btn btn-primary button-sp mb-3">
                Create A Blog
              </Link>

              {userblogsById.map((blog) => (
                <BlogCard key={blog._id} showAlert={props.showAlert} blog={blog} />
              ))}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogByUser;
