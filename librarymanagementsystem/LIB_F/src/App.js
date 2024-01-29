import ProtectedRoute from "./Components/ProtectedRoute";
import SignIn from "./Views/Authentication/SignIn";
import SignUp from "./Views/Authentication/SignUp";
import CreateBook from "./Views/CreateBook";
import HomePage from "./Views/HomePage";
import Profile from "./Views/Profile";
import Sidenav from "./Views/Sidenav";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FullPageLoader from "./Components/FullPageLoader";

import './App.css';


function App() {
  return (
    <div className="App">
      <div className="routerContainer">
        <Router>
          <Routes>
          <Route
              path='/' element={
                <Sidenav>
                  <ProtectedRoute componentPath={'/'} Component={HomePage} />
                </Sidenav>
              }
            />
            <Route
              path='/library' element={
                <Sidenav>
                  <ProtectedRoute componentPath={'/library'} Component={HomePage} />
                </Sidenav>
              }
            />
            <Route path='/profile' element={
              <Sidenav>
                <ProtectedRoute componentPath={'/profile'} Component={Profile} />
              </Sidenav>
            }
            />
            <Route path='/createBook' element={
              <Sidenav>
                <ProtectedRoute componentPath={'/createBook'} Component={CreateBook} />
              </Sidenav>
            }
            />
            <Route path='/login' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Router>
      </div>
      <FullPageLoader/>
      <ToastContainer />
    </div>
  );
}

export default App;
