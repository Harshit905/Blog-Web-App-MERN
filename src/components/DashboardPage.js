import React from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";
import './DashboardPage.css';
const DashboardPage = () => {
  return (
    <>
     
      <div className="dashboard-container">
        <div className="dashboard-block dashboard-block-1"><Link className="linkDashboard" to="/notes-dashboard">Notes Dashboard</Link></div>
        <div className="dashboard-block dashboard-block-2"><Link className="linkDashboard" to="/blogs-dashboard">Blogs by You</Link></div>
      </div>
    </>
  )
}

export default DashboardPage
