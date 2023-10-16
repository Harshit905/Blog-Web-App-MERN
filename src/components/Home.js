import React, { useContext } from 'react'

import DashboardPage from './DashboardPage';
// import AddNote from './AddNote'
const Home = (props) => {
 
  const {showAlert}=props;
  return (
    <>
    <DashboardPage showAlert={showAlert}/>
   
    </>
  )
}

export default Home
