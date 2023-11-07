import React from "react";
import { Link } from "react-router-dom";
const jedi = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{height:"80vh"}}>
      <div className="d-flex justify-content-center align-items-center flex-column" >
        <p style={{fontSize:"6rem",color:"white",padding:"0", margin:"0"}}>
          <i  class="fa-brands fa-jedi-order"></i>
        </p>
        <div>
        <h1 className="_404_notfound">404 - Not Found</h1>
        <p style={{color:"white",textAlign:"center"}} >The page you are looking for does not exist.</p>
        </div>
      </div>
      <Link to="/">Go To DashBoard</Link>
    </div>
  );
};

export default jedi;
