import React, { useContext } from 'react'
import Blogs from './YourBlogs'
import YourBlogs from './YourBlogs';
const BlogsDashboard = (props) => {
    const {showAlert}=props;
  return (
   <>
    <YourBlogs showAlert={showAlert}/>
   </>
  )
}

export default BlogsDashboard
