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
import Dashboard from "./Views/Dashboard";

import './App.css';


function App() {
  return (
    <div className="App">
      <div className="routerContainer">
        <Router>
          <Routes>
            <Route
              path='/' element={
                <ProtectedRoute componentPath={'/'}>
                  <Sidenav>
                    <Dashboard />
                  </Sidenav>
                </ProtectedRoute>
              }
            />
            <Route
              path='/library' element={
                <ProtectedRoute componentPath={'/library'}>
                  <Sidenav>
                    <HomePage />
                  </Sidenav>
                </ProtectedRoute>
              }
            />
            <Route path='/profile' element={
              <ProtectedRoute componentPath={'/profile'}>
                <Sidenav>
                  <Profile />
                </Sidenav>
              </ProtectedRoute>
            }
            />
            <Route path='/createBook' element={
              <ProtectedRoute componentPath={'/createBook'}>
                <Sidenav>
                  <CreateBook />
                </Sidenav>
              </ProtectedRoute>
            }
            />
            <Route path='/login' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Router>
      </div>
      <FullPageLoader />
      <ToastContainer />
    </div>
  );
}

export default App;
