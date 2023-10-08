import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React,{ useState,useEffect} from 'react'
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
// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
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
    <NoteState>
    <Router>
    <Preloader load={load} />
        <Navbar showAlert={showAlert} />
        <Alert alert={alert}/>
        <div className='container-fluid'>
        <Switch>
          {/* <Route exact path="/" showAlert={showAlert}  component={Home}/> */}
          <Route exact path="/" render={() => <Home showAlert={showAlert} />} />
          <Route exact path="/about" component={About}/>
          {/* <Route exact path="/services" component={Services}/> */}
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/aboutuser" component={AboutUser}/>
          {/* <Route exact path="/login" showAlert={showAlert}  component={Login}/> */}
          {/* <Route exact path="/signup" showAlert={showAlert} component={Signup}/> */}
          {/* <Route path="*" element={<Navigate to="/login"/>} /> */}
           <Route exact path="/login" render={() => <Login showAlert={showAlert} />} />
            <Route exact path="/signup" render={() => <Signup showAlert={showAlert} />} />
        </Switch>
        </div>
    </Router>
    </NoteState>
    </USerState>
  );
}

export default App;
