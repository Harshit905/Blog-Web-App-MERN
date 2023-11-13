import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import blogContext from "../context/blogs/blogContext";
import userContext from "../context/users/userContext";

const PopularUsers = () => {
    const context_blogs = useContext(blogContext);
    const context_users = useContext(userContext);

  return (
    <div>
      
    </div>
  )
}

export default PopularUsers
