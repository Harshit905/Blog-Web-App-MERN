import React from "react";
import "./HeaderBlog.css";
const HeaderBlog = () => {
  return (
    <div className="hero-image">
      <div className="content">
        <div>
          <a href="/blogs" style={{ textDecoration: "none!important" }}>
            <span className="title">
              Campus<span>Chronicles</span>
            </span>
          </a>
        </div>

        <div class="search-box">
          <input
            class="search-input"
            type="text"
            placeholder="Search something.."
          />
          <button class="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBlog;
