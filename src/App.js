import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import AboutUser from './components/AboutUser';
import Alert from './components/Alert';
import Contact from './components/Contact';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Preloader from "./components/PreLoader"
import Login from './components/Login';
import USerState from './context/users/UserState';
import BlogState from './context/blogs/BlogState';
import Blog from './components/Blog';
import BlogPage from "./components/BlogPage";
import BookmarkedBlogs from "./components/BookmarkedBlogs";
import WriteBlog from './components/WriteBlog';
import NotesDashboard from './components/NotesDashboard';
import BlogsDashboard from './components/BlogsDashboard';
import NotFound from './components/NotFound';
import CategoryList from './components/CategoryList';
import LeftSideNav from './components/LeftSideNav';
import BlogByUser from './components/BlogByUser';

// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (

    <USerState>
    <BlogState>
      <NoteState>
        <Router>
          <Preloader load={load} />
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className='container-fluid'>
            <Switch>
              {/* <Route exact path="/" showAlert={showAlert}  component={Home}/> */}
              <Route exact path="/" render={() => <Home showAlert={showAlert} />} />
              <Route exact path="/notes-dashboard" render={() => <NotesDashboard showAlert={showAlert} />} />
              <Route exact path="/blogs-dashboard" render={() => <BlogsDashboard showAlert={showAlert} />} />
              <Route exact path="/about" component={About} />
              {/* <Route exact path="/services" component={Services}/> */}
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/aboutuser/:id" component={AboutUser} />
              <Route exact path="/blogs" render={() => <Blog showAlert={showAlert} />} /> 
              <Route exact path="/bookmarked-blogs" render={() => <BookmarkedBlogs showAlert={showAlert} />} /> 
              <Route path="/blog/:id" component={BlogPage} />
              <Route exact path="/login" render={() => <Login showAlert={showAlert} />} />
              <Route exact path="/signup" render={() => <Signup showAlert={showAlert} />} />
              <Route exact path="/create-blog" render={() => <WriteBlog showAlert={showAlert} />} />
              <Route exact path="/blogs-by-user/:id" render={() => <BlogByUser showAlert={showAlert} />} />
              <Route component={NotFound} /> 
              <CategoryList />
              <LeftSideNav showAlert={showAlert}/>
            </Switch>
          </div>
        </Router>
      </NoteState>
      </BlogState>
    </USerState>
  );
}

export default App;
